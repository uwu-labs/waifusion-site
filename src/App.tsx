import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import WaifuDetail from "./pages/WaifuDetail";

const Wrapper = styled.div`
  color: #29252a;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
`;

function App() {
  return (
    <Wrapper>
      <Navbar />

      <ContentWrapper>
        <Router>
          <Switch>
            <Route exact path="/waifu/:id" component={WaifuDetail} />
          </Switch>
        </Router>
      </ContentWrapper>
    </Wrapper>
  );
}

export default App;
