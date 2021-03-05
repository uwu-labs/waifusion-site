// Frameworks
import React, { useContext } from "react";
import { Router } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

// Layout Management
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "../components/layout";

// Route Templates

import Main from "./main";
import Login from "./login";

// Data Store
import { RootStoreContext } from "./stores/root.store";
import TransactionHistory from "./TransactionHistory";
import Provenance from "./Provenance";
import Brothel from "./Brothel";
import Gallery from "./Gallery";
import Detail from "./Detail";
import Home from "./Home";
import Owner from "./Owner";

// Dynamic Application Wrapper
const App = (props) => {
  const rootStore = useContext(RootStoreContext);
  const siteData = useStaticQuery(graphql`
    query SiteDataQuery {
      site {
        siteMetadata {
          title
          logoUrl
        }
      }
    }
  `);

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
        <PrivateRoute path="/app/brothel" component={Brothel} />
        <Detail path="/app/detail/:detailId" />
        <Owner path="/app/owner/:ownerId" />
      </Router>
    </Layout>
  );
};

export default App;
