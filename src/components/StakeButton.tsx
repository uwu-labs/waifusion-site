import React, { useState } from "react";
import { useSelector } from "react-redux";
import BN from "bn.js";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { ContractHelper } from "../services/contract";
import { selectGlobalsData } from "../state/reducers/globals";
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
  approved: boolean;
  balance: string;
};

const StakeButton: React.FC<Props> = (props) => {
  const [t] = useTranslation();

  const globals = useSelector(selectGlobalsData);
  const address = useSelector(selectAddress);

  const [loading, setLoading] = useState(false);
  const [poupOpen, setPopupOpen] = useState(false);
  const [amount, setAmount] = useState("0");

  const approve = async () => {
    if (loading) return;

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const lpContract = await contractHelper.getLpContract();

    lpContract.methods
      .approve(globals.farmAddress, new BN("9999999999999999999999999999"))
      .send()
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", async (receipt: any) => {
        await props.refresh();
        setLoading(false);
      })
      .on("error", (err: any) => {
        setLoading(true);
      });
  };

  const stake = async () => {
    if (loading) return;

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const farmContract = await contractHelper.getFarmContract();

    const modifiedBal = new BN(amount.replace(".", ""));
    farmContract.methods
      .stake(modifiedBal)
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
        primary
        onClick={() => {
          if (loading) return;
          if (!props.approved) approve();
          else setPopupOpen(true);
        }}
      >
        {loading
          ? t("loading")
          : !props.approved
          ? t("buttons.approveLp")
          : t("buttons.stakeLp")}
      </Button>
      <Popup
        show={poupOpen}
        close={() => setPopupOpen(false)}
        header="LP to Stake"
        content={
          <PopupContent>
            <Input
              value={amount}
              update={(value: string) => setAmount(value)}
              max={props.balance}
            />
          </PopupContent>
        }
        buttonText={loading ? t("loading") : t("buttons.stakeLp")}
        buttonAction={() => stake()}
      />
    </div>
  );
};

export default StakeButton;
