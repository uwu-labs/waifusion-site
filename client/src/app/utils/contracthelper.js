import WaifuABI from "../contracts/ERC721.abi";
import WETABI from "../contracts/ERC20.abi";
import DUNGEON from "../contracts/Dungeon.abi";
import { GLOBALS } from "./globals";
import Web3 from "web3";
import { navigate } from "gatsby";

const web3 = new Web3(GLOBALS.INFURA_API);
const contract = new web3.eth.Contract(
  WaifuABI,
  GLOBALS.WAIFU_CONTRACT_ADDRESS
);
const wetContract = new web3.eth.Contract(WETABI, GLOBALS.WET_CONTRACT_ADDRESS);

// Dungeon Functions
const getDungeonContract = async () => {
  const defaultAccount = await ethEnabled();

  if (defaultAccount === false) {
    return false;
  }

  return new window.web3.eth.Contract(
    DUNGEON,
    GLOBALS.DUNGEON_CONTRACT_ADDRESS,
    {
      from: defaultAccount,
    }
  );
};

const isDungeonApprovedForAll = async () => {
  const defaultAccount = await ethEnabled();
  const waifuContract = await getWaifuContract();
  const approvedForAll = await waifuContract.methods
    .isApprovedForAll(defaultAccount, GLOBALS.DUNGEON_CONTRACT_ADDRESS)
    .call();
  return approvedForAll;
};

const getDungeonAllowance = async () => {
  const defaultAccount = await ethEnabled();
  const wetContract = await getWETContract();
  const currentAllowance = await wetContract.methods
    .allowance(defaultAccount, GLOBALS.DUNGEON_CONTRACT_ADDRESS)
    .call();
  return currentAllowance;
};

const revealPending = async () => {
  const defaultAccount = await ethEnabled();
  const dungeonContract = await getDungeonContract();
  const commits = await dungeonContract.methods.commits(defaultAccount).call();
  return commits.block > 0;
};

// Other Functions
const ethEnabled = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    const defaultAccount = (await window.web3.eth.getAccounts())[0];
    return defaultAccount;
  }
  return false;
};

const getWaifuContract = async () => {
  const defaultAccount = await ethEnabled();

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
};

const getAllowance = async () => {
  const defaultAccount = await ethEnabled();
  const wetContract = await getWETContract();
  const currentAllowance = await wetContract.methods
    .allowance(defaultAccount, GLOBALS.WAIFU_CONTRACT_ADDRESS)
    .call();
  return currentAllowance;
};

const getWETContract = async () => {
  const defaultAccount = await ethEnabled();
  if (defaultAccount === false) {
    return false;
  }
  return new window.web3.eth.Contract(WETABI, GLOBALS.WET_CONTRACT_ADDRESS, {
    from: defaultAccount,
  });
};

const maxUserCanBuy = async () => {
  const defaultAccount = await ethEnabled();
  if (defaultAccount === false) {
    console.log("Contracthelper Maxusercanbuy redirect");
    navigate(`/app/login/`);
  }

  const currentlyOwned = await contract.methods
    .balanceOf(defaultAccount)
    .call();
  return Math.max(0, 20 - currentlyOwned);
};

const getTotalSupply = async () => {
  return contract.methods.totalSupply().call();
};

const balanceOf = async (address) => {
  const defaultAccount = await ethEnabled();
  const currentlyOwned = await contract.methods
    .balanceOf(address || defaultAccount)
    .call();
  return currentlyOwned;
};

const wetBalanceOf = async (address) => {
  const defaultAccount = await ethEnabled();
  const currentlyOwned = await wetContract.methods
    .balanceOf(address || defaultAccount)
    .call();
  return currentlyOwned;
};

const tokenOfOwnerByIndex = async (index, address) => {
  const defaultAccount = await ethEnabled();
  const currentlyOwned = await contract.methods
    .tokenOfOwnerByIndex(address || defaultAccount, index)
    .call();
  return currentlyOwned;
};

const accumulatedForIndex = async (index) => {
  const defaultAccount = await ethEnabled();

  const contract = new window.web3.eth.Contract(
    WETABI,
    GLOBALS.WET_CONTRACT_ADDRESS,
    {
      from: defaultAccount,
    }
  );

  return contract.methods.accumulated(index).call();
};

const claimWET = async (indices) => {
  const defaultAccount = await ethEnabled();

  const contract = new window.web3.eth.Contract(
    WETABI,
    GLOBALS.WET_CONTRACT_ADDRESS,
    {
      from: defaultAccount,
    }
  );

  return contract.methods.claim(indices).send({ from: defaultAccount });
};

const changeNFTName = async (index, newName) => {
  const waifuContract = await getWaifuContract();
  return waifuContract.methods.changeName(index, newName).send();
};

const getWETName = async (index) => {
  return contract.methods.tokenNameByIndex(index).call();
};

const getTokenId = async (index) => {
  return contract.methods.tokenByIndex(index).call();
};

const isNameReserved = async (name) => {
  return contract.methods.isNameReserved(name).call();
};

const getWETOwner = async (index) => {
  return contract.methods.ownerOf(index).call();
};

const toEthUnit = (wei) => {
  return web3.utils.fromWei(wei);
};

const getTransactionReceipt = async (windowWeb3, hash) => {
  if (windowWeb3 == null) {
  }
  return windowWeb3.eth.getTransactionReceipt(hash);
};

const getTimestampFromBlock = async (hash) => {
  const receipt = await web3.eth.getBlock(hash);
  return receipt.timestamp;
};

export {
  web3,
  contract,
  getDungeonContract,
  isDungeonApprovedForAll,
  getDungeonAllowance,
  revealPending,
  ethEnabled,
  getAllowance,
  getWETContract,
  getWaifuContract,
  maxUserCanBuy,
  balanceOf,
  tokenOfOwnerByIndex,
  accumulatedForIndex,
  toEthUnit,
  claimWET,
  changeNFTName,
  getWETName,
  getTokenId,
  isNameReserved,
  getWETOwner,
  wetBalanceOf,
  getTransactionReceipt,
  getTimestampFromBlock,
  getTotalSupply,
};
