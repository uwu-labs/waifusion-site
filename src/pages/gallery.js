// Frameworks
import React, { useContext } from "react";
import { Input, Flex, Button, Box } from "rimble-ui";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";

// Data Store
import { RootStoreContext } from "../app/stores/root.store";
import { GLOBALS } from "../app/utils/globals.js";

import WaifuPinkBar from "../images/waifucard_pink_bar.png";
import WaifuDottedLine from "../images/waifu_dotted_line.png";
import FocusText from "../images/focus_waifu_card_text.png";
import BlurredText from "../images/blurred_text_crop.png";
import Layout from "../components/layout";

// Main Route
const Gallery = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { galleryStore } = rootStore;

  const revealedWaifuIndex = (waifuIndex) => {
    return (Number(waifuIndex) + GLOBALS.STARTING_INDEX) % 16384;
  };

  const nextWaifu = () => {
    galleryStore.incrementViewIndex();
  };

  const prevWaifu = () => {
    galleryStore.decrementViewIndex();
  };

  return (
    <Layout>
      {/*Need to add key to box when do full gallery */}
      <Helmet>
        <title>Gallery</title>
      </Helmet>
      <Box className="waifu-card-box waifu-pic-box waifu-pic-box-container waifu-card wallet-waifu-card">
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
              <span className="card-box-center-pink-text test-margin"></span>
              <img
                className="waifu-dotted-line"
                alt="dotted line"
                src={WaifuDottedLine}
              />
              <img
                className="waifu-focus-text"
                alt="focus text"
                src={FocusText}
              />
              <img
                className="waifu-card-image"
                alt=""
                src={
                  GLOBALS.GALLERY_VIEWABLE_URL === ""
                    ? GLOBALS.DEFAULT_WAIFU_IMAGE
                    : GLOBALS.GALLERY_VIEWABLE_URL +
                      "/" +
                      revealedWaifuIndex(galleryStore.currentViewIndex) +
                      ".png"
                }
              />
              <br />
              <img
                className="waifu-blurred-text"
                alt="blurred text"
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
                <Input
                  className="waifu-input"
                  type="number"
                  placeholder={galleryStore.currentViewIndex}
                  min="0"
                  max={GLOBALS.TOTAL_WAIFUS}
                  value={galleryStore.goToIndex}
                  onChange={(event) => {
                    galleryStore.updateGoToIndex(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    console.log("Event: " + event.target.value);
                    if (event.key === "Enter") {
                      galleryStore.updateCurrentViewIndex(
                        galleryStore.goToIndex
                      );
                    }
                  }}
                ></Input>
              </span>
              <Box>
                <Flex className="gallery-button-container">
                  <Box className="wallet-buttons">
                    <Button.Outline
                      className="waifu-card-buttons"
                      onClick={prevWaifu}
                    >
                      <span className="waifu-button-learnmore"> Previous</span>{" "}
                    </Button.Outline>
                  </Box>
                  <Box className="wallet-buttons">
                    <Button.Outline
                      className="waifu-card-buttons"
                      onClick={nextWaifu}
                    >
                      <span className="waifu-button-learnmore"> Next</span>{" "}
                    </Button.Outline>
                  </Box>
                </Flex>
              </Box>
            </center>
          </Box>
        </div>
      </Box>
    </Layout>
  );
});

export default Gallery;
