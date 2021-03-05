// Frameworks
import React, { useContext, useEffect, useState } from 'react';
import { Input, Blockie, Card, Flex, Heading, Button, Text, Box, Select, Field, Modal, width } from 'rimble-ui';
import { Link, navigate } from 'gatsby';
import * as _ from 'lodash';


// Data Store
import { RootStoreContext } from './stores/root.store';

import OverviewGreenBar from '../images/overview_green_bar.png';

// Login Route
function Login() {

    const rootStore = useContext(RootStoreContext);
    const { walletStore } = rootStore;
    const [winWthEnabled, setwinWthEnabled] = useState(false);
    const [timer, setTimer] = useState();

    useEffect(() => {
        async function checkWalletStatus() {
            await checkWallet();
        };
        
       
        checkWalletStatus();
        // setTimer(setInterval(checkWalletStatus, 10000));
        if (window.ethereum) {
            setwinWthEnabled(true);
        }

        return () => {
            clearInterval(timer);
        }

    }, [])

    const checkWallet = async () => {
        if (walletStore.isWalletConnected) {
            console.log("checkWallet redirect");
            navigate(`/`);
        }
    }

    const _walletConnect = () => async () => {
        try {
            window.ethereum.enable();
        }
        catch (err) {
            console.error(err);
        }


        // try {
        //     await wallet.init(walletType);
        //     await wallet.connect();
        //     walletStore.walletInstance = wallet;
        // }
        // catch (err) {
        //     console.error(err);
        // }
    };

    
//If window.ethereum is true, then show buttons. If not, show bad bad
    return (
        <>
                    {/*<Box mb={4}>
                <Flex >
                    <Box  mb={2} paddingLeft={'2'}>
                        <Button size="small" onClick={_walletConnect()} >Connect Wallet</Button>
                    </Box>
                </Flex>
            </Box>*/}
            {winWthEnabled &&
                <Box className="waifu-card-box" >
                    <div className="box-upper">
                        <img src={OverviewGreenBar} className="waifu-card-box-greenbar"/>
                        <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                            <center className="waifu-card-box-center">
                                <span className="wallet-box-header">Connect your Wallet</span>
                                <br/>
                                <Box className="wallet-connect">
                                    <Button.Outline className="waifu-card-buttons " onClick={_walletConnect()} ><span className="waifu-button-learnmore">Connect</span></Button.Outline>
                                </Box>
                            </center>
                        </Box>
                    </div>
                </Box>
            }
            {!winWthEnabled &&
                
                <Box className="waifu-card-box" >
                    <div className="box-upper">
                        <img src={OverviewGreenBar} className="waifu-card-box-greenbar"/>
                        <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                            <center className="waifu-card-box-center">
                                <span className="wallet-box-header">No Ethereum Wallet Detected</span>
                                <br/>
                                <Box className="wallet-connect">
                                    <a href="https://metamask.io/" target="_blank">
                                        <Button.Outline className="waifu-card-buttons "><span className="waifu-button-learnmore">Get Metamask</span></Button.Outline>
                                    </a>
                                </Box>
                            </center>
                        </Box>
                    </div>
                </Box>
            }
        </>
    )
}

export default Login;
