// Frameworks
import React, { useContext, useEffect } from 'react';
import { navigate, Link } from 'gatsby';
import { Heading, Blockie, Flex, QR, Button, Text, Box, Loader } from 'rimble-ui';
import {observer} from 'mobx-react-lite';
import BN from 'bn.js';

// Wallet Interface
import {
  getAllowance,
  tokenOfOwnerByIndex,
  balanceOf,
  accumulatedForIndex,
  toEthUnit,
  getWETName,
  getWETContract,
  wetBalanceOf,
  getWaifuContract,
  
} from './utils/contracthelper';
import { GLOBALS } from './utils/globals.js';

// Data Store
import { RootStoreContext } from './stores/root.store';

// Components
import PendingButton from './templates/PendingButton';

import OverviewGreenBar from '../images/overview_green_bar.png';
import WetPinkBar from '../images/wet_pink_bar.png';
import WaifuPinkBar from '../images/waifucard_pink_bar.png';
import WaifuDottedLine from '../images/waifu_dotted_line.png';
import WaifuImage from '../images/waifu.png';
import FocusText from '../images/focus_waifu_card_text.png';
import BlurredText from '../images/blurred_text_crop.png';



// Main Route
const Main = observer((props) => {
    const rootStore = useContext(RootStoreContext);
    const { walletStore, WETStore, transactionStore } = rootStore;

    useEffect(() => {
        async function updateWETS() {
            WETStore.setIsLoading(true);
            await updateWETState();
            WETStore.setIsLoading(false);
        };
        if (!walletStore.isWalletConnected) {
            navigate(`/app/login`);
          }
       updateWETS();
    }, [])

    const revealedWaifuIndex = (waifuIndex) =>{ 
        return (Number(waifuIndex) + GLOBALS.STARTING_INDEX) % 16384;
      }

    const approveAccount = async () => {
        const currentAllowance = await getAllowance();
        if(currentAllowance > 0)
        {
            return;
        }
        else{
            const wetContract = await getWETContract();
            wetContract.methods
                .approve(GLOBALS.WAIFU_CONTRACT_ADDRESS, new BN(GLOBALS.APPROVE_AMOUNT))
                .send()
                .on('transactionHash', hash => {
                    transactionStore.addPendingTransaction ({
                        txHash: hash,
                        description: 'Approval',
                    });
                })
                .on('receipt', receipt => {
                    console.log(receipt);
                    walletStore.isPendingApproval = false;
                    walletStore.isApproved = true;
                })
                .on('error', err => {
                    console.log(err);
                    walletStore.isPendingApproval = false;
                }); // If a out of gas error, the second parameter is the receipt.
        }
    }


    const claim = async (e) => {
        
        walletStore.isClaiming = true;
        const windowWeb3 = await getWETContract();

        windowWeb3.methods
        .claim(WETStore.ownedItems.map(a => a.index))
        .send()
        .on('transactionHash', hash => {
          transactionStore.addPendingTransaction ({
            txHash: hash,
            description: 'Claim All WETs',
          });
        })
        .on('receipt', receipt => {
          console.log(receipt);
          WETStore.isClaiming = false;
          updateWETState();
        })
        .on('error', err => {
          console.log(err);
          WETStore.isClaiming = false;
        }); // If a out of gas error, the second parameter is the receipt.
    }

    const updateWETState = async () => {
       
        WETStore.wetBalance = Number(await toEthUnit(await wetBalanceOf())).toFixed(2, );
        
        const balance = await balanceOf();
        let totalAccumulated = new BN(0);

        WETStore.totalAccumulatedLoading = true;
        
        for (let i = 0; i < balance; i++) {
            const index = await tokenOfOwnerByIndex(i);
            const name = await getWETName(index);
            const accumulated = new BN(await accumulatedForIndex(index));
            totalAccumulated = totalAccumulated.add(accumulated);
            
            if (WETStore.items.length < balance) {
                WETStore.addOwnedItem({ index, name });
            }
        }

        WETStore.totalAccumulated = Number(await toEthUnit(totalAccumulated)).toFixed( 2, );
        WETStore.totalAccumulatedLoading = false;
       // WETStore.setIsLoading(false);
    }
    return (
        <>
        
        <Box className="waifu-card-box wallet-box" >
          <div className="box-upper">
              <img src={WetPinkBar} className="waifu-card-box-greenbar"/>
              <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                  <center className="waifu-card-box-center wallet-smart-box-center">
                    <span className="wallet-box-header">Your Wallet</span>
                    <br/>
                    <Flex className="wallet-qr-container">
                        <Box>
                        <div >
                            <QR value={walletStore.defaultAddress} size={308} />
                        </div>
                        </Box>
                        <Box col-sm-4>
                            <div style={{marginTop:'55px'}}>
                                <Text className="wallet-text">Current WET: {WETStore.wetBalance}</Text>
                                <Text className="wallet-text">Accumulated WET: {WETStore.totalAccumulated}</Text>
                                <Flex className="wallet-button-container">
                                    <Box className="wallet-buttons">
                                        <Button.Outline className="waifu-card-buttons" onClick={approveAccount}><span className="waifu-button-learnmore" > Approve</span> </Button.Outline>
                                    </Box>
                                
                                    <Box>
                                        <Button.Outline className="waifu-card-buttons" onClick={claim}><span className="waifu-button-learnmore" > Claim</span> </Button.Outline>
                                    </Box>
                                </Flex>
                            </div>
                        </Box>
                    </Flex>
                    <div className="wallet-contract-address-text"> 
                        Address: <span className="wallet-contract-address">{walletStore.defaultAddress}</span>
                    </div>
                    </center>
              </Box>
            </div>
        </Box>

        { WETStore.isLoading == false && WETStore.ownedItems.map((item) => (
            
                <Box key={item.index} className="waifu-card-box waifu-pic-box waifu-pic-box-container waifu-card wallet-waifu-card" >
               
                    <div className="box-upper">
                        <img src={WaifuPinkBar} className="waifu-card-box-pinkbar"/>
                        <Box className="waifu-card-box-pink-sub waifu-pic-box waifu-card-sub-black" color="white" style={{maxWidth:1424, marginBottom:1}}>
                            <center className="waifu-pic-box-center waifu-card-pink-center">
                                <span className="card-box-center-pink-text test-margin">
                                    <span className="waifu-box-number">Waifu Name: </span>
                                    <span className="waifu-box-number">{item.name}</span>
                                </span>
                                <img className="waifu-dotted-line" src={WaifuDottedLine}/>
                                    <img className="waifu-focus-text" src={FocusText}/>
                                    <Link to={"/app/detail/"+item.index}>
                                        <img className="waifu-card-image" 
                                            src={GLOBALS.WAIFUS_VIEWABLE_URL==''?GLOBALS.DEFAULT_WAIFU_IMAGE : GLOBALS.WAIFUS_VIEWABLE_URL +"/" + revealedWaifuIndex(item.index) +'.png'}/>
                                        <br/>
                                    </Link>
                                    <img className="waifu-blurred-text" src={BlurredText}/>
                                    <br/>
                                <img className="waifu-dotted-line" style={{paddingTop:'0px'}} src={WaifuDottedLine}/>
                                <br/>
                                
                                <span className="card-box-center-pink-text test-margin">
                                    <span className="waifu-box-number">No: </span>
                                    <span className="waifu-box-number"> {item.index} / {GLOBALS.TOTAL_WAIFUS}</span>
                                </span>
                            </center>
                        </Box>
                    </div>
                    
                </Box>
                
 
           
        ))}
        



            <Box mt={20}>
            { WETStore.isLoading && 
                <Box className="waifu-card-box wallet-box" >
                <div className="box-upper">
                    <img src={WetPinkBar} className="waifu-card-box-greenbar"/>
                    <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                        <center className="waifu-card-box-center wallet-smart-box-center">
                          <span className="wallet-box-header">LOADING YOUR WAIFUS</span>
                          <br/>
                          <Loader className="wallet-waifu-loader" color="#FBE55F" size="80px" />
                        </center>
                    </Box>
                  </div>
              </Box>
            }
            { WETStore.isLoading == false &&
                    WETStore.ownedItems.length == 0 &&
                <Box className="waifu-card-box wallet-box" >
                <div className="box-upper">
                    <img src={WetPinkBar} className="waifu-card-box-greenbar"/>
                    <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                        <center className="waifu-card-box-center wallet-smart-box-center">
                          <span className="wallet-box-header">YOU HAVE <span style={{color:"#FBE55F"}}>0</span> WAIFUS</span>
                          <br/>
                          <div className="waifu-card-text waifu-wallet-text">You don't have any Waifus D: Go get one!</div>
                        </center>
                    </Box>
                  </div>
              </Box>

            }
        </Box>   
        </>
    );
})

export default Main;
