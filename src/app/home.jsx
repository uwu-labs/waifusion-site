// Frameworks
import React from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "../components/ui";

// Components
import { GLOBALS } from "./utils/globals.js";
import OverviewGreenBar from "../images/overview_green_bar.png";
import PresaleShowcase from "../components/PresaleShowcase";

import "../components/home.css";

// Main Route — overview + presale + dungeon only (no hero waifu card)
const Home = () => {
  return (
    <>
      <Box className="waifu-card-container home-landing-overview-only">
        <Box className="green-sub-container waifu-home-green-box waifu-home-green-box-container">
          <Box className="waifu-card-box">
            <div className="green-sub-box">
              <img
                loading="lazy"
                decoding="async"
                src={OverviewGreenBar}
                alt=""
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
                    Waifusions are randomly and fairly distributed on-chain which
                    means they don’t like it when perverts try to add too many
                    Waifus to their harem. Be faithful to your Waifus and only
                    buy a max of 20 at once for your harem!
                    <br />
                    <br />
                    Each Waifu is wholly unique and yours forever... unless you
                    sell them... Baka.
                    <br />
                    <br />
                    <div className="waifu-card-header-text">
                      Get Your Waifus WET?
                    </div>
                    <br />
                    <br />
                    When you hold a Waifusion NFT, you get WET. WET lets you
                    change the name of your currently-owned Waifusions. After 10
                    years, no one gets WET anymore. Ben Shapiro was right.
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
      </Box>
      <PresaleShowcase />
      <Box className="waifu-card-container home-landing-dungeon-window">
        <Box className="green-sub-container waifu-home-green-box waifu-home-green-box-container">
          <Box className="waifu-card-box">
            <div className="green-sub-box">
              <img
                loading="lazy"
                decoding="async"
                src={OverviewGreenBar}
                alt=""
                className="waifu-card-box-greenbar"
              />
              <Box
                className="waifu-card-box-sub"
                color="white"
                style={{ maxWidth: 1424, marginBottom: 1 }}
              >
                <center className="waifu-card-box-center">
                  <span className="home-landing-window-title">THE DUNGEON</span>
                  <br />
                  <div className="waifu-card-text waifu-about-text">
                    Help! All the remaining waifus have been thrown in the
                    dungeon!
                    <br />
                    <br />
                    You can buy a waifu&apos;s freedom by paying the last presale
                    price of {GLOBALS.BUY_PRICE} {GLOBALS.CURRENCY}
                    <br />
                    <br />
                    Have a naughty waifu? Burn WET to throw her into the dungeon
                    permanently and exchange her for a more obedient waifu.
                  </div>
                  <Box>
                    <Link to="/dungeon">
                      <Button.Outline className="waifu-card-buttons large">
                        <span className="waifu-button-learnmore large">
                          To the Dungeon...
                        </span>
                      </Button.Outline>
                    </Link>
                  </Box>
                </center>
              </Box>
            </div>
          </Box>
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
