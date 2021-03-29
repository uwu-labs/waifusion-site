import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 500px;
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
`;

const LargeWaifuCard = () => (
  <Container>
    <Image
      draggable={false}
      src="https://ipfs.io/ipfs/QmQuzMGqHxSXugCUvWQjDCDHWhiGB75usKbrZk6Ec6pFvw/13638.png"
    />
  </Container>
);

export default LargeWaifuCard;
