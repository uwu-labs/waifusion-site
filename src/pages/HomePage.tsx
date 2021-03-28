import styled from "styled-components";
import { PageContentWrapper } from "../components/CommonLayout";
import Landing from "../components/Landing";

const Container = styled(PageContentWrapper)`
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
