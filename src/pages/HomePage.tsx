import styled from "styled-components";
import Landing from "../components/Landing";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  return (
    <Container>
      <Landing />
    </Container>
  );
};

export default Home;
