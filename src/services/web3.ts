import Web3 from "web3";

declare global {
  interface Window {
    web3: Web3;
  }
}

const initWeb3 = (): void => {
  if (!window.web3) return;
  window.web3 = new Web3(window.web3.currentProvider);
};

export default { initWeb3 };
