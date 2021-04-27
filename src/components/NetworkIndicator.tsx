import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import bnb from "../assets/bnb-coin.png";
import eth from "../assets/eth-coin.png";
import { selectIsEth } from "../state/reducers/globals";

const StyledNetworkIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px var(--highlight);
  border-radius: 50%;
  padding: 0.3rem;
  margin-left: 12px;
  transform: translateY(1px);
`;

const Network = styled.img`
  width: 1.3rem;
`;

const NetworkIndicator: React.FC = () => {
  const isEth = useSelector(selectIsEth);

  return (
    <StyledNetworkIndicator>
      <Network src={isEth ? eth : bnb} alt={isEth ? "ETH" : "BSC"} />
    </StyledNetworkIndicator>
  );
};

export default NetworkIndicator;
