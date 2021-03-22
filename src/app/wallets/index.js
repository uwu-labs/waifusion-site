// Frameworks
import * as _ from "lodash";
import Web3 from "web3";
import { navigate } from "gatsby";

// Internals
import { GLOBALS } from "../utils/globals";
import WaifuABI from "../contracts/ERC721.abi";
import WETABI from "../contracts/ERC20.abi";

// Wallets
import MetamaskWallet from "./metamask";

class Wallet {
  constructor() {
    this.type = null;
    this.site = null;
    this.store = null;
  }

  static instance() {
    if (!Wallet.__instance) {
      Wallet.__instance = new Wallet();
    }
    return Wallet.__instance;
  }

  async prepare({ site, store }) {
    this.site = site;
    this.store = store;
  }

  static isEnabled(type) {
    return Wallet.typeMap()[type].wallet.isEnabled();
  }

  async init(type = GLOBALS.WALLET_TYPE_METAMASK) {
    if (_.isEmpty(this.site)) {
      throw new Error(
        "Error: Wallet has not been prepared before initializing!"
      );
    }
    if (type === this.type) {
      return;
    }
    this.type = type;

    const walletData = Wallet.typeMap()[type];
    const walletClass = walletData.wallet;
    this.wallet = new walletClass(this.site, this.store);

    //await this.wallet.init({options: walletData.options, ...Wallet._getEnv()});

    if (!MetamaskWallet.isEnabled()) {
      throw new Error("Error: MetaMask is not installed on this browser!");
    }

    // Initialize a Web3 Provider object
    this.provider = window.ethereum || window.web3.currentProvider;

    // Initialize a Web3 object
    this.web3 = new Web3(this.provider);
    //this.web3 = new Web3(GLOBALS.INFURA_API);
    this.contract = new this.web3.eth.Contract(
      WaifuABI,
      GLOBALS.WAIFU_CONTRACT_ADDRESS
    );
    this.wetContract = new this.web3.eth.Contract(
      WETABI,
      GLOBALS.WET_CONTRACT_ADDRESS
    );
    // Initialize Base
    //await this.wallet.init();
  }

  async connect() {
    if (!this.wallet) {
      return;
    }
    await this.wallet.connect();
  }

  async disconnect() {
    if (!this.wallet) {
      return;
    }
    await this.wallet.disconnect();
  }

  static getName(type) {
    return Wallet.typeMap()[type].name || "Unknown";
  }

  static getDefaultAccount() {
    if (this.store && this.store.defaultAddress) {
      return this.store.defaultAddress;
    } else {
      return null;
    }
  }
  async ethEnabled() {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        //const defaultAccount = await window.ethereum.request({ method: 'eth_requestAccounts' })[0];
        window.ethereum.enable();
        const defaultAccount = (await window.web3.eth.getAccounts())[0];
        return defaultAccount;
      }
    } catch (err) {
      //failed connection
      console.log("Failed eth enabled");
    } finally {
    }
    return false;
  }

  async getWaifuContract() {
    const defaultAccount = await this.ethEnabled();
    if (defaultAccount === false) {
      return false;
    }

    return new window.web3.eth.Contract(
      WaifuABI,
      GLOBALS.WAIFU_CONTRACT_ADDRESS,
      {
        from: defaultAccount,
      }
    );
  }

  // async getWETContract() {
  //     const defaultAccount = await this.ethEnabled();
  //     if (defaultAccount === false) {
  //         return false;
  //     }
  //     return new window.web3.eth.Contract(WETABI, GLOBALS.WET_CONTRACT_ADDRESS, {
  //         from: defaultAccount,
  //     });
  // };

  async maxUserCanBuy() {
    const defaultAccount = await this.ethEnabled();
    if (defaultAccount === false) {
      console.log("Maxusercanbuy redirect");
      navigate(`/app/login/`);
    }

    const currentlyOwned = await this.wallet.contract.methods
      .balanceOf(defaultAccount)
      .call();
    return Math.max(0, 20 - currentlyOwned);
  }

  async balanceOf(address) {
    const defaultAccount = await this.ethEnabled();
    const currentlyOwned = await this.wallet.contract.methods
      .balanceOf(address || defaultAccount)
      .call();
    return currentlyOwned;
  }

  async wetBalanceOf(address) {
    let defaultAccount = null;
    try {
      defaultAccount = await this.ethEnabled();
    } catch (err) {
      console.log("Eth enabled failed in nct balance of");
    }

    const currentlyOwned = await this.wallet.wetContract.methods
      .balanceOf(address || defaultAccount)
      .call();
    return currentlyOwned;
  }

  async tokenOfOwnerByIndex(index, address) {
    const defaultAccount = await this.ethEnabled();
    const currentlyOwned = await this.wallet.contract.methods
      .tokenOfOwnerByIndex(address || defaultAccount, index)
      .call();
    return currentlyOwned;
  }

  async accumulatedForIndex(index) {
    const defaultAccount = await this.ethEnabled();

    const contract = new window.web3.eth.Contract(
      WETABI,
      GLOBALS.WET_CONTRACT_ADDRESS,
      {
        from: defaultAccount,
      }
    );

    return contract.methods.accumulated(index).call();
  }

  async claimNCT(indices) {
    const defaultAccount = await this.ethEnabled();

    const contract = new window.web3.eth.Contract(
      WETABI,
      GLOBALS.WET_CONTRACT_ADDRESS,
      {
        from: defaultAccount,
      }
    );

    return contract.methods.claim(indices).send({ from: defaultAccount });
  }

  async getAllowance() {
    const defaultAccount = await this.ethEnabled();
    const wetContract = await this.getWETContract();
    const currentAllowance = await wetContract.methods
      .allowance(defaultAccount, GLOBALS.WAIFU_CONTRACT_ADDRESS)
      .call();
    return currentAllowance;
  }
  async changeNFTName(index, newName) {
    const waifuContract = await this.getWaifuContract();
    return waifuContract.methods.changeName(index, newName).send();
  }

  async getWETName(index) {
    return this.wallet.contract.methods.tokenNameByIndex(index).call();
  }

  async isNameReserved(name) {
    return this.wallet.contract.methods.isNameReserved(name).call();
  }

  async getWETOwner(index) {
    return this.wallet.contract.methods.ownerOf(index).call();
  }

  toEthUnit(wei) {
    return this.wallet.web3.utils.fromWei(wei);
  }

  async getTransactionReceipt(windowWeb3, hash) {
    return windowWeb3.eth.getTransactionReceipt(hash);
  }

  async getTimestampFromBlock(hash) {
    const receipt = await this.web3.eth.getBlock(hash);
    return receipt.timestamp;
  }

  static typeMap() {
    return {
      [GLOBALS.WALLET_TYPE_METAMASK]: {
        wallet: MetamaskWallet,
        name: "MetaMask",
        options: {},
      },
    };
  }

  static _getEnv() {
    const rpcUrl = process.env.GATSBY_ETH_JSONRPC_URL;
    const chainId = process.env.GATSBY_ETH_CHAIN_ID;
    if (_.isEmpty(rpcUrl)) {
      console.error(
        'Invalid RPC-URL.  Make sure you have set the correct ENV VARs to connect to Web3; ("GATSBY_ETH_JSONRPC_URL").'
      );
    }
    if (_.isEmpty(chainId)) {
      console.error(
        'Invalid Chain-ID.  Make sure you have set the correct ENV VARs to connect to Web3; ("GATSBY_ETH_CHAIN_ID").'
      );
    }
    return { rpcUrl, chainId };
  }
}
Wallet.__instance = null;

export default Wallet;
