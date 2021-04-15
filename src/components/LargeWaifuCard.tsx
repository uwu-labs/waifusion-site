import React from "react";
import styled from "styled-components";
import GLOBALS from "../services/globals";

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

const LargeWaifuCard: React.FC<Props> = ({ id }) => (
  <Container>
    <Image
      draggable={false}
      src={`${GLOBALS.IMAGE_API}${id}.png`}
      loading="lazy"
    />
  </Container>
);

export default LargeWaifuCard;
