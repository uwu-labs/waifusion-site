import Web3 from "web3";
import BN from "bn.js";

declare global {
  interface Window {
    web3: Web3;
  }
}

export const initWeb3 = (): void => {
  if (!window.web3) return;
  window.web3 = new Web3(window.web3.currentProvider);
};

export const toEthUnit = (wei: BN): string => {
  if (!window.web3) return "";
  return Web3.utils.fromWei(wei);
};

export const toWeiUnit = (eth: string): string => {
  if (!window.web3) return "";
  return Web3.utils.toWei(eth);
};
