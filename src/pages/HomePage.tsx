import styled from "styled-components";
import Landing from "../components/Landing";
import Slide from "../components/Slide";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  return (
    <Container>
      <Landing />
      <Slide />
    </Container>
  );
};

export default Home;
