import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Head from "../components/Head";
import Landing from "../components/Landing";
import Preview from "../components/Preview";
import WetSlide from "../components/WetSlide";
import { selectIsEth } from "../state/reducers/globals";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Home: React.FC = () => {
  const isEth = useSelector(selectIsEth);

  return (
    <Container>
      <Head title="Anime Ethereum NFT Collectibles" />
      <Landing />
      <WetSlide />
      {!isEth && <Preview />}
    </Container>
  );
};

export default Home;
