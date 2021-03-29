import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import WaifuDetail from "./pages/WaifuDetail";
import Footer from "./components/Footer";
import GlobalStyle from "./GlobalStyles";
import BrowsePage from "./pages/BrowsePage";
import WalletPage from "./pages/WalletPage";
import DungeonPage from "./pages/DungeonPage";
import ProvenancePage from "./pages/ProvenancePage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const Wrapper = styled.div`
  color: #29252a;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 83.2vh;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Router>
        <Navbar />

        <ContentWrapper>
          <Switch>
            <Route exact path="/waifu/:id" component={WaifuDetail} />
            <Route path="/browse" component={BrowsePage} />
            <Route path="/wallet" component={WalletPage} />
            <Route path="/dungeon" component={DungeonPage} />
            <Route path="/provenance" component={ProvenancePage} />
            <Route path="/history" component={HistoryPage} />
            <Route exact path="/" component={HomePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </ContentWrapper>

        <Footer />
      </Router>
    </Wrapper>
  );
};

export default App;
