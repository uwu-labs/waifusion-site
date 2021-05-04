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
import {
  selectBnbBurnPrice,
  selectGlobalsData,
  selectIsEth,
} from "../state/reducers/globals";
import { toWeiUnit } from "../services/web3";

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
  const [isBnbBurn, setIsBnbBurn] = useState(false);
  const [isWetBurn, setIsWetBurn] = useState(false);
  const wetApprovedForDungeon = useSelector(selectWetApprovedForDungeon);
  const waifusApprovedForDungeon = useSelector(selectWaifusApprovedForDungeon);
  const wetApprovedForWrapper = useSelector(selectWetApprovedForWrapper);
  const nftxApprovedForWrapper = useSelector(selectNftxApprovedForWrapper);
  const globals = useSelector(selectGlobalsData);
  const isEth = useSelector(selectIsEth);
  const bnbBurnPrice = useSelector(selectBnbBurnPrice);

  const updateApprovals = async () => {
    setApproving(true);
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const _wetApprovedForDungeon = await contractHelper.isWetApprovedForDungeon();
    dispatch(setWetApprovedForDungeon(_wetApprovedForDungeon));
    const _waifusApprovedForDungeon = await contractHelper.isWaifuApprovedForDungeon();
    dispatch(setWaifusApprovedForDungeon(_waifusApprovedForDungeon));
    if (isEth) {
      const _wetApprovedForWrapper = await contractHelper.isWetApprovedForWrapper();
      dispatch(setWetApprovedForWrapper(_wetApprovedForWrapper));
      const _nftxApprovedForWrapper = await contractHelper.isNftxApprovedForWrapper();
      dispatch(setNftxApprovedForWrapper(_nftxApprovedForWrapper));
    }
    setApproving(false);
  };

  useEffect(() => {
    updateApprovals();
  }, []);

  const tokenApprove = async (
    tokenContract: Contract,
    approveAddress: string
  ) => {
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
    await tokenApprove(wetContract, globals.dungeonAddress);
  };

  const approveWetForWrapper = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const wetContract = await contractHelper.getWetContract();
    const userWrapperAddress = await contractHelper.getUserWrapperAddress();
    await tokenApprove(wetContract, userWrapperAddress);
  };

  const approveWaifusForDungeon = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const waifuContract = await contractHelper.getWaifuContract();
    waifuContract.methods
      .setApprovalForAll(globals.dungeonAddress, true)
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

  const approveNftxForWrapper = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const nftxContract = await contractHelper.getNftxContract();
    const userWrapperAddress = await contractHelper.getUserWrapperAddress();
    await tokenApprove(nftxContract, userWrapperAddress);
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
    if (!isEth && isBnbBurn) {
      dungeonContract.methods
        .commitSwapWaifusWithETH(waifuIdList)
        .send({
          value: new BN(toWeiUnit(bnbBurnPrice)).mul(
            new BN(waifuIdList.length)
          ),
        })
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
    } else {
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
    }
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
    const estimatedGas = 150_000 + 550_000 * Number(nftxCount);
    wrapperContract.methods
      .commitWaifusWithNFTX(nftxCount)
      .send({ gas: estimatedGas })
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
        show={!isEth && !isBnbBurn && !isWetBurn}
        close={() => props.close()}
        header={t("dungeon.headers.burnMethod")}
        body={t("dungeon.bodys.burnMethodBsc")}
        buttonText={t("buttons.useBnb")}
        buttonAction={() => setIsBnbBurn(true)}
        secondButtonText={t("buttons.useWet")}
        secondButtonAction={() => setIsWetBurn(true)}
      />
      <Popup
        show={
          !committed &&
          (!isEth || isWaifuBurn) &&
          (isEth || isWetBurn || isBnbBurn)
        }
        close={() => props.close()}
        content={
          <Content>
            <Input
              value={waifuIds}
              placeholder="e.g. 1423, 121, 1102"
              update={(value: string) => setWaifuIds(value)}
            />
            {error && <Error>{error}</Error>}
          </Content>
        }
        header={t("dungeon.headers.burn")}
        body={t("dungeon.bodys.burn")}
        buttonAction={() => {
          if (!wetApprovedForDungeon && (isEth || isWetBurn))
            approveWetForDungeon();
          else if (!waifusApprovedForDungeon) approveWaifusForDungeon();
          else burnWaifu();
        }}
        buttonText={
          approving
            ? t("loading")
            : !wetApprovedForDungeon && (isEth || isWetBurn)
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
              update={(value: string) => {
                setNftxCount(value);
                validateNftx(value);
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
        nftxCount={Number(nftxCount)}
      />
    </>
  );
};

export default BurnWaifu;
