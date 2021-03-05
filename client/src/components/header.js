import {Link, navigate} from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState} from 'react';
import { Input, Blockie, Card, Flex, Heading, Button, Text, Box, Select, Field, Modal, width } from 'rimble-ui';
import Web3 from 'web3';
import {observer} from 'mobx-react-lite';

import { RootStoreContext } from '../app/stores/root.store';

import HeaderMenu from "../assets/Header_Menu.svg";
// import Logo from '../assets/Logo.svg'
import Logo from '../images/Eth_Logo.png'
import NavLogo from '../assets/NavLogo.svg';
import NavPinkBar from '../images/nav_pink_bar.png'
import "./header.css";


import {getTransactionReceipt} from '../app/utils/contracthelper';



// <Button.Outline className="nav-menu-buttons" >HOME</Button.Outline>
//                 <Button.Outline className="nav-menu-buttons" >OVERVIEW</Button.Outline>
//                 <Button.Outline className="nav-menu-buttons" >GALLERY</Button.Outline>
//                 <Button.Outline className="nav-menu-buttons" >WET TOKEN</Button.Outline>
//                 <Button.Outline className="nav-menu-buttons" as="a" >MY WALLET</Button.Outline>
//                 <Button.Outline className="nav-menu-buttons" >MY HISTORY</Button.Outline>

const Header = observer(({siteTitle, menuLinks}) => {
    
    const rootStore = useContext(RootStoreContext);
    const { walletStore, homeStore, transactionStore} = rootStore;
    

    const [timer, setTimer] = useState();

    const checkWalletAndPendingTransactions = async () => {
        
        if (window.ethereum) {
            let windowWeb3 = new Web3(window.ethereum);
            const accounts = await windowWeb3.eth.getAccounts();
            walletStore.defaultAddress= accounts[0];
            const isLocked = !accounts || 0 === accounts.length;
            if (!walletStore.isWalletConnected && !isLocked) {
                walletStore.isWalletConnected = true;
                walletStore.web3 = new Web3(window.ethereum);
            }


            for (const txDetails of transactionStore.pendingTransactions) {

                const receipt = await getTransactionReceipt(
                    windowWeb3,
                    txDetails.txHash,
                );

                if (receipt) {
                    transactionStore.addCompletedTransaction({
                    txDetails,
                    status: receipt.status,
                    });
                }

            }
        }
        else{

        }

        

    }

    useEffect(() => {

        async function checkPendingTransactions() {
            await checkWalletAndPendingTransactions();
        };

        if (window.ethereum) {
            checkPendingTransactions();
            setTimer(setInterval(checkWalletAndPendingTransactions, 1000));
          }
          return () => {
              clearInterval(timer);
          }
    },[]);

    return(
        <header
            style={{
                marginBottom: `1.45rem`,
                marginTop: `1.45rem`,
            }}
        >
        <Box className="waifu-card-box" maxWidth={1435} >
        <div style={{ marginLeft:4, marginTop:4}}>
            <img src={NavPinkBar} style={{marginBottom:-4}}/>
            <Box className="nav-waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                <Flex className="nav-flex-box">
                <img className="menu-logo" src={Logo}/>
                <div className="nav-bar-button-container">
                    {menuLinks.map(link => (
                        <Button.Outline key={link.name}className="nav-menu-buttons" onClick={()=>{navigate(link.link)}} href={link.link} title={link.name}>
                        {link.name}
                        </Button.Outline>
                        
                    ))}
                </div>
                
                </Flex>
            </Box>
        </div>
     </Box>
        </header>
);})

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: ``,
};

export default Header;
/*
<nav>
                        <ul style={{ display: "flex", flex: 1 }}>
                        {menuLinks.map(link => (
                            <li
                            key={link.name}
                            style={{
                                listStyleType: `none`,
                                padding: `1rem`,
                            }}
                            >
                            <Link style={{ color: `white` }} to={link.link}>
                                {link.name}
                            </Link>
                            </li>
                        ))}
                        </ul>
                    </nav>


*/