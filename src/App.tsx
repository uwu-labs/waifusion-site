import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import WaifuDetail from "./pages/WaifuDetail";
import Footer from "./components/Footer";
import GlobalStyle from "./GlobalStyles";
import WalletPage from "./pages/WalletPage";
import ProvenancePage from "./pages/ProvenancePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { initWeb3 } from "./services/web3";
import Loading from "./components/Loading";
import {
  setBnbBurnPrice,
  setBuyPrice,
  setGlobals,
} from "./state/reducers/globals";
import { getGlobals } from "./services/globals";
import { ContractHelper } from "./services/contract";
import LoadingPurchase from "./components/LoadingPurchase";
import FarmPage from "./pages/FarmPage";
import * as ROUTES from "./constants/routes";
import { setDungeonRemaining } from "./state/reducers/waifus";

const Wrapper = styled.div`
  color: #29252a;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 83.2vh;
`;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [hasPendingReveal, setHasPendingReveal] = useState(false);

  const updateGlobals = async () => {
    const globals = await getGlobals();
    dispatch(setGlobals(globals));
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const buyPrice = await contractHelper.getBuyPrice();
    dispatch(setBuyPrice(buyPrice));
    const bnbBurnPrice = await contractHelper.getBnbBurnPrice();
    dispatch(setBnbBurnPrice(bnbBurnPrice));
    const revealPending = await contractHelper.revealPending();
    setHasPendingReveal(revealPending);
    const dungeonRemaining = await contractHelper.getDungeonRemaining();
    dispatch(setDungeonRemaining(dungeonRemaining));
  };

  const init = async () => {
    initWeb3();
    (window as any).ethereum.enable();
    (window as any).ethereum.on("networkChanged", async () => {
      await updateGlobals();
    });
    await updateGlobals();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Wrapper>
        <GlobalStyle />
        <Router>
          <Navbar />

          <ContentWrapper>
            <Switch>
              <Route
                exact
                path={`${ROUTES.WAIFU}/:id`}
                component={WaifuDetail}
              />
              {/* <Route path={ROUTES.BROWSE} component={BrowsePage} /> */}
              <Route path={ROUTES.WALLET} component={WalletPage} />
              {/* <Route path={ROUTES.DUNGEON} component={DungeonPage} /> */}
              <Route path={ROUTES.PROVENANCE} component={ProvenancePage} />
              <Route path={ROUTES.FARM} component={FarmPage} />
              <Route exact path={ROUTES.HOME} component={HomePage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </ContentWrapper>

          <Footer />
        </Router>
      </Wrapper>
      <LoadingPurchase
        show={hasPendingReveal}
        loading={false}
        close={() => setHasPendingReveal(false)}
      />
    </Suspense>
  );
};

export default App;
