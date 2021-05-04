import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { ContractHelper } from "../services/contract";
import { selectAddress } from "../state/reducers/user";
import Button from "./Button";
import Popup from "./Popup";
import Input from "./Input";

const PopupContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  refresh: () => Promise<void>;
  balance: string;
};

const UnstakeButton: React.FC<Props> = (props) => {
  const [t] = useTranslation();

  const address = useSelector(selectAddress);

  const [loading, setLoading] = useState(false);
  const [poupOpen, setPopupOpen] = useState(false);
  const [amount, setAmount] = useState("0");

  const unstake = async () => {
    if (loading || props.balance === "0") return;

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const farmContract = await contractHelper.getFarmContract();

    farmContract.methods
      .exit()
      .send({ from: address })
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", async (receipt: any) => {
        await props.refresh();
        setPopupOpen(false);
        setLoading(false);
        setAmount("0");
      })
      .on("error", (err: any) => {
        setLoading(true);
      });
  };

  return (
    <div>
      <Button
        secondary
        onClick={() => {
          if (loading) return;
          setPopupOpen(true);
        }}
        disabled={props.balance === "0"}
      >
        {loading ? t("loading") : t("buttons.unstakeLp")}
      </Button>
      <Popup
        show={poupOpen}
        close={() => setPopupOpen(false)}
        header="LP to Unstake"
        content={
          <PopupContent>
            <Input
              value={amount}
              update={(value: string) => setAmount(value)}
              max={props.balance}
            />
          </PopupContent>
        }
        buttonText={loading ? t("loading") : t("buttons.unstakeLp")}
        buttonAction={() => unstake()}
      />
    </div>
  );
};

export default UnstakeButton;
