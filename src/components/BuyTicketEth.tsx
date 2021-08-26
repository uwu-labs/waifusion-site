import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BN from "bn.js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ContractHelper } from "../services/contract";
import Input from "./Input";
import Popup from "./Popup";
import { selectGlobalsData } from "../state/reducers/globals";
import { toWeiUnit } from "../services/web3";
import {
  getUwuMintContract,
  isWaifusApproved,
  isWetApproved,
} from "../services/uwuHelper";

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
  swapPrice: number;
  wetBalance: number;
};

const BuyTicketEth: React.FC<Props> = (props) => {
  if (!props.show) return null;

  const [t] = useTranslation();
  const [waifuIds, setWaifuIds] = useState("");
  const [error, setError] = useState("");
  const globals = useSelector(selectGlobalsData);
  const [loading, setLoading] = useState(false);
  const [waifusApproved, setWaifusApproved] = useState(false);
  const [wetApproved, setWetApproved] = useState(false);

  const updateWaifusApproved = async () => {
    if (!globals) return;
    const approved = await isWaifusApproved(globals.uwuMintContract);
    setWaifusApproved(approved);
  };

  const updateWetApproved = async () => {
    if (!globals) return;
    const approved = await isWetApproved(globals.uwuMintContract);
    setWetApproved(approved);
  };

  useEffect(() => {
    updateWaifusApproved();
    updateWetApproved();
  }, [globals]);

  const approveWet = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const wetContract = await contractHelper.getWetContract();
    wetContract.methods
      .approve(globals.uwuMintContract, new BN("9999999999999999999999999999"))
      .send()
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", (receipt: any) => {
        updateWetApproved().then(() => setLoading(false));
      })
      .on("error", (err: any) => {
        console.log(`Error: ${err}`);
        setLoading(false);
      });
  };

  const approveWaifus = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const waifuContract = await contractHelper.getWaifuContract();
    waifuContract.methods
      .setApprovalForAll(globals.uwuMintContract, true)
      .send()
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", (receipt: any) => {
        updateWaifusApproved().then(() => setLoading(false));
      })
      .on("error", (err: any) => {
        console.log(`Error: ${err}`);
        setLoading(false);
      });
  };

  const buyTickets = async () => {
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

    if (waifuIdList.length * props.swapPrice > props.wetBalance) {
      setError("Not enough WET");
      return;
    }

    const mint = await getUwuMintContract(globals.uwuMintContract);
    mint.methods
      .swapWFforUWU(waifuIdList)
      .send()
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", (receipt: any) => {
        setLoading(false);
        props.close();
      })
      .on("error", (err: any) => {
        console.log("error: ", err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Popup
        show={props.show}
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
        header={t("uwu.getTicket")}
        body={t("dungeon.bodys.burn")}
        body2={`You have ${props.wetBalance} WET`}
        buttonAction={() => {
          if (!wetApproved) approveWet();
          else if (!waifusApproved) approveWaifus();
          else buyTickets();
        }}
        buttonText={
          loading
            ? t("loading")
            : !wetApproved
            ? t("buttons.approveWet")
            : !waifusApproved
            ? t("buttons.approveWaifus")
            : t("uwu.getTicket")
        }
      />
    </>
  );
};

export default BuyTicketEth;
