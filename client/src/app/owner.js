// Frameworks
import React, { useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import { Heading, Blockie, Flex,EthAddress, Button, Text, Box } from 'rimble-ui';
import {observer} from 'mobx-react-lite';
import BN from 'bn.js';

// Wallet Interface
import Wallet from './wallets';
import {wetBalanceOf, toEthUnit, balanceOf} from './utils/contracthelper.js'

// Data Store
import { RootStoreContext } from './stores/root.store';

import { GLOBALS } from './utils/globals.js';

// Main Route
const Owner = observer((props) => {
    const rootStore = useContext(RootStoreContext);
    const { walletStore, WETStore } = rootStore;
    const wallet = Wallet.instance();

    useEffect(() => {
        async function updateWETS() {
             await updateWETState();
        };
        updateWETS();
    }, [])

    const revealedMaskIndex = (nftIndex) => {
        return (Number(nftIndex) + GLOBALS.STARTING_INDEX) % 16384;
    }
    
    const updateWETState = async () => {
        try{ 
        WETStore.wetBalance = Number(await toEthUnit(await wetBalanceOf(props.ownerId)),).toFixed(2);
        const balance = await balanceOf(props.ownerId);
        let totalAccumulated = new BN(0);

        // WETStore.totalAccumulatedLoading = true;
        // for (let i = 0; i < balance; i++) {
        //     const index = await tokenOfOwnerByIndex(i, props.ownerId);
        //     const name = await getWETName(index);
        //     const accumulated = new BN(await wallet.accumulatedForIndex(index));
        //     totalAccumulated = totalAccumulated.add(accumulated);

        //     if (WETStore.items.length < balance) {
        //         WETStore.items.push({ index, name });
        //     }
        // }

        // WETStore.totalAccumulated = Number(await toEthUnit(totalAccumulated)).toFixed(2,);
        } catch(err)        {
            console.log(err);
        }
        WETStore.totalAccumulatedLoading = false;
    }
        
    
    
    return (
        <>
            <Flex col-sm-12>
                <Box col-sm-8 width={1/2}>
                    <Heading as={"h3"}>
                        &nbsp;&nbsp;Owner
                    </Heading>

                    <Box mt={20}>
                        <Flex>
                            <Blockie seed={props.ownerId}>
                            </Blockie>
                            <Text paddingLeft={'2'} paddingTop={'2'}>
                                {props.ownerId}
                            </Text>
                        </Flex>
                    </Box>
                </Box>
                <Box col-sm-4>
                    <Text>Current WET: {WETStore.wetBalance}</Text>
                    <Text>Accumulated WET: {WETStore.totalAccumulated}</Text>
                </Box>
            </Flex>
            <Flex>
                <Box> 
                    <Heading as={"h3"}>
                        &nbsp;&nbsp;Owned Waifusions {WETStore.items.length}
                    </Heading>
                    <Text>Owned</Text>
                </Box>
            </Flex>
        </>
    );
})
//Need to update the Accumulated NCT field to be a pending one
export default Owner;
