import React, { useEffect, useState } from "react";
import { Box, Button } from "rimble-ui";

import Layout from "../components/layout";
import SEO from "../components/seo";
import OverviewGreenBar from "../images/overview_green_bar.png";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";
// import { GLOBALS } from "../app/utils/globals.js";
import styled from "styled-components";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import Loading from "../components/loading";
import WaifuSelector from "../components/waifuSelector";
import BuyWaifus from "../components/buyWaifus";
import { GLOBALS } from "../app/utils/globals";

import {balanceOf,tokenOfOwnerByIndex} from '../app/utils/contracthelper';

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

const DungeonPage = () => {

  

  const revealedWaifuIndex = (waifuIndex) =>{ 
    return (Number(waifuIndex) + GLOBALS.STARTING_INDEX) % 16384;
}
  const [selectingWaifus, setSelectingWaifus] = useState(false);
  const [buyingWaifus, setBuyingWaifus] = useState(false);
  const [waifusInDungeon, setWaifusInDungeon] = useState(0);
  const [waifuDisplays, setWaifuDisplays] = useState([]);

useEffect(()  => {
    async function getDungeonPreview(){
    var _waifuDisplay = []
    var maxDisplayWaifuCount = 5;

    setWaifusInDungeon(await balanceOf(GLOBALS.DUNGEON_CONTRACT_ADDRESS));
    for(var i = 0; i< maxDisplayWaifuCount && i < waifusInDungeon; i++){

      var currentDisplayWaifuDungeonIndex = Math.floor(Math.random() * (waifusInDungeon));
      var currentDisplayWaifuTokenId = await tokenOfOwnerByIndex(currentDisplayWaifuDungeonIndex, GLOBALS.DUNGEON_CONTRACT_ADDRESS);
      var currentDisplayWaifuHTML = <img className="dungeon-waifu-card-image" src={GLOBALS.GALLERY_VIEWABLE_URL +"/" + revealedWaifuIndex(currentDisplayWaifuTokenId) +'.png'}/>;
      console.log(currentDisplayWaifuTokenId);
      if(_waifuDisplay.includes(currentDisplayWaifuHTML)){
        i--;
      }
      else{
        _waifuDisplay.push(currentDisplayWaifuHTML);
      }
    }
    return _waifuDisplay;
  }
  getDungeonPreview().then((value) =>{
    console.log(value);
    setWaifuDisplays(value);
  });;
},[]);





  return (
    <Layout>
      <SEO title="Dungeon" />
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
                <div class="waifu-card-header-text">The Dungeon</div>
                <div className="waifu-card-text waifu-about-text">
                  Many of your beloved waifus are enslaved in the Dungeon!
                  Be a hero and save your beloved by buying her freedom, or be the
                  villain and burn one of your current Waifus with WET in
                  exchange for a new one from the dungeon.
                  <br/><br/>
                </div>
                <div className="waifu-card-text waifu-about-text">
                  A peek in the dungeon
                  <br/>
                  {waifuDisplays}
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
                  Buy a new Waifu from the Dungeon for 0.7 ETH. You will
                  receive a random Waifu from the dungeon.
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
              <img src={WaifuPinkBar} className="waifu-card-box-pinkbar" />
              <BoxContent>
                <Header>Burn Waifus</Header>
                <Content>
                  Burn one of your existing Waifus and pay 5,490 WET Tokens to
                  receive a new random Waifu.
                </Content>
                <ButtonContainer>
                  <Button.Outline
                    className="waifu-card-buttons"
                    onClick={() => {
                      setSelectingWaifus(true);
                    }}
                  >
                    <span className="waifu-button-learnmore">Burn WAIFU</span>
                  </Button.Outline>
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
    </Layout>
  );
};
export default DungeonPage;
