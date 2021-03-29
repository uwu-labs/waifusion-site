import React from "react";
import styled from "styled-components";
import Landing from "../components/Landing";
import Preview from "../components/Preview";
import WetSlide from "../components/WetSlide";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <Landing />
      <WetSlide />
      <Preview />
    </Container>
  );
};

export default Home;
