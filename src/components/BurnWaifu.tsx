import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BN from "bn.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ContractHelper } from "../services/contract";
import Input from "./Input";
import Popup from "./Popup";
import GLOBALS from "../services/globals";
import LoadingPurchase from "./LoadingPurchase";
import {
  selectWaifusApproved,
  selectWetApproved,
  setWaifusApproved,
  setWetApproved,
} from "../state/reducers/user";

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
  const [count, setCount] = useState<string>("1");
  const [error, setError] = useState("");
  const [approving, setApproving] = useState(false);
  const [committed, setCommited] = useState(false);
  const [commitComplete, setCommitComplete] = useState(false);
  const wetApproved = useSelector(selectWetApproved);
  const waifusApproved = useSelector(selectWaifusApproved);

  const updateApprovals = async () => {
    setApproving(true);
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const _wetApproved = await contractHelper.getDungeonAllowance();
    dispatch(
      setWetApproved(new BN(_wetApproved) > new BN("9999999999999999999999999"))
    );
    const _waifusApproved = await contractHelper.isDungeonApprovedForAll();
    dispatch(setWaifusApproved(_waifusApproved));
    setApproving(false);
  };

  useEffect(() => {
    updateApprovals();
  }, []);

  const approveWet = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const wetContract = await contractHelper.getWetContract();
    wetContract.methods
      .approve(
        GLOBALS.DUNGEON_CONTRACT_ADDRESS,
        new BN("9999999999999999999999999999")
      )
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

  const approveWaifus = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const waifuContract = await contractHelper.getWaifuContract();
    waifuContract.methods
      .setApprovalForAll(GLOBALS.DUNGEON_CONTRACT_ADDRESS, true)
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

  const burn = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const dungeonContract = await contractHelper.getDungeonContract();
    dungeonContract.methods
      .commitSwapWaifus([1])
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
        show={props.show && !committed}
        close={() => props.close()}
        content={
          <Content>
            <Input
              value={count}
              type="number"
              onChange={(event) => setCount(event.target.value)}
            />
            {error && <Error>{error}</Error>}
          </Content>
        }
        header={t("dungeon.headers.burn")}
        body={t("dungeon.bodys.burn")}
        buttonAction={() => {
          if (!wetApproved) approveWet();
          else if (!waifusApproved) approveWaifus();
          else burn();
        }}
        buttonText={
          approving
            ? t("loading")
            : !wetApproved
            ? t("buttons.approveWet")
            : !waifusApproved
            ? t("buttons.approveWaifus")
            : t("buttons.burnWaifu")
        }
      />
      <LoadingPurchase
        show={committed}
        close={() => props.close()}
        loading={!commitComplete}
      />
    </>
  );
};

export default BurnWaifu;
