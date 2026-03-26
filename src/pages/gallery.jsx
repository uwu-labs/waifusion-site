// Frameworks
import React, { useContext, useEffect, useRef, useState } from "react";
import { Input, Flex, Button, Box, Text, Loader } from "../components/ui";
import { observer } from "mobx-react-lite";

// Data Store
import { RootStoreContext } from "../app/stores/root.store";
import { GLOBALS } from "../app/utils/globals.js";
import { getWaifuTraitsById } from "../app/utils/dbhelper";

import WaifuPinkBar from "../images/waifucard_pink_bar.png";
import FocusText from "../images/focus_waifu_card_text.png";
import BlurredText from "../images/blurred_text_crop.png";
import OverviewGreenBar from "../images/overview_green_bar.png";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../components/home.css";

// Main Route
const Gallery = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { galleryStore } = rootStore;

  const [metadata, setMetadata] = useState(null);
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const imageErrorStepRef = useRef(0);

  const gallerySrc =
    GLOBALS.GALLERY_VIEWABLE_URL === ""
      ? GLOBALS.DEFAULT_WAIFU_IMAGE
      : `${GLOBALS.GALLERY_VIEWABLE_URL}/${galleryStore.currentImageId}.png`;

  useEffect(() => {
    setImageReady(false);
    setImageFailed(false);
    imageErrorStepRef.current = 0;
  }, [galleryStore.currentImageId]);

  useEffect(() => {
    let cancelled = false;
    setMetadata(null);
    (async () => {
      const data = await getWaifuTraitsById(galleryStore.currentImageId);
      if (!cancelled) setMetadata(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [galleryStore.currentImageId]);

  const listTrait = (trait, index) => {
    if (!trait?.value) return null;
    const category =
      typeof trait.trait_type === "string" && trait.trait_type.trim() !== ""
        ? trait.trait_type
        : "Trait";
    return (
      <Box key={`${category}-${index}`} className="gallery-trait-row">
        <span className="gallery-trait-type-col">{category}</span>
        <Button.Outline
          className="trait-buttons gallery-trait-value"
          title={`${category}: ${trait.value}`}
          disabled={true}
        >
          {trait.value}
        </Button.Outline>
      </Box>
    );
  };

  const attrs = metadata?.attributes || [];

  const nextWaifu = () => {
    galleryStore.goNext();
  };

  const prevWaifu = () => {
    galleryStore.goPrev();
  };

  return (
    <Layout>
      {/*Need to add key to box when do full gallery */}
      <SEO title="Gallery" />
      <Box className="waifu-card-container">
        <Flex
          className="gallery-waifu-traits-row"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Box className="waifu-card-box waifu-pic-box waifu-pic-box-container waifu-card wallet-waifu-card gallery-pink-stack">
            <div className="box-upper">
              <img loading="lazy" decoding="async"
                src={WaifuPinkBar}
                alt="pink nav bar"
                className="waifu-card-box-pinkbar"
              />
              <Box
                className="waifu-card-box-pink-sub waifu-pic-box waifu-card-sub-black"
                color="white"
                style={{ maxWidth: 1424, marginBottom: 1 }}
              >
                <center className="waifu-pic-box-center waifu-card-pink-center gallery-image-column">
                  <div
                    className="gallery-portrait-stage"
                    aria-label="Waifu preview"
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      className="gallery-deco-blur"
                      alt=""
                      src={BlurredText}
                      aria-hidden={true}
                    />
                    <img
                      loading="lazy"
                      decoding="async"
                      className="gallery-deco-focus"
                      alt=""
                      src={FocusText}
                      aria-hidden={true}
                    />
                    <div className="gallery-portrait-stack">
                      {!imageReady ? (
                        <div
                          className="gallery-image-loading-overlay"
                          aria-busy="true"
                          aria-label="Loading waifu image"
                        >
                          <Loader size={44} color="#fc74c6" />
                        </div>
                      ) : null}
                      <img
                        key={galleryStore.currentImageId}
                        width={375}
                        height={500}
                        loading="eager"
                        decoding="async"
                        className="waifu-card-image gallery-waifu-main-image"
                        alt=""
                        src={imageFailed ? GLOBALS.DEFAULT_WAIFU_IMAGE : gallerySrc}
                        onLoad={() => setImageReady(true)}
                        onError={() => {
                          if (imageErrorStepRef.current === 0) {
                            imageErrorStepRef.current = 1;
                            setImageFailed(true);
                          } else {
                            setImageReady(true);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="gallery-footer">
                    <span className="card-box-center-pink-text test-margin gallery-footer-id">
                      <Input
                        className="waifu-input"
                        type="number"
                        placeholder={galleryStore.currentImageId}
                        min="1"
                        max={GLOBALS.TOTAL_WAIFUS}
                        value={galleryStore.goToImageId}
                        onChange={(event) => {
                          galleryStore.setGoToInput(event.target.value);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            galleryStore.applyGoToId(galleryStore.goToImageId);
                          }
                        }}
                      ></Input>
                    </span>
                    <Flex className="gallery-button-container">
                      <Button.Outline
                        className="waifu-card-buttons"
                        onClick={prevWaifu}
                      >
                        <span className="waifu-button-learnmore"> Previous</span>
                      </Button.Outline>
                      <Button.Outline
                        className="waifu-card-buttons"
                        onClick={nextWaifu}
                      >
                        <span className="waifu-button-learnmore"> Next</span>
                      </Button.Outline>
                    </Flex>
                  </div>
                </center>
              </Box>
            </div>
          </Box>

          <Box className="waifu-card-box waifu-card waifu-detail-box-sub gallery-traits-panel waifu-detail-box-sub-container">
            <div className="box-upper waifu-detail-box-sub">
              <img loading="lazy" decoding="async"
                src={OverviewGreenBar}
                className="waifu-card-box-greenbar"
                alt="green nav bar"
              />
              <Box className="waifu-card-box-sub waifu-detail-box-sub waifu-detail-box-sub gallery-traits-panel-inner">
                <div className="gallery-traits-panel-body">
                  {metadata !== null ? (
                    <div className="gallery-metadata-name">
                      {typeof metadata.name === "string" &&
                      metadata.name.trim() !== ""
                        ? metadata.name
                        : `Waifusion #${galleryStore.currentImageId}`}
                    </div>
                  ) : null}
                  <Box className="gallery-traits-list">
                    {metadata === null ? (
                      <Box className="gallery-traits-loading">
                        <Loader size={36} color="#fc74c6">
                          <span className="gallery-traits-loading-label">
                            Loading traits…
                          </span>
                        </Loader>
                      </Box>
                    ) : attrs.length > 0 ? (
                      attrs.map((trait, i) => listTrait(trait, i))
                    ) : (
                      <Text className="gallery-metadata-empty">
                        No traits loaded
                      </Text>
                    )}
                  </Box>
                </div>
              </Box>
            </div>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
});

export default Gallery;
