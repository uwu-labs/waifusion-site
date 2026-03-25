import React from "react";
import { Box, Flex, Text } from "./ui";
import { GLOBALS } from "../app/utils/globals.js";
import OverviewGreenBar from "../images/overview_green_bar.png";

/** Historical snapshot only — no chain reads. */
const SHOWCASE_SOLD_COUNT = 9062;

const BAR_PATHS = (
  <>
    <path d="M130.999 18.7234H164.999V22.7234H130.999V18.7234Z" />
    <path d="M130.999 8.72339H164.999V12.7234H130.999V8.72339Z" />
    <path d="M186.231 0.000976562L203.231 29.4458L199.767 31.4459L182.767 2.00098L186.231 0.000976562Z" />
    <path d="M197.464 0.000976562L214.464 29.4458L210.999 31.4459L193.999 2.00098L197.464 0.000976562Z" />
    <path d="M88.9994 18.7234H120.999V22.7234H88.9994V18.7234Z" />
    <path d="M88.9994 8.72339H120.999V12.7234H88.9994V8.72339Z" />
    <path d="M44.9994 18.7234H78.9994V22.7234H44.9994V18.7234Z" />
    <path d="M44.9994 8.72339H78.9994V12.7234H44.9994V8.72339Z" />
    <path d="M4.23167 0.0552597L21.2317 29.5001L17.7676 31.5001L0.767578 2.05526L4.23167 0.0552597Z" />
    <path d="M15.4637 0.0552597L32.4637 29.5001L28.9996 31.5001L11.9996 2.05526L15.4637 0.0552597Z" />
  </>
);

function presaleProgressDepth(sold, tiers) {
  let remaining = sold;
  for (let i = 0; i < tiers.length; i++) {
    const cap = tiers[i].nftVal;
    if (remaining >= cap) {
      remaining -= cap;
    } else {
      return i + 1;
    }
  }
  return tiers.length;
}

function PresaleBarSvg({ tierIndex, progressDepth }) {
  const cls = [
    "presale-svg",
    progressDepth === tierIndex ? "colored-pending" : "",
    progressDepth > tierIndex ? "colored-completed" : "",
    progressDepth < tierIndex ? "colored-unavailable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      className={cls}
      width="215"
      height="32"
      viewBox="0 0 215 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {BAR_PATHS}
    </svg>
  );
}

function PresaleTierColumn({ tierIndex, priceLabel, nftVal, progressDepth }) {
  const priceTextCls = [
    "eth-sale-text",
    "presale-tier-label",
    progressDepth === tierIndex ? "colored-pending" : "",
    progressDepth > tierIndex ? "colored-completed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const countCls = "eth-sale-text presale-tier-count colored-unavailable";

  return (
    <Box className="presale-tier-column">
      <span className={priceTextCls}>{priceLabel}</span>
      <div className="presale-bar-wrap">
        <PresaleBarSvg tierIndex={tierIndex} progressDepth={progressDepth} />
      </div>
      <div className="presale-tier-counts">
        <span className={countCls}>{nftVal}</span>
        <span className={countCls}>WAIFUS</span>
      </div>
    </Box>
  );
}

const PresaleShowcase = () => {
  const tiers = GLOBALS.NFT_VAL_ARRAY;
  const progressDepth = presaleProgressDepth(SHOWCASE_SOLD_COUNT, tiers);

  const row1 = tiers.slice(0, 5);
  const row2 = tiers.slice(5, 10);
  const row3 = tiers.slice(10, 11);

  return (
    <Box className="waifu-card-container home-landing-presale-window">
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
                <span className="home-landing-window-title">PRESALE</span>
                <br />
                <Text
                  className="waifu-card-text waifu-about-text"
                  style={{
                    maxWidth: 720,
                    margin: "12px auto 0",
                    textAlign: "center",
                  }}
                >
                  The original pricing curve with {" "}
                  {SHOWCASE_SOLD_COUNT.toLocaleString()} Waifus considered sold —
                  a display-only snapshot of the original website. Waifus were sold 
                  on this curve on March 3rd 2021, raising 3,300+ ETH for the original 
                  team only for them to neglect the project 2 weeks later.  
                </Text>
                <Flex className="presale-progress presale-progress-row">
                  {row1.map((t, i) => (
                    <PresaleTierColumn
                      key={t.usd + "-" + i}
                      tierIndex={i + 1}
                      priceLabel={`${t.usd} ${GLOBALS.CURRENCY}`}
                      nftVal={t.nftVal}
                      progressDepth={progressDepth}
                    />
                  ))}
                </Flex>
                <Flex className="presale-progress presale-progress-row">
                  {row2.map((t, i) => (
                    <PresaleTierColumn
                      key={t.usd + "-" + (i + 5)}
                      tierIndex={i + 6}
                      priceLabel={`${t.usd} ${GLOBALS.CURRENCY}`}
                      nftVal={t.nftVal}
                      progressDepth={progressDepth}
                    />
                  ))}
                </Flex>
                {row3[0] && (
                  <Box className="presale-final-tier">
                    <span className="eth-sale-text presale-tier-label">
                      {row3[0].usd} {GLOBALS.CURRENCY}
                    </span>
                    <div className="presale-bar-wrap">
                      <PresaleBarSvg
                        tierIndex={11}
                        progressDepth={progressDepth}
                      />
                    </div>
                    <div className="presale-tier-counts">
                      <span className="eth-sale-text presale-tier-count colored-unavailable">
                        {row3[0].nftVal}
                      </span>
                      <span className="eth-sale-text presale-tier-count colored-unavailable">
                        WAIFUS
                      </span>
                    </div>
                  </Box>
                )}
              </center>
            </Box>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default PresaleShowcase;
