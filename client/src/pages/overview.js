import React from 'react';
import { Link } from 'gatsby';
import { Input, Blockie, Card, Flex, Heading, Button, Text, Box, Select, Field, Modal, width } from 'rimble-ui';

import Layout from '../components/layout';
import SEO from '../components/seo';
import '../components/home.css';


import OverviewGreenBar from '../images/overview_green_bar.png';


const OverviewPage = () => (
  <Layout>
    <SEO title="Overview" />

    <Box className="waifu-card-box overview-card-box" >
        <div className="box-upper">
            <img src={OverviewGreenBar} className="waifu-card-box-greenbar"/>
            <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                <center className="waifu-card-box-center">
                  <div className="waifu-card-header-text">How will I be able to tell the rarity of my Waifu?</div>
                    <div className="waifu-card-text waifu-about-text" >
                    In order to give Waifus an explicit rarity before they get WET they have a variety of traits with different percentage occurrence rates, 
                    for example: aliens are much rarer than humans. All of the traits listed on this site will have their rarity statistics released at the 
                    end of the sale but maybe these Waifus have more secrets for you to find, Anon-kun. ;-)
                      </div>
                     <br/>
                      
                      <div className="waifu-card-header-text">Get WET</div>
                      <div className="waifu-card-text waifu-about-text" >
                      Get your Waifus Wet. Waifu Enhancement Token or WET is a token that allows you to change the name of your Waifus leaving your mark on 
                      them FOREVER or until you sell it and someone changes their name again. Every name is unique and can only be used once. In this way, 
                      you may change the rarity of your Waifus forever, so choose wisely. You can obtain WET 3 ways. First, when you buy a Waifu directly 
                      from us, you will get enough WET to change the Waifu’s name once for each NFT purchased. The second way is for every Waifu you possess, 
                      you will accumulate 10 WET per day. The final way is you may receive WET from someone else's wallet who has collected it from their own Waifus.
                      </div>
                </center>
            </Box>
        </div>
    </Box>
    <div style={{minHeight:'200px'}}></div>
  </Layout>
);

export default OverviewPage;
