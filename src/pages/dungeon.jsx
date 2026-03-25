import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Loader } from "../components/ui";

import Layout from "../components/layout";
import "../components/home.css";
import SEO from "../components/seo";
import OverviewGreenBar from "../images/overview_green_bar.png";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";
import styled from "styled-components";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import WaifuSelector from "../components/waifuSelector";
import BuyWaifus from "../components/buyWaifus";
import { GLOBALS } from "../app/utils/globals";

import PendingButton from "../app/templates/pendingbutton";
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
  flex-direction: column;
  align-items: center;
  gap: 28px;
  margin-top: 28px;
  padding: 32px 12px 0;
  max-width: 1435px;
  box-sizing: border-box;

  & > * {
    width: 100%;
    max-width: min(560px, 100%);
    box-sizing: border-box;
  }

  @media (min-width: 900px) {
    flex-direction: row;
    align-items: stretch;
    justify-content: space-evenly;
    gap: 24px;
    padding-left: 0;
    padding-right: 0;

    & > * {
      width: auto;
      flex: 0 1 48%;
      max-width: 560px;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DungeonPage = () => {
  const [selectingWaifus, setSelectingWaifus] = useState(false);
  const [buyingWaifus, setBuyingWaifus] = useState(false);
  const [peekImageLoaded, setPeekImageLoaded] = useState(false);
  const [wetApproved, setWetApproved] = useState(true);
  const [wetApprovalLoading, setWetApprovalLoading] = useState(false);
  const [nftApproved, setNftApproved] = useState(true);
  const [nftApprovalLoading, setNftApprovalLoading] = useState(false);
  const peekImgRef = useRef(null);
  /** Avoid onError loops: after redirect, `img.src` is CDN URL, never equals `DEFAULT_WAIFU_IMAGE` string. */
  const peekFallbackTriedRef = useRef(false);

  /** Same `{id}.png` convention as the gallery (1…TOTAL_WAIFUS), not token→revealed mapping. */
  const peekSrc = useMemo(() => {
    const id = 1 + Math.floor(Math.random() * GLOBALS.TOTAL_WAIFUS);
    return `${GLOBALS.GALLERY_VIEWABLE_URL}/${id}.png`;
  }, []);

  useLayoutEffect(() => {
    peekFallbackTriedRef.current = false;
    const img = peekImgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setPeekImageLoaded(true);
    }
  }, [peekSrc]);

  /**
   * Some browsers / cache paths never fire `onLoad` reliably; the PNG still loads (network 200).
   * Poll + `decode()` so we always drop the overlay once pixels are available.
   */
  useEffect(() => {
    const img = peekImgRef.current;
    if (!img) return undefined;

    let cancelled = false;
    const revealIfDecoded = () => {
      if (cancelled) return;
      if (img.naturalWidth > 0 && img.complete) {
        setPeekImageLoaded(true);
      }
    };

    revealIfDecoded();
    if (typeof img.decode === "function") {
      img.decode().then(revealIfDecoded).catch(() => {});
    }

    const interval = window.setInterval(revealIfDecoded, 80);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      revealIfDecoded();
      if (!cancelled && img.naturalWidth === 0) {
        setPeekImageLoaded(true);
      }
    }, 15000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [peekSrc]);

  const approveAccount = async () => {
    setWetApprovalLoading(true);
    setTimeout(() => {
      setWetApprovalLoading(false);
      setWetApproved(true);
    }, 400);
  };

  const approveNfts = async () => {
    setNftApprovalLoading(true);
    setTimeout(() => {
      setNftApprovalLoading(false);
      setNftApproved(true);
    }, 400);
  };

  return (
    <Layout>
      <SEO title="Dungeon" />
      <PageContainer>
        <Box className="waifu-card-box overview-card-box dungeon-intro-card">
          <div className="box-upper">
            <img loading="lazy" decoding="async"
              src={OverviewGreenBar}
              alt="green nav bar"
              className="waifu-card-box-greenbar"
            />
            <Box
              className="waifu-card-box-sub"
              color="white"
              style={{ maxWidth: 1424, marginBottom: 1 }}
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
                  A peek in the dungeon (0 waifus remaining):
                  <br />
                  <br />
                  <div className="waifu-dungeon-peek-container">
                    <div className="waifu-dungeon-waifu-row">
                      <div className="waifu-dungeon-image-frame">
                        <div className="waifu-dungeon-image-clip">
                          {!peekImageLoaded && (
                            <div
                              className="dungeon-waifu-img-placeholder"
                              aria-busy="true"
                              aria-label="Loading dungeon preview"
                            >
                              <Loader color="#FBE55F" size={44} />
                            </div>
                          )}
                          <img
                            ref={peekImgRef}
                            className="dungeon-waifu-card-image"
                            alt=""
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                            src={peekSrc}
                            onLoad={() => setPeekImageLoaded(true)}
                            onError={() => {
                              const el = peekImgRef.current;
                              if (!el) {
                                setPeekImageLoaded(true);
                                return;
                              }
                              if (!peekFallbackTriedRef.current) {
                                peekFallbackTriedRef.current = true;
                                setPeekImageLoaded(false);
                                el.src = GLOBALS.DEFAULT_WAIFU_IMAGE;
                                return;
                              }
                              setPeekImageLoaded(true);
                            }}
                          />
                          <div className="waifu-dungeon-chain-layer" aria-hidden>
                            <span className="waifu-dungeon-chain-strip waifu-dungeon-chain-strip--v1" />
                            <span className="waifu-dungeon-chain-strip waifu-dungeon-chain-strip--v2" />
                            <span className="waifu-dungeon-chain-strip waifu-dungeon-chain-strip--h" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </center>
            </Box>
          </div>
        </Box>

        <PurchaseOptionsContainer>
          <Box className="waifu-card-box">
            <BoxUpper>
              <img loading="lazy" decoding="async"
                src={WaifuPinkBar}
                alt="pink nav bar"
                className="waifu-card-box-pinkbar"
              />
              <BoxContent>
                <Header>Buy Waifus</Header>
                <Content>
                  Buy a new Waifu from the Dungeon for {GLOBALS.BUY_PRICE}{" "}
                  {GLOBALS.CURRENCY}. You will receive a random Waifu from the
                  dungeon.
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
              <img loading="lazy" decoding="async"
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
        demoFlow
      />
      <BuyWaifus
        show={buyingWaifus}
        close={() => setBuyingWaifus(false)}
        demoFlow
      />
      <Loading show={false} complete={true} />
    </Layout>
  );
};
export default DungeonPage;
