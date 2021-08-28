// TODO test sale over
// TODO update copy
// TODO Update learn more link

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BN from "bn.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import countdown from "countdown";

import { ContractHelper } from "../services/contract";
import Input from "./Input";
import Popup from "./Popup";
import { selectGlobalsData } from "../state/reducers/globals";
import {
  getTicketBalance,
  getUwuMintContract,
  isWetApproved,
  nextWaveDate,
} from "../services/uwuHelper";
import { selectTickets, setTickets } from "../state/reducers/user";

const waveMax: Record<string, number> = {
  "1": 1,
  "2": 3,
  "3": 6,
  "4": 11,
};

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
};

const BuyTicketBsc: React.FC<Props> = (props) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [tickets, setTicketCount] = useState("");
  const [error, setError] = useState("");
  const globals = useSelector(selectGlobalsData);
  const [loading, setLoading] = useState(false);
  const [wetApproved, setWetApproved] = useState(false);
  const [wave, setWave] = useState(1);
  const [nextWave, setNextWave] = useState(new Date());
  const owned = useSelector(selectTickets);

  const updateWetApproved = async () => {
    if (!globals.uwuMintContract) return;
    const approved = await isWetApproved(globals.uwuMintContract);
    setWetApproved(approved);
  };

  const getWave = async () => {
    if (!globals.uwuMintContract) return;
    const contract = await getUwuMintContract(globals.uwuMintContract);
    const wave = await contract.methods.wave().call();
    setWave(Number(wave) + 1);
  };

  const updateTicketBalance = async () => {
    if (!globals.uwuMintContract) return;
    const balance = await getTicketBalance(globals.uwuMintContract);
    dispatch(setTickets(balance));
  };

  const updateNextWave = async () => {
    const _nextWave = await nextWaveDate();
    setNextWave(_nextWave);
  };

  const updateEverything = () => {
    updateWetApproved();
    getWave();
    updateTicketBalance();
    updateNextWave();
  };

  useEffect(() => {
    updateEverything();
  }, [globals]);

  if (!props.show) return null;

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

  const buyTickets = async () => {
    setError("");
    const max = waveMax[wave.toString()] - Number(owned);
    if (Number(tickets) > max) {
      setError(`Exceeds max of ${max} for this wave`);
      return;
    }
    if (Number(tickets) < 1) {
      setError("Must be a positive number");
      return;
    }

    const mint = await getUwuMintContract(globals.uwuMintContract);
    mint.methods
      .buy(tickets)
      .send()
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", (receipt: any) => {
        setTicketCount("");
        setError("");
        updateEverything();
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
        close={() => {
          setTicketCount("");
          setError("");
          props.close();
        }}
        content={
          <Content>
            <Input
              type="number"
              value={tickets}
              placeholder={(
                waveMax[wave.toString()] - Number(owned)
              ).toString()}
              update={(value: string) => setTicketCount(value)}
            />
            {error && <Error>{error}</Error>}
          </Content>
        }
        header={t("uwu.getTicket")}
        body={`The current wave is ${wave}. You can get ${
          waveMax[wave.toString()] - Number(owned)
        } more tickets this wave. Next wave is in ${countdown(
          new Date(),
          nextWave,
          countdown.ALL,
          1
        )}`}
        buttonAction={() => {
          if (!wetApproved) approveWet();
          else buyTickets();
        }}
        buttonText={
          loading
            ? t("loading")
            : !wetApproved
            ? t("buttons.approveWet")
            : t("uwu.getTicket")
        }
      />
    </>
  );
};

export default BuyTicketBsc;
