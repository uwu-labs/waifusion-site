// Frameworks
import React, { useEffect } from "react";
import { Router } from "@reach/router";

// Layout Management
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "../components/layout";

// Route Templates

import Main from "./main";
import Login from "./login";

// Data Store
import TransactionHistory from "./transactionhistory";
import Provenance from "./provenance";
import Dungeon from "./dungeon";
import Gallery from "./gallery";
import Detail from "./detail";
import Home from "./home";
import Owner from "./owner";
import { Helmet } from "react-helmet";
import { GLOBALS } from "./utils/globals";

// Dynamic Application Wrapper
const App = (props) => {
  // Primary App Layout + Router
  return (
    <Layout>
      <Helmet>
        <title>Waifusion</title>
        <meta
          name="description"
          content={
            "Waifusion is a set of 16384 uniquely generated, anime inspired, digital waifu NFT collectibles on the Ethereum blockchain trading on OpenSea."
          }
        />
        <meta itemprop="name" content={"Waifusion"} />
        <meta property="og:site_name" content={"Waifusion"} />
        <meta
          name="keywords"
          content="Waifus, NFT, NFT waifu, opensea, waifu harem, non fungible token"
        />
        <meta
          property="twitter:description"
          content={
            "Waifusion is a set of 16384 uniquely generated, anime inspired, digital waifu NFT collectibles on the Ethereum blockchain trading on OpenSea."
          }
        />
      </Helmet>
      <Router>
        <PublicRoute path="/app">
          <PrivateRoute path="/" component={Main} />
          <Login path="/login" />
        </PublicRoute>
        <Home path="/"></Home>
        <Gallery path="/app/gallery" />
        <PrivateRoute
          path="/app/transaction-history"
          component={TransactionHistory}
        />
        <PrivateRoute path="/app/provenance" component={Provenance} />
        <PrivateRoute path="/app/dungeon" component={Dungeon} />
        <Detail path="/app/detail/:detailId" />
        <Owner path="/app/owner/:ownerId" />
      </Router>
    </Layout>
  );
};

export default App;
