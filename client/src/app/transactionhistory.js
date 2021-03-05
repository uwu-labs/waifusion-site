// Frameworks
import React, { useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import {observer} from 'mobx-react-lite';
import { Heading, Blockie, Flex,EthAddress, Button, Text, Box, Card } from 'rimble-ui';

import OverviewGreenBar from '../images/overview_green_bar.png';

// Data Store
import { RootStoreContext } from './stores/root.store';

// Main Route
const TransactionHistory = observer( (props) => {
    const rootStore = useContext(RootStoreContext);
    const { walletStore, transactionStore } = rootStore;

    useEffect(() => {
        
        if (!walletStore.isWalletConnected) {
            console.log("TransactionHistory redirect");
            navigate(`/app/login`);
          }

    }, [])

    /*
    <Heading as={"h3"}>
                &nbsp;&nbsp;Pending Transactions
            </Heading>

            <Box mt={20}>
                <Flex>
                   {transactionStore.pendingTransactions.length == 0 && <Text>No Pending Transactions</Text>}
                   {transactionStore.pendingTransactions.map((item, index) => (
                    <div key={index}>
                        <Card>
                            
                                <h5>{ item.description }</h5>
                                <a href={"https://etherscan.io/tx/" + item.txHash} target="_blank">
                                    <p >View on Etherscan</p>
                                </a>
                            
                        </Card>
                    </div>
                   ))}

                   
                </Flex>
            </Box> 
    */
    return (
        <>
          
        <Box className="waifu-card-box" >
        <div className="box-upper box-upper-large">
            <img src={OverviewGreenBar} className="waifu-card-box-greenbar"/>
            <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                <center className="waifu-card-box-center">
                    <span id="e0_338">Pending Transactions</span>
                
                        {transactionStore.pendingTransactions.length == 0 && <Text className="transactions-none-text">No Pending Transactions</Text>}
                        {transactionStore.pendingTransactions.map((item, index) => (
                        <div key={index}>
                            <Flex>
                                <Box className="transactions-type-text" width={1 / 2}> { item.description } </Box>
                                <Box className="transactions-ether-text" width={1 / 2}>
                                    <a href={"https://etherscan.io/tx/" + item.txHash} target="_blank">
                                            View on Etherscan
                                    </a>
                                </Box>
                            </Flex>
                        </div>
                        ))}
                </center>
            </Box>
            </div>
        </Box>
        
        <Box className="waifu-card-box waifu-transaction-box" >
        <div className="box-upper box-upper-large">
            <img src={OverviewGreenBar} className="waifu-card-box-greenbar"/>
            <Box className="waifu-card-box-sub" color="white" style={{maxWidth:1424, marginBottom:1}}>
                <center className="waifu-card-box-center">
                    <span id="e0_338">Completed Transactions</span>
                
                        {transactionStore.completedTransactions.length == 0 && <Text className="transactions-none-text">No Completed Transactions</Text>}
                        {transactionStore.completedTransactions.map((item, index) => (
                        <div key={index}>
                            <Flex>
                                <Box className="transactions-type-text" width={1 / 2}> { item.description } </Box>
                                <Box className="transactions-ether-text" width={1 / 2}>
                                    <a href={"https://etherscan.io/tx/" + item.txHash} target="_blank">
                                            View on Etherscan
                                    </a>
                                </Box>
                            </Flex>
                        </div>
                        ))}
                </center>
            </Box>
            </div>
        </Box>

        <div style={{minHeight:'131px'}}></div>


        </>
    );
})

export default TransactionHistory;
