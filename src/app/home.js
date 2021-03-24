// Frameworks
import React from "react";
import { Link } from "gatsby";
import { Flex, Button, Box } from "rimble-ui";

// Components
import { GLOBALS } from "./utils/globals.js";
import OverviewGreenBar from "../images/overview_green_bar.png";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";
import WaifuDottedLine from "../images/waifu_dotted_line.png";
import FocusText from "../images/focus_waifu_card_text.png";
import BlurredText from "../images/blurred_text_crop.png";

import "../components/home.css";

// Main Route
const Home = (props) => {
  return (
    <>
      <Box className="waifu-card-container">
        <Flex>
          {/*This is the Waifu card container*/}
          <Box>
            <Box className="waifu-card-box waifu-pic-box waifu-pic-box-container waifu-card">
              <div className="box-upper">
                <img
                  src={WaifuPinkBar}
                  alt="pink nav bar"
                  className="waifu-card-box-pinkbar"
                />
                <Box
                  className="waifu-card-box-pink-sub waifu-pic-box waifu-card-sub-black"
                  color="white"
                  style={{ maxWidth: 1424, marginBottom: 1 }}
                >
                  <center className="waifu-pic-box-center waifu-card-pink-center">
                    <span className="card-box-center-pink-text">
                      Waifu Name #6969 test
                    </span>
                    <img
                      className="waifu-dotted-line"
                      alt="pink nav bar"
                      src={WaifuDottedLine}
                    />
                    <img
                      className="waifu-focus-text"
                      alt="pink nav bar"
                      src={FocusText}
                    />
                    <img
                      className="waifu-card-image"
                      alt="pink nav bar"
                      src={GLOBALS.DEFAULT_WAIFU_IMAGE}
                    />
                    <br />
                    <img
                      className="waifu-blurred-text"
                      alt="pink nav bar"
                      src={BlurredText}
                    />
                    <br />
                    <img
                      className="waifu-dotted-line"
                      alt="pink nav bar"
                      style={{ paddingTop: "0px" }}
                      src={WaifuDottedLine}
                    />
                    <br />
                    <span className="card-box-center-pink-text test-margin">
                      <span className="waifu-box-number">NO: </span>
                      <span className="waifu-box-number">6969/16383</span>
                    </span>
                    <br />
                  </center>
                </Box>
              </div>
            </Box>
          </Box>
          {/*This is the About container*/}
          <Box className="green-sub-container waifu-home-green-box waifu-home-green-box-container">
            <Box className="waifu-card-box">
              <div className="green-sub-box">
                <img
                  src={OverviewGreenBar}
                  alt="pink nav bar"
                  className="waifu-card-box-greenbar"
                />
                <Box
                  className="waifu-card-box-sub"
                  color="white"
                  style={{ maxWidth: 1424, marginBottom: 1 }}
                >
                  <center className="waifu-card-box-center">
                    <span id="e0_338">WHAT IS WAIFUSION?</span>
                    <br />
                    <div className="waifu-card-text waifu-about-text">
                      Waifusion is a digital Waifu collection. There are 16,384
                      guaranteed-unique Waifusion NFTs. They’re just like you; a
                      beautiful work of art, but 2-D and therefore, superior,
                      Anon-kun.
                      <br />
                      <br />
                      Waifusions are randomly and fairly distributed on-chain
                      which means they don’t like it when perverts try to add
                      too many Waifus to their harem. Be faithful to your Waifus
                      and only buy a max of 20 at once for your harem!
                      <br />
                      <br />
                      Each Waifu is wholly unique and yours forever... unless
                      you sell them... Baka.
                      <br />
                      <br />
                      <div className="waifu-card-header-text">
                        Get Your Waifus WET?
                      </div>
                      <br />
                      <br />
                      When you hold a Waifusion NFT, you get WET. WET lets you
                      change the name of your currently-owned Waifusions. After
                      10 years, no one gets WET anymore. Ben Shapiro was right.
                    </div>
                    <Box>
                      <Link to="/overview">
                        <Button.Outline className="waifu-card-buttons">
                          <span className="waifu-button-learnmore">
                            Learn MORE
                          </span>
                        </Button.Outline>
                      </Link>
                    </Box>
                  </center>
                </Box>
              </div>
            </Box>
          </Box>
        </Flex>
      </Box>
      {/*This is the dungeon cta container*/}
      <Box className="waifu-presale-container">
        <Box className="waifu-card-box">
          <div className="box-upper">
            <img
              src={OverviewGreenBar}
              alt="green nav bar"
              className="waifu-card-box-greenbar"
            />
            <Box
              className="waifu-card-box-presale-sub"
              color="white"
              style={{ maxWidth: 1000, marginBottom: 1 }}
            >
              <center className="waifu-card-box-center">
                <div className="dungeon-cta-title">The Dungeon</div>
                <div className="waifu-card-text waifu-about-text text-center">
                  Help! All the remaining waifus have been thrown in the
                  dungeon!
                  <br />
                  <br />
                  You can buy a waifu's freedom by paying the last presale price
                  of 0.7ETH
                  <br />
                  <br />
                  Have a naughty waifu? Burn WET to throw her into the dungeon
                  permanently and exchange her for a more obedient waifu.
                </div>
                <Link to="/dungeon">
                  <Button.Outline className="waifu-card-buttons large">
                    <span className="waifu-button-learnmore large">
                      To the Dungeon...
                    </span>
                  </Button.Outline>
                </Link>
              </center>
            </Box>
          </div>
        </Box>
      </Box>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Home;
