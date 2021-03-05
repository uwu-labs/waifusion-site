import React from "react";
import { Box } from "rimble-ui";

import Layout from "../components/layout";
import SEO from "../components/seo";
import OverviewGreenBar from "../images/overview_green_bar.png";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";
// import { GLOBALS } from "../app/utils/globals.js";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PurchaseOptionsContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 60px;
  max-width: 1435px;
  justify-content: space-evenly;
`;

const Header = styled.h3`
  color: red;
  width: 100%;
  text-align: center;
  color: rgba(252.00000017881393, 116.00000068545341, 198.00000339746475, 1);
  padding-top: 10px;
  font-family: VT323;
  font-size: 42px;
  letter-spacing: 0;
  line-height: undefined;
  font-weight: normal;
`;

const ProvenancePage = () => (
  <Layout>
    <SEO title="Maid Cafe" />
    <PageContainer>
      <Box className="waifu-card-box overview-card-box">
        <div className="box-upper">
          <img src={OverviewGreenBar} className="waifu-card-box-greenbar" />
          <Box
            className="waifu-card-box-sub"
            color="white"
            style={{ maxWidth: 1424, marginBottom: 1 }}
          >
            <center className="waifu-card-box-center">
              <div class="waifu-card-header-text">The Maid Cafe</div>
              <div className="waifu-card-text waifu-about-text">
                Many of your beloved waifus are working in The Maid Cafe. Come
                for a drink and enjoy the show! Take a Waifu home buy buying
                her, or by burning one of your current Waifus with WET.
              </div>
            </center>
          </Box>
        </div>
      </Box>

      <PurchaseOptionsContainer>
        <Box className="waifu-card-box">
          <div className="box-upper">
            <img src={WaifuPinkBar} className="waifu-card-box-pinkbar" />
            <Box
              className="waifu-card-box-presale-sub"
              color="white"
              style={{ maxWidth: 1000, marginBottom: 1 }}
            >
              <Header>Buy Waifus</Header>
            </Box>
          </div>
        </Box>
        <Box className="waifu-card-box">
          <div className="box-upper">
            <img src={WaifuPinkBar} className="waifu-card-box-pinkbar" />
            <Box
              className="waifu-card-box-presale-sub"
              color="white"
              style={{ maxWidth: 1000, marginBottom: 1 }}
            >
              <Header>Burn Waifus</Header>
            </Box>
          </div>
        </Box>
      </PurchaseOptionsContainer>
    </PageContainer>
  </Layout>
);

export default ProvenancePage;
