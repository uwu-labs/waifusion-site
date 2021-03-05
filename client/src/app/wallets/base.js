// Frameworks
import * as _ from 'lodash';
import WaifuABI from '../contracts/ERC721.abi';
import WETABI from '../contracts/ERC20.abi';
import { GLOBALS } from '../utils/globals.js';
import Web3 from 'web3';
import { navigate } from 'gatsby';

//These 3 are from the vue version
//const web3 = new Web3(GLOBALS.INFURA_API);
// const contract = new web3.eth.Contract(WaifuABI, GLOBALS.WAIFU_CONTRACT_ADDRESS);
// const wetContract = new web3.eth.Contract(WETABI, GLOBALS.WET_CONTRACT_ADDRESS);

class IWalletBase {
    constructor(type, site, store) {
        this.type = type;
        this.site = site;
        this.store = store;

        this.web3 = new Web3(window.ethereum);
        this.provider = null;
        this.contract = null;
        this.wetContract = null;
        console.log("WalletBase setting web3");
    }

    static isEnabled() {
        return true;
    }

    async init() {
        // Get Default Account if already Connected
        this.changeUserAccount(this.web3.eth.accounts);
        this._hookCommonEvents();
    }

    async connect() {
        // const accounts = await this.provider.enable(); // send("eth_requestAccounts");
        // this.web3.eth.getCoinbase((error, address) => { ... });
        const accounts = await this.web3.currentProvider.enable(); // send("eth_requestAccounts");
        this.changeUserAccount(accounts);
    }

    async disconnect() {
        // Clear Account
        this.store.type = '';
        this.store.defaultAddress = '';
    }

    changeUserAccount(accounts = []) {
        if (_.isEmpty(accounts)) { return; }
        this.store.type = this.type;
        this.store.defaultAddress = _.get(accounts, '0', '');
        // console.log(`User's address changed to "${this.store.defaultAddress}".`);
    }


    _hookCommonEvents() {
        const _changeAccount = (accts) => this.changeUserAccount(accts);
        if (_.isFunction(_.get(this.provider, 'on'))) {
            this.provider.on('accountsChanged', _changeAccount);
        }
        else if (_.isFunction(_.get(this.web3, 'currentProvider.on'))) {
            this.web3.currentProvider.on('accountsChanged', _changeAccount);
        }
    }
}

export default IWalletBase;
