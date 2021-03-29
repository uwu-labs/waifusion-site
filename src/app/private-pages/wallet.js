// Frameworks
import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";
import { Flex, QR, Button, Text, Box, Loader } from "rimble-ui";
import { observer } from "mobx-react-lite";
import BN from "bn.js";

// Wallet Interface
import {
  getAllowance,
  toEthUnit,
  getWETContract,
  wetBalanceOf,
  accoomulate,
} from "../utils/contracthelper";
import { GLOBALS } from "../utils/globals.js";
import { revealedWaifuIndex } from "../utils/waifuDisplay.js";

// Data Store
import { RootStoreContext } from "../stores/root.store";

// Components
import WetPinkBar from "../../images/wet_pink_bar.png";
import WaifuPinkBar from "../../images/waifucard_pink_bar.png";
import WaifuDottedLine from "../../images/waifu_dotted_line.png";
import FocusText from "../../images/focus_waifu_card_text.png";
import BlurredText from "../../images/blurred_text_crop.png";

// Main Route
const Main = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { walletStore, WETStore, transactionStore } = rootStore;

  useEffect(() => {
    async function updateWETS() {
      WETStore.setIsLoading(true);
      await updateWETState();
      WETStore.setIsLoading(false);
    }
    walletStore.loginWalletIfNeeded();
    updateWETS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approveAccount = async () => {
    const currentAllowance = await getAllowance();
    if (currentAllowance > 0) {
      return;
    } else {
      const wetContract = await getWETContract();
      wetContract.methods
        .approve(GLOBALS.WAIFU_CONTRACT_ADDRESS, new BN(GLOBALS.APPROVE_AMOUNT))
        .send()
        .on("transactionHash", (hash) => {
          transactionStore.addPendingTransaction({
            txHash: hash,
            description: "Approval",
          });
        })
        .on("receipt", (receipt) => {
          console.log(receipt);
          walletStore.isPendingApproval = false;
          walletStore.isApproved = true;
        })
        .on("error", (err) => {
          console.log(err);
          walletStore.isPendingApproval = false;
        }); // If a out of gas error, the second parameter is the receipt.
    }
  };

  const claim = async (e) => {
    walletStore.isClaiming = true;
    const windowWeb3 = await getWETContract();

    windowWeb3.methods
      .claim(WETStore.ownedItems.map((a) => a.index))
      .send()
      .on("transactionHash", (hash) => {
        transactionStore.addPendingTransaction({
          txHash: hash,
          description: "Claim All WETs",
        });
      })
      .on("receipt", (receipt) => {
        console.log(receipt);
        WETStore.isClaiming = false;
        updateWETState();
      })
      .on("error", (err) => {
        console.log(err);
        WETStore.isClaiming = false;
      }); // If a out of gas error, the second parameter is the receipt.
  };

  const updateWETState = async () => {
    WETStore.wetBalance = Number(await toEthUnit(await wetBalanceOf())).toFixed(
      2
    );

    let totalAccumulated = new BN(0);
    WETStore.totalAccumulatedLoading = true;

    const t = await accoomulate();

    await t.forEach(async (token) => {
      const accumulated = new BN(token.wetAccumulated);
      const accumulatedWETNumber = Number(await toEthUnit(accumulated)).toFixed(
        2
      );

      WETStore.addOwnedItem({
        index: token.tokenId,
        name: token.name,
        id: token.tokenId,
        accumulatedWETNumber,
      });
      totalAccumulated = totalAccumulated.add(accumulated);
    });

    WETStore.totalAccumulated = Number(
      await toEthUnit(totalAccumulated)
    ).toFixed(2);
    WETStore.totalAccumulatedLoading = false;
    // WETStore.setIsLoading(false);
  };
  return (
    <>
      <Box className="waifu-card-box wallet-box">
        <div className="box-upper">
          <img
            src={WetPinkBar}
            alt="pink nav bar"
            className="waifu-card-box-greenbar"
          />
          <Box
            className="waifu-card-box-sub"
            color="white"
            style={{ maxWidth: 1424, marginBottom: 1 }}
          >
            <center className="waifu-card-box-center wallet-smart-box-center">
              <span className="wallet-box-header">Your Wallet</span>
              <br />
              <Flex className="wallet-qr-container">
                <Box>
                  <div>
                    <QR
                      value={walletStore.defaultAddress}
                      size={308}
                      bgColor={"#181425"}
                      fgColor={"#ffffff"}
                    />
                  </div>
                </Box>
                <Box col-sm-4>
                  <div style={{ marginTop: "55px" }}>
                    <Text className="wallet-text">
                      Current WET: {WETStore.wetBalance}
                    </Text>
                    <Text className="wallet-text">
                      Accumulated WET: {WETStore.totalAccumulated}
                    </Text>
                    <Flex className="wallet-button-container">
                      <Box className="wallet-buttons">
                        <Button.Outline
                          className="waifu-card-buttons"
                          onClick={approveAccount}
                        >
                          <span className="waifu-button-learnmore">
                            {" "}
                            Approve
                          </span>{" "}
                        </Button.Outline>
                      </Box>

                      <Box>
                        <Button.Outline
                          className="waifu-card-buttons"
                          onClick={claim}
                        >
                          <span className="waifu-button-learnmore"> Claim</span>{" "}
                        </Button.Outline>
                      </Box>
                    </Flex>
                  </div>
                </Box>
              </Flex>
              <div className="wallet-contract-address-text">
                Address:{" "}
                <span className="wallet-contract-address">
                  {walletStore.defaultAddress}
                </span>
              </div>
            </center>
          </Box>
        </div>
      </Box>

      {WETStore.isLoading === false &&
        WETStore.ownedItems.map((item) => (
          <Box
            key={item.index}
            className="waifu-card-box waifu-pic-box waifu-pic-box-container waifu-card wallet-waifu-card"
          >
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
                  <span className="card-box-center-pink-text test-margin">
                    <span className="waifu-box-number">Waifu Name: </span>
                    <span className="waifu-box-number">{item.name}</span>
                  </span>
                  <br />
                  <br />
                  <span className="card-box-center-pink-text test-margin">
                    <span className="waifu-box-number">Waifu ID: </span>
                    <span className="waifu-box-number">
                      {item.id}
                      <svg
                        style={{ height: "2vh", marginLeft: "1vw" }}
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="copy"
                        role="img"
                        viewBox="0 0 448 512"
                        className="svg-inline--fa fa-copy fa-w-14 fa-2x"
                        onClick={() => {
                          navigator.clipboard.writeText(item.id);
                        }}
                      >
                        <path
                          fill="currentColor"
                          d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"
                        ></path>
                      </svg>
                    </span>
                  </span>
                  <img
                    className="waifu-dotted-line"
                    alt="waifu dotted line"
                    src={WaifuDottedLine}
                  />
                  <img
                    className="waifu-focus-text"
                    alt="waifu focus text"
                    src={FocusText}
                  />
                  <Link to={"/app/detail/" + item.index}>
                    <img
                      className="waifu-card-image"
                      alt=""
                      src={
                        GLOBALS.WAIFUS_VIEWABLE_URL === ""
                          ? GLOBALS.DEFAULT_WAIFU_IMAGE
                          : GLOBALS.WAIFUS_VIEWABLE_URL +
                            "/" +
                            revealedWaifuIndex(item.index) +
                            ".png"
                      }
                    />
                    <br />
                  </Link>
                  <img
                    className="waifu-blurred-text"
                    alt="waifu blurred text"
                    src={BlurredText}
                  />
                  <br />
                  <img
                    className="waifu-dotted-line"
                    alt="dotted line"
                    style={{ paddingTop: "0px" }}
                    src={WaifuDottedLine}
                  />
                  <br />

                  <span className="card-box-center-pink-text test-margin">
                    <span className="waifu-box-number">No: </span>
                    <span className="waifu-box-number">
                      {" "}
                      {item.index} / {GLOBALS.TOTAL_WAIFUS}
                    </span>
                  </span>

                  <br />
                  <br />
                  <span className="card-box-center-pink-text test-margin">
                    <span className="waifu-box-number">Unclaimed WET: </span>
                    <span className="waifu-box-number">
                      {item.accumulatedWETNumber}
                    </span>
                  </span>
                </center>
              </Box>
            </div>
          </Box>
        ))}

      <Box mt={20}>
        {WETStore.isLoading && (
          <Box className="waifu-card-box wallet-box">
            <div className="box-upper">
              <img
                src={WetPinkBar}
                alt="wet pink bar"
                className="waifu-card-box-greenbar"
              />
              <Box
                className="waifu-card-box-sub"
                color="white"
                style={{ maxWidth: 1424, marginBottom: 1 }}
              >
                <center className="waifu-card-box-center wallet-smart-box-center">
                  <span className="wallet-box-header">LOADING YOUR WAIFUS</span>
                  <br />
                  <Loader
                    className="wallet-waifu-loader"
                    color="#FBE55F"
                    size="80px"
                  />
                </center>
              </Box>
            </div>
          </Box>
        )}
        {WETStore.isLoading === false && WETStore.ownedItems.length === 0 && (
          <Box className="waifu-card-box wallet-box">
            <div className="box-upper">
              <img
                src={WetPinkBar}
                alt="pink nav bar"
                className="waifu-card-box-greenbar"
              />
              <Box
                className="waifu-card-box-sub"
                color="white"
                style={{ maxWidth: 1424, marginBottom: 1 }}
              >
                <center className="waifu-card-box-center wallet-smart-box-center">
                  <span className="wallet-box-header">
                    YOU HAVE <span style={{ color: "#FBE55F" }}>0</span> WAIFUS
                  </span>
                  <br />
                  <div className="waifu-card-text waifu-wallet-text">
                    You don't have any Waifus D: Go get one!
                  </div>
                </center>
              </Box>
            </div>
          </Box>
        )}
      </Box>
    </>
  );
});

export default Main;
