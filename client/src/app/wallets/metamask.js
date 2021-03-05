// Frameworks
import Web3 from 'web3';

import IWalletBase from './base';
import { GLOBALS } from '../utils/globals';
import WaifuABI from '../contracts/ERC721.abi';
import WETABI from '../contracts/ERC20.abi';

class MetamaskWallet extends IWalletBase {
    constructor(site, store) {
        super(GLOBALS.WALLET_TYPE_METAMASK, site, store);
    }

    static isEnabled() {
        const isModern = !!window.ethereum;
        const isLegacy = (typeof window.web3 !== 'undefined');
        return (isModern || isLegacy) && window.web3.currentProvider.isMetaMask;
    }

    async init({rpcUrl, chainId}) {
        // Detect Injected Web3
        if (!MetamaskWallet.isEnabled()) {
            throw new Error('Error: MetaMask is not installed on this browser!');
        }

        // Initialize a Web3 Provider object
        this.provider = window.ethereum || window.web3.currentProvider;

        // Initialize a Web3 object
        this.web3 = new Web3(this.provider);
        //this.web3 = new Web3(GLOBALS.INFURA_API);
        this.contract = new this.web3.eth.Contract(WaifuABI, GLOBALS.WAIFU_CONTRACT_ADDRESS);
        this.wetContract = new this.web3.eth.Contract(WETABI, GLOBALS.WET_CONTRACT_ADDRESS);

        // Initialize Base
        await super.init();
    }
}

export default MetamaskWallet;
