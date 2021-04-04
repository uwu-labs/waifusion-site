import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      {loading && "Loading"}
      {!loading && !address && "Connect"}
      {!loading && address && `Claim ${accumulated.toFixed(0)} WET`}
    </Button>
  );
};

export default ClaimWet;
