import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BN from "bn.js";
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
  shortenAddress,
} from "../services/uwuHelper";
import { selectTickets, setTickets } from "../state/reducers/user";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EthAddressContainer = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const EthAddress = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  color: var(--plain-dark);
`;

const Change = styled.button`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--plain-dark);
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  font-family: "Calibre", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 0.5rem;
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
  remaining: number;
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
  const [ethAddress, setEthAddress] = useState("");
  const [changingAddress, setChangingAddress] = useState(false);
  const [addressError, setAddressError] = useState("");
  const ticketsOwned = useSelector(selectTickets);

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

  const updateAddress = async () => {
    if (!globals.uwuMintContract) return;
    const address = await getAddress();
    const contract = await getUwuMintContract(globals.uwuMintContract);
    const _ethAddress = await contract.methods.bscToEthAddr(address).call();
    if (_ethAddress === "0x0000000000000000000000000000000000000000") {
      setEthAddress(address);
    } else {
      setEthAddress(_ethAddress);
    }
  };

  const updateEverything = () => {
    updateWetApproved();
    getWave();
    updateTicketBalance();
    updateNextWave();
    updateAddress();
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
    setLoading(true);
    await getWave();
    if (Number(tickets) > maxPerTX) {
      setError(`Exceeds max of ${maxPerTX} for this wave`);
      setLoading(false);
      return;
    }
    if (Number(tickets) < 1) {
      setError("Must be a positive number");
      setLoading(false);
      return;
    }
    if (isLocked) {
      setError("You have already minted this wave");
      setLoading(false);
      return;
    }
    if (Number(tickets) * props.swapPrice > props.wetBalance) {
      setError("Not enough WET");
      setLoading(false);
      return;
    }

    const mint = await getUwuMintContract(globals.uwuMintContract);
    mint.methods
      .buy(tickets, ethAddress)
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
          updateEverything();
          props.close();
        }}
        content={
          <Content>
            <EthAddressContainer>
              <EthAddress>{`Eth Address: ${shortenAddress(
                ethAddress,
                10
              )}`}</EthAddress>
              {Number(ticketsOwned) === 0 && (
                <Change onClick={() => setChangingAddress(true)}>Change</Change>
              )}
            </EthAddressContainer>
            <Input
              type="number"
              value={tickets}
              placeholder={`Amount (e.g. ${maxPerTX.toString()})`}
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
        )}. There are ${props.remaining} tickets remaining.`}
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
      <Popup
        show={changingAddress}
        header="Enter ETH Address"
        body="This is the address for for uwu-tickets to be sent to for redeeming your uwus"
        close={() => setChangingAddress(false)}
        content={
          <Content>
            <Input
              type="string"
              value={ethAddress}
              placeholder="Enter Address"
              update={(value: string) => setEthAddress(value)}
            />
            {addressError && <Error>{addressError}</Error>}
          </Content>
        }
        buttonText="Done"
        buttonAction={() => {
          if (ethAddress.length === 42) {
            setChangingAddress(false);
          } else {
            setAddressError("Not a valid address");
          }
        }}
      />
    </>
  );
};

export default BuyTicketBsc;
