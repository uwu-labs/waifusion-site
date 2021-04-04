import React, { useEffect, useState } from "react";
import styled from "styled-components";
import loading from "../assets/loading.gif";

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
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  transition: all 0.6s;
`;

const Animation = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: 300px;
  height: 300px;
  filter: contrast(1.02);
`;

const Loading: React.FC = () => {
  const [size, setSize] = useState("0");

  useEffect(() => {
    setTimeout(() => {
      setSize("200px");
    }, 500);
  }, []);

  return (
    <StyledLoading>
      <Circle style={{ width: size, height: size }}>
        <Animation src={loading} />
      </Circle>
    </StyledLoading>
  );
};

export default Loading;
