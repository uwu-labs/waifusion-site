import React, { useState } from "react";
import styled from "styled-components";
import BN from "bn.js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ContractHelper } from "../services/contract";
import Input from "./Input";
import Popup from "./Popup";
import { toWeiUnit } from "../services/web3";
import LoadingPurchase from "./LoadingPurchase";
import { selectBuyPrice } from "../state/reducers/globals";

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

  const [t] = useTranslation();
  const [count, setCount] = useState<string>("1");
  const [error, setError] = useState("");
  const [committed, setCommited] = useState(false);
  const [commitComplete, setCommitComplete] = useState(false);
  const buyPrice = useSelector(selectBuyPrice);

  const buy = async () => {
    setError("");
    let amount = 0;
    try {
      amount = Number(count);
    } catch {
      setError(t("errors.valid"));
      return;
    }
    if (!Number.isInteger(amount)) {
      setError(t("errors.whole"));
      return;
    }
    if (amount > 20) {
      setError(t("errors.maximum"));
      return;
    }
    if (amount <= 0) {
      setError(t("errors.minimum"));
      return;
    }

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const dungeonContract = await contractHelper.getDungeonContract();
    const estimatedGas = 200000 * amount;
    dungeonContract.methods
      .commitBuyWaifus(amount)
      .send({
        value: new BN(toWeiUnit(buyPrice)).mul(new BN(amount)),
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
              update={(value: string) => setCount(value)}
            />
            {error && <Error>{error}</Error>}
          </Content>
        }
        header={t("dungeon.headers.buy")}
        body={t("dungeon.bodys.buy")}
        buttonAction={() => {
          buy();
        }}
        buttonText={t("buttons.buy")}
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
