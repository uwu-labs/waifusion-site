import React, { useEffect, useState } from "react";
import { Box, Button } from "rimble-ui";

import Layout from "../components/layout";
import SEO from "../components/seo";
import OverviewGreenBar from "../images/overview_green_bar.png";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";
// import { GLOBALS } from "../app/utils/globals.js";
import styled from "styled-components";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import WaifuSelector from "../components/waifuSelector";
import BuyWaifus from "../components/buyWaifus";
import { GLOBALS } from "../app/utils/globals";

import {
  balanceOf,
  getDungeonAllowance,
  getWaifuContract,
  getWETContract,
  isDungeonApprovedForAll,
  revealPending,
  tokenOfOwnerByIndex,
} from "../app/utils/contracthelper";
import BN from "bn.js";
import PendingButton from "../app/templates/PendingButton";
import Loading from "../components/loading";

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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChainGraphic = styled.div`
  transform: ${(props) =>
    `TranslateX(-50%) TranslateX(${props.x}) TranslateY(${props.y}) Rotate(${props.rotate})`};
`;

const DungeonPage = () => {
  const revealedWaifuIndex = (waifuIndex) => {
    return (Number(waifuIndex) + GLOBALS.STARTING_INDEX) % 16384;
  };
  const [selectingWaifus, setSelectingWaifus] = useState(false);
  const [buyingWaifus, setBuyingWaifus] = useState(false);
  const [waifuDisplays, setWaifuDisplays] = useState([]);
  const [chainDisplays, setChainDisplays] = useState([]);
  const [wetApproved, setWetApproved] = useState(false);
  const [wetApprovalLoading, setWetApprovalLoading] = useState(false);
  const [nftApproved, setNftApproved] = useState(false);
  const [nftApprovalLoading, setNftApprovalLoading] = useState(false);
  const [hasPendingReveal, setHasPendingReveal] = useState(false);

  useEffect(() => {
    getDungeonAllowance().then((value) => {
      setWetApproved(value >= new BN(GLOBALS.APPROVE_AMOUNT));
    });

    isDungeonApprovedForAll().then((value) => {
      setNftApproved(value);
    });

    revealPending().then((value) => {
      if (value) setHasPendingReveal(true);
    });

    async function getDungeonPreview() {
      var _waifyDisplay = [];
      var maxDisplayWaifuCount = 5;

      var _waifuCount = await balanceOf(GLOBALS.DUNGEON_CONTRACT_ADDRESS);
      for (var i = 0; i < maxDisplayWaifuCount && i < _waifuCount; i++) {
        var currentDisplayWaifuDungeonIndex = Math.floor(
          Math.random() * _waifuCount
        );
        var currentDisplayWaifuTokenId = await tokenOfOwnerByIndex(
          currentDisplayWaifuDungeonIndex,
          GLOBALS.DUNGEON_CONTRACT_ADDRESS
        );
        var currentDisplayWaifuHTML = (
          <img
            key={"waifu-peek-" + currentDisplayWaifuTokenId}
            className="dungeon-waifu-card-image"
            alt=""
            src={
              GLOBALS.GALLERY_VIEWABLE_URL +
              "/" +
              revealedWaifuIndex(currentDisplayWaifuTokenId) +
              ".png"
            }
          />
        );
        if (
          // eslint-disable-next-line no-loop-func
          _waifyDisplay.find((elem) => elem.key === currentDisplayWaifuHTML.key)
        ) {
          i--;
        } else {
          _waifyDisplay.push(currentDisplayWaifuHTML);
        }
      }
      return _waifyDisplay;
    }
    getDungeonPreview().then((value) => {
      setWaifuDisplays(value);
    });

    const minChainsCount = 4;
    const maxChainsCount = 12;
    var _chainTemp = [];
    var displayChainCount = Math.floor(
      Math.random() * (maxChainsCount - minChainsCount) + minChainsCount
    );
    for (var i = 0; i < displayChainCount; i++) {
      var newChainGraphic = (
        <ChainGraphic
          className="waifu-dungeon-chain-overlay"
          x={Math.floor(Math.random() * 50) + "%"}
          y={Math.floor(Math.random() * 100) + "%"}
          rotate={Math.floor(Math.random() * 360) + "deg"}
        ></ChainGraphic>
      );
      _chainTemp.push(newChainGraphic);
    }

    setChainDisplays(_chainTemp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approveAccount = async () => {
    const wetContract = await getWETContract();
    wetContract.methods
      .approve(
        GLOBALS.DUNGEON_CONTRACT_ADDRESS,
        new BN("1647000000000000000000000")
      )
      .send()
      .on("transactionHash", (hash) => {
        setWetApprovalLoading(true);
      })
      .on("receipt", (receipt) => {
        setWetApprovalLoading(false);
        setWetApproved(true);
      })
      .on("error", (err) => {
        alert("Error: " + err);
        setWetApprovalLoading(false);
      });
  };

  const approveNfts = async () => {
    const waifuContract = await getWaifuContract();
    waifuContract.methods
      .setApprovalForAll(GLOBALS.DUNGEON_CONTRACT_ADDRESS, true)
      .send()
      .on("transactionHash", (hash) => {
        setNftApprovalLoading(true);
      })
      .on("receipt", (receipt) => {
        setNftApprovalLoading(false);
        setNftApproved(true);
      })
      .on("error", (err) => {
        alert("Error: " + err);
        setNftApprovalLoading(false);
      });
  };

  return (
    <Layout>
      <SEO title="Dungeon" />
      <PageContainer>
        <Box className="waifu-card-box overview-card-box">
          <div className="box-upper">
            <img
              src={OverviewGreenBar}
              alt="green nav bar"
              className="waifu-card-box-greenbar"
            />
            <Box
              className="waifu-card-box-sub"
              color="white"
              style={{ maxWidth: 1424, marginBottom: 1, innerHeight: 100 }}
            >
              <center className="waifu-card-box-center">
                <div className="waifu-card-header-text">The Dungeon</div>
                <div className="waifu-card-text waifu-about-text">
                  Many of your beloved waifus are enslaved in the Dungeon! Be a
                  hero and save your beloved by buying her freedom, or be the
                  villain and burn one of your current Waifus with WET in
                  exchange for a new one from the dungeon.
                  <br />
                  <br />
                </div>
                <div className="waifu-card-text waifu-about-text">
                  A peek in the dungeon
                  <br />
                  <div className="waifu-dungeon-peek-container">
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                      }}
                    >
                      {chainDisplays}
                    </div>
                    {waifuDisplays}
                  </div>
                </div>
              </center>
            </Box>
          </div>
        </Box>

        <PurchaseOptionsContainer>
          <Box className="waifu-card-box">
            <BoxUpper>
              <img
                src={WaifuPinkBar}
                alt="pink nav bar"
                className="waifu-card-box-pinkbar"
              />
              <BoxContent>
                <Header>Buy Waifus</Header>
                <Content>
                  Buy a new Waifu from the Dungeon for 0.7 ETH. You will receive
                  a random Waifu from the dungeon.
                </Content>
                <ButtonContainer>
                  <Button.Outline
                    className="waifu-card-buttons"
                    onClick={() => {
                      setBuyingWaifus(true);
                    }}
                  >
                    <span className="waifu-button-learnmore">Buy WAIFU</span>
                  </Button.Outline>
                </ButtonContainer>
              </BoxContent>
            </BoxUpper>
          </Box>
          <Box className="waifu-card-box">
            <BoxUpper>
              <img
                src={WaifuPinkBar}
                alt="pink nav bar"
                className="waifu-card-box-pinkbar"
              />
              <BoxContent>
                <Header>Burn Waifus</Header>
                <Content>
                  Burn one of your existing Waifus and pay 5,490 WET Tokens to
                  receive a new random Waifu.
                </Content>
                <ButtonContainer>
                  {!wetApproved && (
                    <PendingButton
                      isPending={wetApprovalLoading}
                      clickEvent={() => approveAccount()}
                      text="Approve WET"
                    />
                  )}
                  {wetApproved && !nftApproved && (
                    <PendingButton
                      isPending={nftApprovalLoading}
                      clickEvent={() => approveNfts()}
                      text="Approve WAIFU"
                    />
                  )}
                  {wetApproved && nftApproved && (
                    <Button.Outline
                      className="waifu-card-buttons"
                      onClick={() => {
                        setSelectingWaifus(true);
                      }}
                    >
                      <span className="waifu-button-learnmore">Burn WAIFU</span>
                    </Button.Outline>
                  )}
                </ButtonContainer>
              </BoxContent>
            </BoxUpper>
          </Box>
        </PurchaseOptionsContainer>
      </PageContainer>
      <WaifuSelector
        show={selectingWaifus}
        close={() => setSelectingWaifus(false)}
      />
      <BuyWaifus show={buyingWaifus} close={() => setBuyingWaifus(false)} />
      <Loading show={hasPendingReveal} complete={true} />
    </Layout>
  );
};
export default DungeonPage;
