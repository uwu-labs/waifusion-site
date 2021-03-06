// Frameworks
import React, { useContext, useEffect, useState } from "react";
import { navigate, Link } from "gatsby";
import {
  Input,
  Blockie,
  Card,
  Flex,
  Heading,
  Button,
  Text,
  Box,
  Select,
  Field,
  Modal,
  width,
} from "rimble-ui";
// import {Input, Blockie, Card, Flex, Heading, Button, Text, Box, Select, Field, Modal} from '@material-ui/core/Button';
import { observer } from "mobx-react-lite";
import BN from "bn.js";

import { getTotalSupply } from "./utils/contracthelper";

// Components
import Login from "./login";
import PendingButton from "./templates/PendingButton";
import { GLOBALS } from "./utils/globals.js";
import WaifuCard from "../assets/Waifu_Card.svg";
import OverviewGreenBar from "../images/overview_green_bar.png";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";
import WaifuDottedLine from "../images/waifu_dotted_line.png";
import FocusText from "../images/focus_waifu_card_text.png";
import Presale from "../assets/presale.svg";
import BlurredText from "../images/blurred_text_crop.png";

// Data Store
import { RootStoreContext } from "./stores/root.store";
import { getWaifuContract } from "./utils/contracthelper";
import { loadWaifus } from "./utils/dbhelper";

import "../components/home.css";

// Main Route
const Home = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { walletStore, homeStore, transactionStore } = rootStore;

  const [timer, setTimer] = useState();
  const [totalSupply, setTotalSupply] = useState(GLOBALS.TOTAL_WAIFUS);

  useEffect(() => {
    async function updatePAS() {
      await updatePriceAndSupply();
    }

    homeStore.saleStarted = Number(new Date().getTime() / 1000) >= 1611846000;
    updatePAS();
    setTimer(setInterval(updatePriceAndSupply, 60000));

    return () => {
      clearInterval(timer);
    };
  }, []);

  const closeBuyModal = () => {
    homeStore.isBuyModalOpen = false;
    homeStore.pendingBuy = false;
  };
  const openBuyModal = () => {
    //If needs to login, go to wallet page
    if (!walletStore.isWalletConnected) {
      console.log("open buy modal");
      navigate("/app/login");
    } else {
      homeStore.isBuyModalOpen = true;
      homeStore.pendingBuy = true;
    }
  };
  const validatePurchase = async () => {
    homeStore.validationResults = "";

    if (homeStore.purchaseQuantity > 20) {
      homeStore.validationResults =
        "You cannot buy more than 20 Waifus in a single transaction";
      return false;
    }
    if (homeStore.purchaseQuantity <= 0) {
      homeStore.validationResults = "Number of Waifus cannot be 0 or negative";
      return false;
    }

    const waifuContract = await getWaifuContract();
    homeStore.pendingBuy = false;

    const estimatedGas = 200000 * homeStore.purchaseQuantity;
    console.log("NFT Price: " + homeStore.nftPrice);

    var nftPrice = await waifuContract.methods.getNFTPrice().call();

    waifuContract.methods
      .mintNFT(homeStore.purchaseQuantity)
      .send({
        value: new BN(nftPrice).mul(new BN(homeStore.purchaseQuantity)), //new BN(homeStore.nftPrice).mul(new BN(homeStore.purchaseQuantity)).toString(),
        gas: estimatedGas,
      })
      .on("transactionHash", (hash) => {
        console.log("TransactionHash Call");
        console.log(hash);
        transactionStore.addPendingTransaction({
          txHash: hash,
          description: `Buy ${homeStore.purchaseQuantity} NFTs `,
        });
        closeBuyModal();
      })
      .on("receipt", (receipt) => {
        console.log("Receipt call");
        console.log(receipt);
        homeStore.pendingBuy = false;
        updatePriceAndSupply();
      })
      .on("error", (err) => {
        console.log("Error Call");
        console.log(err);
        homeStore.validationResults = err.message;
        homeStore.pendingBuy = false;
      }); // If a out of gas error, the second parameter is the receipt.
  };

  const updatePriceAndSupply = async () => {
    setTotalSupply(GLOBALS.TOTAL_WAIFUS);
    let remainingSupply = await getTotalSupply();
    let progArray = [];

    for (let obj of GLOBALS.NFT_VAL_ARRAY) {
      if (remainingSupply >= obj.nftVal) {
        remainingSupply -= obj.nftVal;
        progArray.push(100);
      } else {
        homeStore.remainingAtCurrentPrice = obj.nftVal - remainingSupply;
        progArray.push((remainingSupply / obj.nftVal) * 100);
        break;
      }
    }
    homeStore.progressArray = progArray;
  };

  return (
    <>
      <Box className="waifu-card-container">
        <Flex>
          {/*This is the Waifu card container*/}
          <Box>
            <Box className="waifu-card-box waifu-pic-box waifu-pic-box-container waifu-card">
              <div className="box-upper">
                <img src={WaifuPinkBar} className="waifu-card-box-pinkbar" />
                <Box
                  className="waifu-card-box-pink-sub waifu-pic-box waifu-card-sub-black"
                  color="white"
                  style={{ maxWidth: 1424, marginBottom: 1 }}
                >
                  <center className="waifu-pic-box-center waifu-card-pink-center">
                    <span className="card-box-center-pink-text">
                      Waifu Name #6969
                    </span>
                    <img className="waifu-dotted-line" src={WaifuDottedLine} />
                    <img className="waifu-focus-text" src={FocusText} />
                    <img
                      className="waifu-card-image"
                      src={GLOBALS.DEFAULT_WAIFU_IMAGE}
                    />
                    <br />
                    <img className="waifu-blurred-text" src={BlurredText} />
                    <br />
                    <img
                      className="waifu-dotted-line"
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
                      <div class="waifu-card-header-text">
                        Get Your Waifus WET?
                      </div>
                      <br />
                      <br />
                      When you hold a Waifusion NFT, you get WET. WET lets you
                      change the name of your currently-owned Waifusions. After
                      10 years, no one gets WET anymore. Ben Shapiro was right.
                    </div>
                    <Box>
                      <Flex className="about-buttons-container">
                        <Box style={{ paddingRight: "25px" }}>
                          <Link to="/overview">
                            <Button.Outline className="waifu-card-buttons">
                              <span className="waifu-button-learnmore">
                                {" "}
                                Learn MORE
                              </span>{" "}
                            </Button.Outline>
                          </Link>
                        </Box>
                        <Box>
                          <Button.Outline
                            className="waifu-card-buttons"
                            onClick={openBuyModal}
                          >
                            <span className="waifu-button-learnmore">
                              {" "}
                              Buy WAIFU
                            </span>{" "}
                          </Button.Outline>
                        </Box>
                      </Flex>
                    </Box>
                  </center>
                </Box>
              </div>
            </Box>
          </Box>
        </Flex>
      </Box>
      {/*This is the presale container*/}
      <Box className="waifu-presale-container">
        <Box className="waifu-card-box">
          <div className="box-upper">
            <img src={OverviewGreenBar} className="waifu-card-box-greenbar" />
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

      {/* BUY MODAL */}
      <Modal isOpen={homeStore.isBuyModalOpen}>
        <Box className="waifu-presale-container">
          <Box className="waifu-card-box">
            <div className="box-upper">
              <img src={OverviewGreenBar} className="waifu-card-box-greenbar" />
              <Box
                className="waifu-card-box-presale-sub"
                color="white"
                style={{ maxWidth: 1000, marginBottom: 1 }}
              >
                <center className="waifu-card-box-center">
                  <div className="modal-header-text">Number of WaiFusions</div>
                  <Input
                    className="waifu-input"
                    type="number"
                    placeholder="How Many?"
                    min="0"
                    max="20"
                    value={homeStore.purchaseQuantity}
                    onChange={(event) => {
                      console.log("Event: " + event.target.value);
                      homeStore.updatePurchaseQuantity(event.target.value);
                    }}
                  ></Input>
                  <Text className="modal-main-text">
                    You can buy up to 20 per transaction
                  </Text>
                  <Text className="modal-error-text">
                    {homeStore.validationResults}
                  </Text>
                  <br />
                  <Box className="modal-button-container">
                    <Button.Outline
                      className="modal-buttons"
                      onClick={closeBuyModal}
                    >
                      <span className="waifu-button-learnmore"> Cancel</span>{" "}
                    </Button.Outline>
                    <Button.Outline
                      className="modal-buttons"
                      onClick={validatePurchase}
                    >
                      <span className="waifu-button-learnmore"> Purchase</span>{" "}
                    </Button.Outline>
                  </Box>
                </center>
              </Box>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
});

export default Home;
