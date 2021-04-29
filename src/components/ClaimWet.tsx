import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import BN from "bn.js";

import Button from "./Button";
import {
  loadWaifus,
  selectAddress,
  selectTotalAccumulated,
  selectUserWaifuIds,
  setAddress,
} from "../state/reducers/user";
import { ContractHelper, getAddress } from "../services/contract";
import { toEthUnit } from "../services/web3";

const StyledClaimWet = styled.div`
  display: flex;
  align-items: center;
`;

const WetBalance = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-right: 2rem;
`;

const ClaimWet: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const accumulated = useSelector(selectTotalAccumulated);
  const address = useSelector(selectAddress);
  const waifuIds = useSelector(selectUserWaifuIds);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("---");

  const updateBalance = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const _balance = await contractHelper.wetBalance();
    setBalance(
      Math.round(Number(toEthUnit(new BN(_balance)))).toLocaleString()
    );
  };

  useEffect(() => {
    updateBalance();
  }, []);

  const click = async (): Promise<void> => {
    if (loading) return;

    setLoading(true);
    if (!address) {
      const _address = await getAddress();
      dispatch(setAddress(_address));
    } else {
      const contractHelper = new ContractHelper();
      await contractHelper.init();
      await contractHelper.claimWET(waifuIds);
      dispatch(loadWaifus());
    }
    setLoading(false);
  };

  return (
    <StyledClaimWet>
      <WetBalance>{`${t("wallet.wetOwned")} ${balance}`}</WetBalance>
      <Button secondary onClick={() => click()}>
        {loading && t("loading")}
        {!loading && !address && t("connect")}
        {!loading &&
          address &&
          `${t("wallet.claim")} ${accumulated.toFixed(0)} WET`}
      </Button>
    </StyledClaimWet>
  );
};

export default ClaimWet;
