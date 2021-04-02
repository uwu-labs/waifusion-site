import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 500px;
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
      src={`https://global-harem.waifusion.sexy/v1/ETH_WAIFU/${id}.png`}
    />
  </Container>
);

export default LargeWaifuCard;
