// Frameworks
import React from "react";
import { Router } from "@reach/router";

// Layout Management
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "../components/layout";

// Route Templates

import Main from "./main";
import Login from "./login";

// Data Store
import TransactionHistory from "./TransactionHistory";
import Provenance from "./Provenance";
import Dungeon from "./dungeon";
import Gallery from "./Gallery";
import Detail from "./Detail";
import Home from "./Home";
import Owner from "./Owner";

// Dynamic Application Wrapper
const App = (props) => {
  // Primary App Layout + Router
  return (
    <Layout>
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
