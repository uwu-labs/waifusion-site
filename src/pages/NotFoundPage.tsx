import styled from "styled-components";
import Header from "../components/Header";

const StyledNotFoundPage = styled.div``;

const NotFoundPage = () => {
  return (
    <StyledNotFoundPage>
      <Header text={"404 Page not Found"} />
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
