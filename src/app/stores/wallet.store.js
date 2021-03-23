import { decorate, observable, computed } from "mobx";
import { navigate } from "gatsby";
import * as _ from "lodash";
import { autoSave } from "../utils/autoSave";

class WalletStore {
  type = "";
  defaultAddress = "";
  isWalletConnected = false;
  web3 = null;
  isPendingApproval = false;
  isApproved = false;

  constructor(rootStore) {
    this.type = "";
    this.defaultAddress = "";
    this.isWalletConnected = false;
    this.web3 = null;
    this.isPendingApproval = false;
    this.isApproved = false;
    this.rootStore = rootStore;

    autoSave(this, "walletStore");
    console.log("Wallet Store Contructor");
  }

  get hasAccount() {
    return !_.isEmpty(this.defaultAddress);
  }

  loginWalletIfNeeded() {
    if (!this.isWalletConnected) {
      navigate('/app/login')
    }
  }
}
decorate(WalletStore, {
  defaultAddress: observable,
  hasAccount: computed,
  contract: observable,
  wetContract: observable,
  web3: observable,
  isPendingApproval: observable,
  isApproved: observable,
  isWalletConnected: observable,
});

export default WalletStore;
