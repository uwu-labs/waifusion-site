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
};

const StakeButton: React.FC<Props> = (props) => {
  const [t] = useTranslation();

  const globals = useSelector(selectGlobalsData);
  const address = useSelector(selectAddress);

  const [loading, setLoading] = useState(false);
  const [poupOpen, setPopupOpen] = useState(false);
  const [amount, setAmount] = useState("0");

  const approve = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const wetContract = await contractHelper.getWetContract();

    wetContract.methods
      .approve(globals.farmAddress, new BN("9999999999999999999999999999"))
      .send()
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", (receipt: any) => {
        props.refresh().then(() => setLoading(false));
      })
      .on("error", (err: any) => {
        setLoading(true);
      });
  };

  const stake = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const farmContract = await contractHelper.getFarmContract();

    farmContract.methods
      .stake(amount)
      .send({ from: address })
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", (receipt: any) => {
        setLoading(false);
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
          : t("buttons.stakeWet")}
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
            />
          </PopupContent>
        }
        buttonText={t("buttons.stakeWet")}
        buttonAction={() => stake()}
      />
    </div>
  );
};

export default StakeButton;
