import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import {
  loadWaifus,
  selectAddress,
  selectTotalAccumulated,
  selectUserWaifuIds,
  setAddress,
} from "../state/reducers/user";
import { ContractHelper, getAddress } from "../services/contract";

const ClaimWet: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const accumulated = useSelector(selectTotalAccumulated);
  const address = useSelector(selectAddress);
  const waifuIds = useSelector(selectUserWaifuIds);
  const [loading, setLoading] = useState(false);

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
    <Button secondary onClick={() => click()}>
      {loading && t("loading")}
      {!loading && !address && t("connect")}
      {!loading &&
        address &&
        `${t("wallet.claim")} ${accumulated.toFixed(0)} WET`}
    </Button>
  );
};

export default ClaimWet;
