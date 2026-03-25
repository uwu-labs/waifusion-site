import { decorate, observable, computed } from "mobx";

const DEMO_ADDRESS =
  "0x000000000000000000000000000000000000dEaD";

class WalletStore {
  type = "";
  defaultAddress = DEMO_ADDRESS;
  isWalletConnected = true;
  web3 = null;
  isPendingApproval = false;
  isApproved = true;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  get hasAccount() {
    return true;
  }

  loginWalletIfNeeded() {}
}

decorate(WalletStore, {
  defaultAddress: observable,
  hasAccount: computed,
  web3: observable,
  isPendingApproval: observable,
  isApproved: observable,
  isWalletConnected: observable,
});

export default WalletStore;
