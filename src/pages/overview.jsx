import React from "react";
import { Box } from "../components/ui";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { GLOBALS } from "../app/utils/globals.js";
import "../components/home.css";

import OverviewGreenBar from "../images/overview_green_bar.png";
import WetPinkBar from "../images/wet_pink_bar.png";

const OverviewPage = () => (
  <Layout>
    <SEO title="Overview" />

    <Box className="waifu-card-box overview-card-box">
      <div className="box-upper">
        <img
          loading="lazy"
          decoding="async"
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
            <div className="waifu-card-header-text">What is this website?</div>
            <div className="waifu-card-text waifu-about-text">
              This is an{" "}
              <strong>archived copy</strong> of the original Waifusion website from March 2021, kept
              online for <strong>historical reference</strong> only. It preserves
              how the project was presented at the time this snapshot was made.
              <br />
              <br />
              It does <strong>not</strong> reflect the views, priorities, or
              direction of the Waifusion project under its{" "}
              <strong>current stewardship at Kusari</strong>. For up-to-date
              information and official communications, visit{" "}
              <a
                href="https://kusari.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                kusari.org
              </a>{" "}
              and follow current project channels—not this archive.
            </div>
            <br />
            <br />

            <div className="waifu-card-header-text">
              How will I be able to tell the rarity of my Waifu?
            </div>
            <div className="waifu-card-text waifu-about-text">
              In order to give Waifus an explicit rarity before they get WET
              they have a variety of traits with different percentage occurrence
              rates, for example: aliens are much rarer than humans. All of the
              traits listed on this site will have their rarity statistics
              released at the end of the sale but maybe these Waifus have more
              secrets for you to find, Anon-kun. ;-)
            </div>
            <br />

            <div className="waifu-card-header-text">How do I get WET?</div>
            <div className="waifu-card-text waifu-about-text">
              Get your Waifus Wet. Waifu Enhancement Token or WET is a token
              that allows you to change the name of your Waifus leaving your
              mark on them FOREVER or until you sell it and someone changes
              their name again. Every name is unique and can only be used once.
              In this way, you may change the rarity of your Waifus forever, so
              choose wisely. You can obtain WET 3 ways. First, when you buy a
              Waifu directly from us, you will get enough WET to change the
              Waifu’s name once for each NFT purchased. The second way is for
              every Waifu you possess, you will accumulate 10 WET per day. The
              final way is you may receive WET from someone else&apos;s wallet who
              has collected it from their own Waifus.
            </div>
          </center>
        </Box>
      </div>
    </Box>

    <Box className="waifu-card-box overview-card-box">
      <div className="box-upper">
        <img
          loading="lazy"
          decoding="async"
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
            <div className="waifu-card-header-text">What is WET token?</div>
            <div className="waifu-card-text waifu-about-text">
              The Waifu Enhancement Token (WET) is an exclusive token to the
              Waifusion world wide harem. WET serves two purposes: <br />
              <br />
              <ul className="waifu-wet-rules">
                <li>
                  Give Waifus a unique name that is permanently stored and
                  publicly visible on the Ethereum Blockchain.
                </li>
                <li>
                  Burning an undesirable Waifu in exchange for a new Waifu from
                  the Dungeon
                </li>
              </ul>
            </div>
            <div className="waifu-card-text waifu-about-text">
              If you own a Waifu, you can claim the WETs that are constantly
              being produced by them being in your harem. Each Waifu will drip
              around 3,660 WETs per year.
              <br />
              To change the name of any Waifu, you need to send 1,830 WETs
              (about ½ years of Waifu emission) to the Waifusion contract with
              the new name.
              <br />
              To burn a Waifu you need to send a Waifu and 5,490 WETs to the
              Waifusion contract they will disappear forever...
            </div>
            <br />
            <div className="waifu-card-header-text">The Rules</div>
            <br />
            <ul className="waifu-wet-rules">
              <li>
                No name can be identical, duh, you baka, all Waifus are unique{" "}
              </li>
              <li>There is a limit of 25 characters; this includes spaces</li>
              <li>The names are not case sensitive</li>
              <li>There are no leading or trailing «spaces»</li>
              <li>Only alphanumeric symbols can be used to name you Waifu</li>
              <li>
                Used names become available immediately after the name of your
                Waif is changed
              </li>
            </ul>
            <br />
            <div className="waifu-card-text waifu-about-text">
              Each year, approximately 3,660 WETs will drip off each Waifu. After
              10 years, the emission of new WETs comes to a halt. From then on,
              WETs can only be boiled until no Waifus are WET anymore (Ben
              Shapiro is a prophet) and the names of the Waifus cannot be
              altered. The harem is then considered complete.
              <br />
              <br /> Number of WETs emitted per year per Waifu: around 3,660
              <br />
              Number of WETs required for one name change: 1,830
              <br />
              Number of WETs required to burn and re-roll Waifu: 5,490
            </div>
            <br />
            <br />
          </center>
        </Box>
      </div>
    </Box>

    <Box className="waifu-card-box smart-contract-box">
      <div className="box-upper">
        <img
          loading="lazy"
          decoding="async"
          src={WetPinkBar}
          alt="pink nav bar"
          className="waifu-card-box-greenbar"
        />
        <Box
          className="waifu-card-box-sub"
          color="white"
          style={{ maxWidth: 1424, marginBottom: 1 }}
        >
          <center className="waifu-card-box-center">
            <div className="waifu-card-header-text waifu-smartcontract-header">
              Verified Smart Contracts
            </div>

            <div className="waifu-about-header-text waifu-header-smart">
              Waifu Contract
            </div>
            <div className="waifu-card-text waifu-about-text waifu-about-smart">
              {GLOBALS.WAIFU_CONTRACT_ADDRESS}
            </div>
            <div className="waifu-about-header-text">WET Contract</div>
            <div className="waifu-card-text waifu-about-text waifu-about-smart">
              {GLOBALS.WET_CONTRACT_ADDRESS}
            </div>
            <div className="waifu-about-header-text">Dungeon Contract</div>
            <div className="waifu-card-text waifu-about-text waifu-about-smart">
              {GLOBALS.DUNGEON_CONTRACT_ADDRESS}
            </div>
          </center>
        </Box>
      </div>
    </Box>

    <div style={{ minHeight: "200px" }}></div>
  </Layout>
);

export default OverviewPage;
