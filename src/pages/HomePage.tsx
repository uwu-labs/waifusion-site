import styled from "styled-components";
import Landing from "../components/Landing";
import WetSlide from "../components/WetSlide";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  return (
    <Container>
      <Landing />
      <WetSlide />
    </Container>
  );
};

export default Home;
