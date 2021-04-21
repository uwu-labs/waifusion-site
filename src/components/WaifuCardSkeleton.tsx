import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 220px;
  border-radius: 1rem;
  border: 2px solid var(--plain-shadow);
  box-shadow: 0 0.2rem 0 0 var(--plain-shadow);
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  height: 22.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  :hover {
    box-shadow: 0 0.3rem 0 0 var(--plain-shadow);
    transform: translateY(-0.1rem);
  }

  :active {
    box-shadow: 0 0 0 0 var(--plain-shadow);
    transform: translateY(0.2rem);
  }

  @keyframes loading {
    0% {
      background-position: 0% 0;
    }
    50% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0% 0;
    }
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
`;

const Image = styled.div`
  object-fit: contain;
  width: 100%;
  height: 100%;
  background-color: red;
  transform: scale(1.1);
  user-drag: none;
  user-select: none;
  background: #999999;
  background: linear-gradient(to right, #c8c8c8, #ffffff, #c8c8c8, #ffffff);
  background-size: 400% 400%;
  animation: loading 5s ease infinite;
`;

const DetailHeader = styled.div`
  padding-bottom: 0.5rem;
  height: 36px;
  display: flex;
  align-items: center;
  div {
    width: 100%;
    height: 90%;
    background: #999999;
    background: linear-gradient(to right, #c8c8c8, #ffffff, #c8c8c8, #ffffff);
    background-size: 400% 400%;
    animation: loading 5s ease infinite;
    border-radius: 0.8rem;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 0.5rem;
  height: 27px;

  div {
    width: 100%;
    height: 90%;
    background: #999999;
    background: linear-gradient(to right, #c8c8c8, #ffffff, #c8c8c8, #ffffff);
    background-size: 400% 400%;
    animation: loading 5s ease infinite;
    border-radius: 0.8rem;
  }
`;

const WaifuCard: React.FC = () => {
  return (
    <Container>
      <DetailHeader>
        <div />
      </DetailHeader>
      <ImageContainer>
        <Image />
      </ImageContainer>
      <ActionRow>
        <div />
      </ActionRow>
    </Container>
  );
};

export default WaifuCard;
