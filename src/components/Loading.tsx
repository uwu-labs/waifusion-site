import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import loading from "../assets/loading-icon.png";

const StyledLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Animation = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  filter: contrast(1.02);
  user-select: none;
  animation: ${rotate} 2s linear 0s infinite;
`;

const Loading: React.FC = () => {
  return (
    <StyledLoading>
      <Animation src={loading} />
    </StyledLoading>
  );
};

export default Loading;
