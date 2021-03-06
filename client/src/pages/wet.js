import React from 'react';
import { Link } from 'gatsby';
import { Input, Blockie, Card, Flex, Heading, Button, Text, Box, Select, Field, Modal, width } from 'rimble-ui';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { GLOBALS } from '../app/utils/globals.js';
import '../components/home.css';


import OverviewGreenBar from '../images/overview_green_bar.png';
import WetPinkBar from '../images/wet_pink_bar.png';

const WETTokenPage = () => (
  <Layout>
    <SEO title="WET Token" />
    <Box className="waifu-card-box overview-card-box" >
    <div className="box-upper">
        <img src={OverviewGreenBar} className="waifu-card-box-greenbar"/>
        <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
            <center className="waifu-card-box-center">
              <div class="waifu-card-header-text">What is it?</div>
                <div className="waifu-card-text waifu-about-text" >
                The Waifu Enhancement Token (WET) is an exclusive token to the Waifusion world wide harem. 
                WET serves two purposes: <br/><br/>
                  <ul class="waifu-wet-rules">
                    <li>
                  Give Waifus a unique name that is permanently stored and publicly visible on the Ethereum Blockchain. 
                  </li>
                  <li>
                    Burning an undesirable Waifu in exchange for a new Waifu from the Dungeon
                    </li>
                  </ul>
                </div>
                <div className="waifu-card-text waifu-about-text" >
                If you own a Waifu, you can claim the WETs that are constantly being produced by them being in your harem.
                 Each Waifu will drip around 3,660 WETs per year. 
                 <br/>
                 To change the name of any Waifu, you need to send 1,830 WETs (about ½ years of Waifu emission) to the Waifusion contract and boil them.
                 <br/>
                 To burn a Waifu you need to send a Waifu and 5,490 WETs to the Waifusion contract and boil them.
                  </div>
                  <br/>
                 <div class="waifu-card-header-text">The Rules</div>
                 <br/>
                 <ul class="waifu-wet-rules">
                  <li>No name can be identical, duh, you baka, all Waifus are unique </li>
                  <li>There is a limit of 25 characters; this includes spaces</li>
                  <li>The names are not case sensitive</li>
                  <li>There are no leading or trailing «spaces»</li>
                  <li>Only alphanumeric symbols can be used to name you Waifu</li>
                  <li>Used names become available immediately after the name of your Waif is changed</li>
                 </ul>
                 <br/>
                 <div className="waifu-card-text waifu-about-text" >
                 Each year, approximately 3,660 WETs will drip off each Waifu. After 10 years, the emission of new WETs comes to a halt. From then on, WETs can only be boiled until no Waifus are WET anymore (Ben Shapiro is a prophet) and the names of the Waifus cannot be altered. The harem is then considered complete.
                 <br/><br/> Number of WETs emitted per year per Waifu: around 3,660
                  <br/>Number of WETs required for one name change: 1,830
                  <br/>Number of WETs required to burn and re-roll Waifu: 5,490
                  </div>
                  <br/>
                  <br/>
            </center>
            </Box>
            </div>
        </Box>
        {/*Contract window */}
        <Box className="waifu-card-box smart-contract-box" >
          <div className="box-upper">
              <img src={WetPinkBar} className="waifu-card-box-greenbar"/>
              <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                  <center className="waifu-card-box-center">
                    <div class="waifu-card-header-text waifu-smartcontract-header">Verified Smart Contracts</div>

                    <div class="waifu-about-header-text  waifu-header-smart">Waifu Contract</div>
                    <div className="waifu-card-text waifu-about-text waifu-about-smart" >{GLOBALS.WAIFU_CONTRACT_ADDRESS}</div>
                    <div class="waifu-about-header-text ">WET Contract</div>
                    <div className="waifu-card-text waifu-about-text waifu-about-smart" >{GLOBALS.WET_CONTRACT_ADDRESS}</div>
                  </center>
              </Box>
            </div>
        </Box>
  </Layout>
);

export default WETTokenPage;
