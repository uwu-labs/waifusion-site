import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BN from "bn.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Contract } from "web3-eth-contract";
import { ContractHelper } from "../services/contract";
import Input from "./Input";
import Popup from "./Popup";
import LoadingPurchase from "./LoadingPurchase";
import {
  selectNftxApprovedForWrapper,
  selectWaifusApprovedForDungeon,
  selectWetApprovedForDungeon,
  selectWetApprovedForWrapper,
  setWaifusApprovedForDungeon,
  setWetApprovedForDungeon,
  setWetApprovedForWrapper,
  setNftxApprovedForWrapper,
} from "../state/reducers/user";
import { selectGlobalsData, selectIsEth } from "../state/reducers/globals";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Error = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color: var(--danger);
`;

type Props = {
  show: boolean;
  close: () => void;
};

const BurnWaifu: React.FC<Props> = (props) => {
  if (!props.show) return null;

  const dispatch = useDispatch();
  const [t] = useTranslation();
  const [waifuIds, setWaifuIds] = useState("");
  const [nftxCount, setNftxCount] = useState("1");
  const [error, setError] = useState("");
  const [approving, setApproving] = useState(false);
  const [committed, setCommited] = useState(false);
  const [commitComplete, setCommitComplete] = useState(false);
  const [isWaifuBurn, setIsWaifuBurn] = useState(false);
  const [isNftxBurn, setIsNftxBurn] = useState(false);
  const wetApprovedForDungeon = useSelector(selectWetApprovedForDungeon);
  const waifusApprovedForDungeon = useSelector(selectWaifusApprovedForDungeon);
  const wetApprovedForWrapper = useSelector(selectWetApprovedForWrapper);
  const nftxApprovedForWrapper = useSelector(selectNftxApprovedForWrapper);
  const globals = useSelector(selectGlobalsData);
  const isEth = useSelector(selectIsEth);

  const updateApprovals = async () => {
    setApproving(true);
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const _wetApprovedForDungeon = await contractHelper.isWetApprovedForDungeon();
    dispatch(setWetApprovedForDungeon(_wetApprovedForDungeon));
    const _waifusApprovedForDungeon = await contractHelper.isWaifuApprovedForDungeon();
    dispatch(setWaifusApprovedForDungeon(_waifusApprovedForDungeon));
    const _wetApprovedForWrapper = await contractHelper.isWetApprovedForWrapper();
    dispatch(setWetApprovedForWrapper(_wetApprovedForWrapper));
    const _nftxApprovedForWrapper = await contractHelper.isNftxApprovedForWrapper();
    dispatch(setNftxApprovedForWrapper(_nftxApprovedForWrapper));
    setApproving(false);
  };

  useEffect(() => {
    updateApprovals();
  }, []);

  const approve = async (tokenContract: Contract, approveAddress: string) => {
    tokenContract.methods
      .approve(approveAddress, new BN("9999999999999999999999999999"))
      .send()
      .on("transactionHash", (hash: any) => {
        setApproving(true);
      })
      .on("receipt", (receipt: any) => {
        updateApprovals().then(() => setApproving(false));
      })
      .on("error", (err: any) => {
        console.log(`Error: ${err}`);
        setApproving(false);
      });
  };

  const approveWetForDungeon = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const wetContract = await contractHelper.getWetContract();
    await approve(wetContract, globals.dungeonAddress);
  };

  const approveWetForWrapper = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const wetContract = await contractHelper.getWetContract();
    const userWrapperAddress = await contractHelper.getUserWrapperAddress();
    await approve(wetContract, userWrapperAddress);
  };

  const approveWaifusForDungeon = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const waifuContract = await contractHelper.getWaifuContract();
    await approve(waifuContract, globals.dungeonAddress);
  };

  const approveNftxForWrapper = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const nftxContract = await contractHelper.getNftxContract();
    const userWrapperAddress = await contractHelper.getUserWrapperAddress();
    await approve(nftxContract, userWrapperAddress);
  };

  const burnWaifu = async () => {
    setError("");
    let waifuIdList: number[] = [];
    try {
      const stripped = waifuIds.replace(/\s/g, "");
      const split = stripped.split(",");
      waifuIdList = split.map((s: string) => Number(s));
    } catch {
      setError(t("errors.valid"));
      return;
    }
    for (let i = 0; i < waifuIdList.length; i++) {
      if (!Number.isInteger(waifuIdList[i])) {
        setError(t("errors.whole"));
        return;
      }
    }

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const dungeonContract = await contractHelper.getDungeonContract();
    dungeonContract.methods
      .commitSwapWaifus(waifuIdList)
      .send()
      .on("transactionHash", (hash: any) => {
        setCommited(true);
      })
      .on("receipt", (receipt: any) => {
        setCommitComplete(true);
      })
      .on("error", (err: any) => {
        console.log("error: ", err.message);
        setCommited(false);
      });
  };

  const validateNftx = (value: string) => {
    if (Number(value) <= 0) {
      setError(t("errors.minimum"));
      return;
    }
    if (Number(value) > 3) {
      setError(t("errors.maximumNftx"));
      return;
    }
    setError("");
  };

  const burnNftx = async () => {
    if (error) return;

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const wrapperContract = await contractHelper.getWrapperContract();
    wrapperContract.methods
      .commitWaifusWithNFTX(nftxCount)
      .send()
      .on("transactionHash", (hash: any) => {
        setCommited(true);
      })
      .on("receipt", (receipt: any) => {
        setCommitComplete(true);
      })
      .on("error", (err: any) => {
        console.log("error: ", err.message);
        setCommited(false);
      });
  };

  return (
    <>
      <Popup
        show={isEth && !isWaifuBurn && !isNftxBurn}
        close={() => props.close()}
        header={t("dungeon.headers.burnMethod")}
        body={t("dungeon.bodys.burnMethod")}
        buttonText={t("buttons.waifuNft")}
        buttonAction={() => setIsWaifuBurn(true)}
        secondButtonText={t("buttons.nftxWaifu")}
        secondButtonAction={() => setIsNftxBurn(true)}
      />
      <Popup
        show={!committed && (!isEth || isWaifuBurn)}
        close={() => props.close()}
        content={
          <Content>
            <Input
              value={waifuIds}
              placeholder="e.g. 1423, 121, 1102"
              onChange={(event) => setWaifuIds(event.target.value)}
            />
            {error && <Error>{error}</Error>}
          </Content>
        }
        header={t("dungeon.headers.burn")}
        body={t("dungeon.bodys.burn")}
        buttonAction={() => {
          if (!wetApprovedForDungeon) approveWetForDungeon();
          else if (!waifusApprovedForDungeon) approveWaifusForDungeon();
          else burnWaifu();
        }}
        buttonText={
          approving
            ? t("loading")
            : !wetApprovedForDungeon
            ? t("buttons.approveWet")
            : !waifusApprovedForDungeon
            ? t("buttons.approveWaifus")
            : t("buttons.burnWaifu")
        }
      />
      <Popup
        show={!committed && isNftxBurn}
        close={() => props.close()}
        content={
          <Content>
            <Input
              value={nftxCount}
              type="number"
              onChange={(event) => {
                setNftxCount(event.target.value);
                validateNftx(event.target.value);
              }}
            />
            {error && <Error>{error}</Error>}
          </Content>
        }
        header={t("dungeon.headers.burnNftx")}
        body={t("dungeon.bodys.burnNftx")}
        buttonAction={() => {
          if (!wetApprovedForWrapper) approveWetForWrapper();
          else if (!nftxApprovedForWrapper) approveNftxForWrapper();
          else burnNftx();
        }}
        buttonText={
          approving
            ? t("loading")
            : !wetApprovedForWrapper
            ? t("buttons.approveWet")
            : !nftxApprovedForWrapper
            ? t("buttons.approveNftx")
            : t("buttons.burnNftx")
        }
      />

      <LoadingPurchase
        show={committed}
        close={() => props.close()}
        loading={!commitComplete}
        isNftx={isNftxBurn}
      />
    </>
  );
};

export default BurnWaifu;
