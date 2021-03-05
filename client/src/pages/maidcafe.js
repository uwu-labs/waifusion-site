import React from "react";
import { Box, Button } from "rimble-ui";

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
  justify-content: space-evenly;
  max-width: 1435px;
`;

const BoxUpper = styled.div`
  height: 100%;
  margin-top: 2px;
  margin-left: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 549px;
`;

const BoxContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(
    24.000000469386578,
    20.000000707805157,
    37.00000159442425,
    1
  );
  padding-left: 62px;
  padding-right: 62px;
  padding-bottom: 20px;
  margin-top: 2px;
  margin-bottom: 4px;
  margin-right: 4px;
  margin-left: 2px;
  display: flex;
  flex-direction: column;
  color: #fff;
  max-width: 1435px;
`;

const Header = styled.h3`
  color: red;
  width: 100%;
  height: 100%;
  text-align: center;
  color: rgba(252.00000017881393, 116.00000068545341, 198.00000339746475, 1);
  padding-top: 10px;
  font-family: VT323;
  font-size: 42px;
  letter-spacing: 0;
  line-height: undefined;
  font-weight: normal;
`;

const Content = styled.p`
  width: 100%;
  font-family: VT323 !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 24px !important;
  line-height: 24px !important;
  text-align: center !important;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MaidCafePage = () => (
  <Layout>
    <SEO title="Maid Cafe" />
    <PageContainer>
      <Box className="waifu-card-box overview-card-box">
        <div className="box-upper">
          <img src={OverviewGreenBar} className="waifu-card-box-greenbar" />
          <Box
            className="waifu-card-box-sub"
            color="white"
            style={{ maxWidth: 1424, marginBottom: 1, innerHeight: 100 }}
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
          <BoxUpper>
            <img src={WaifuPinkBar} className="waifu-card-box-pinkbar" />
            <BoxContent>
              <Header>Buy Waifus</Header>
              <Content>
                Buy a new Waifu from the Maid Cafe for 0.7 ETH. You will recieve
                a random Waifu from the Cafe.
              </Content>
              <ButtonContainer>
                <Button.Outline
                  className="waifu-card-buttons"
                  onClick={() => console.log("meow")}
                >
                  <span className="waifu-button-learnmore">Buy WAIFU</span>
                </Button.Outline>
              </ButtonContainer>
            </BoxContent>
          </BoxUpper>
        </Box>
        <Box className="waifu-card-box">
          <BoxUpper>
            <img src={WaifuPinkBar} className="waifu-card-box-pinkbar" />
            <BoxContent>
              <Header>Burn Waifus</Header>
              <Content>
                Burn one of your existing Waifus and pay 5,490 WET Tokens to
                recieve a new random Waifu.
              </Content>
              <ButtonContainer>
                <Button.Outline
                  className="waifu-card-buttons"
                  onClick={() => console.log("meow")}
                >
                  <span className="waifu-button-learnmore">Burn WAIFU</span>
                </Button.Outline>
              </ButtonContainer>
            </BoxContent>
          </BoxUpper>
        </Box>
      </PurchaseOptionsContainer>
    </PageContainer>
  </Layout>
);

export default MaidCafePage;
