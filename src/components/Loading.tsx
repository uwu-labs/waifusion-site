import React from "react";
import styled, { keyframes } from "styled-components";
import Lottie from "react-lottie";
import loadingData from "../assets/loading.json";

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

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;

  div {
    transform: scale(1.3) translateY(20px);
  }
`;

const Loading: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <StyledLoading>
      <Circle>
        <Lottie options={defaultOptions} height={200} width={200} />
      </Circle>
    </StyledLoading>
  );
};

export default Loading;
