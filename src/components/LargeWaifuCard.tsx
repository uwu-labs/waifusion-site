import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectImageApi } from "../state/reducers/globals";

const Container = styled.div`
  position: relative;
  width: 500px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
`;

type Props = {
  id: number;
};

const LargeWaifuCard: React.FC<Props> = ({ id }) => {
  const imageApi = useSelector(selectImageApi);

  return (
    <Container>
      <Image draggable={false} src={`${imageApi}${id}.png`} loading="lazy" />
    </Container>
  );
};

export default LargeWaifuCard;
