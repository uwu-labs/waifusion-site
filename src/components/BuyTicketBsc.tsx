// TODO Update learn more link

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BN, { max } from "bn.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import countdown from "countdown";

import { ContractHelper, getAddress } from "../services/contract";
import Input from "./Input";
import Popup from "./Popup";
import { selectGlobalsData } from "../state/reducers/globals";
import {
  getBlockNumber,
  getTicketBalance,
  getUwuMintContract,
  isWetApproved,
  nextWaveDate,
} from "../services/uwuHelper";
import { selectTickets, setTickets } from "../state/reducers/user";

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
  const [isLocked, setIsLocked] = useState(false);
  const [maxPerTX, setMaxPerTX] = useState(0);
  const owned = useSelector(selectTickets);

  const updateWetApproved = async () => {
    if (!globals.uwuMintContract) return;
    const approved = await isWetApproved(globals.uwuMintContract);
    setWetApproved(approved);
  };

  const getWave = async () => {
    if (!globals.uwuMintContract) return;
    const contract = await getUwuMintContract(globals.uwuMintContract);

    const startBlock = await contract.methods.startBlock().call();
    let wave = 0;
    if (startBlock !== 0) {
      const blockNumber = await getBlockNumber();
      const waveBlockLength = await contract.methods.waveBlockLength().call();
      const blocksSinceStart = blockNumber - startBlock;
      wave = Math.floor(blocksSinceStart / waveBlockLength);
    }
    setWave(Number(wave) + 1);
    const address = await getAddress();
    const _isLocked = await contract.methods.waveLock(wave, address).call();
    setIsLocked(_isLocked);
    const _maxPerTX = await contract.methods.maxPerTX(wave).call();
    setMaxPerTX(_maxPerTX);
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
    if (Number(tickets) > maxPerTX) {
      setError(`Exceeds max of ${maxPerTX} for this wave`);
      return;
    }
    if (Number(tickets) < 1) {
      setError("Must be a positive number");
      return;
    }
    if (isLocked) {
      setError("You have already minted this wave");
      return;
    }
    if (Number(tickets) * props.swapPrice > props.wetBalance) {
      setError("Not enough WET");
      return;
    }

    const mint = await getUwuMintContract(globals.uwuMintContract);
    const address = await getAddress();
    mint.methods
      .buy(tickets, address)
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
              placeholder={`Ticket Amount (e.g. ${maxPerTX.toString()}`}
              update={(value: string) => setTicketCount(value)}
            />
            {error && <Error>{error}</Error>}
          </Content>
        }
        header={t("uwu.getTicket")}
        body={`The current wave is ${wave}. You can get ${
          isLocked ? 0 : maxPerTX
        } more tickets this wave. Next wave is in ${countdown(
          new Date(),
          nextWave,
          countdown.ALL,
          1
        )}`}
        body2={`You have ${props.wetBalance} WET`}
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
