import React from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import { selectTotalAccumulated } from "../state/reducers/user";

const ClaimWet: React.FC = () => {
  const accumulated = useSelector(selectTotalAccumulated);

  return <Button secondary>{`Claim ${accumulated.toFixed(0)} WET`}</Button>;
};

export default ClaimWet;
