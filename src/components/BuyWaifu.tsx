import React, { useState } from "react";
import styled from "styled-components";
import BN from "bn.js";
import { ContractHelper } from "../services/contract";
import Input from "./Input";
import Popup from "./Popup";
import { toWeiUnit } from "../services/web3";
import GLOBALS from "../services/globals";
import LoadingPurchase from "./LoadingPurchase";

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

const BuyWaifu: React.FC<Props> = (props) => {
  if (!props.show) return null;

  const [count, setCount] = useState<string>("1");
  const [error, setError] = useState("");
  const [committed, setCommited] = useState(false);
  const [commitComplete, setCommitComplete] = useState(false);

  const buy = async () => {
    setError("");
    let amount = 0;
    try {
      amount = Number(count);
    } catch {
      setError("Not a valid number");
      return;
    }
    if (!Number.isInteger(amount)) {
      setError("Must be a whole number");
      return;
    }
    if (amount > 20) {
      setError("Maximum of 20 allowed");
      return;
    }
    if (amount <= 0) {
      setError("Minimum of 1 allowed");
      return;
    }

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const dungeonContract = await contractHelper.getDungeonContract();
    const estimatedGas = 200000 * amount;
    dungeonContract.methods
      .commitBuyWaifus(amount)
      .send({
        value: new BN(toWeiUnit(GLOBALS.BUY_PRICE)).mul(new BN(amount)),
        gas: estimatedGas,
      })
      .on("transactionHash", (hash: any) => {
        setCommited(true);
        setCommitComplete(false);
      })
      .on("receipt", (receipt: any) => {
        setCommitComplete(true);
      })
      .on("error", (err: any) => {
        setCommited(false);
        console.log("error: ", err.message);
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
        header="Buy Waifu"
        body="Select the number of Waifus that you would like to buy"
        buttonAction={() => {
          buy();
        }}
        buttonText="Buy"
      />
      <LoadingPurchase
        show={committed}
        close={() => props.close()}
        loading={!commitComplete}
      />
    </>
  );
};

export default BuyWaifu;
