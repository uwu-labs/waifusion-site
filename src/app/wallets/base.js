// Frameworks
import * as _ from "lodash";
import Web3 from "web3";

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
    const accounts = await this.web3.currentProvider.enable();
    this.changeUserAccount(accounts);
  }

  async disconnect() {
    // Clear Account
    this.store.type = "";
    this.store.defaultAddress = "";
  }

  changeUserAccount(accounts = []) {
    if (_.isEmpty(accounts)) {
      return;
    }
    this.store.type = this.type;
    this.store.defaultAddress = _.get(accounts, "0", "");
  }

  _hookCommonEvents() {
    const _changeAccount = (accts) => this.changeUserAccount(accts);
    if (_.isFunction(_.get(this.provider, "on"))) {
      this.provider.on("accountsChanged", _changeAccount);
    } else if (_.isFunction(_.get(this.web3, "currentProvider.on"))) {
      this.web3.currentProvider.on("accountsChanged", _changeAccount);
    }
  }
}

export default IWalletBase;
