import WaifuABI from "../contracts/ERC721.json";
import WETABI from "../contracts/ERC20.json";
import ACCOOMULATORABI from "../contracts/Accoomulator.json";
import DUNGEON from "../contracts/Dungeon.json";
import DUNGEONBSC from "../contracts/DungeonBSC.json";
import GLOBALS from "./globals";
import Web3 from "web3";

export const ethEnabled = async (): Promise<string> => {
  if ((window as any).ethereum) {
    (window as any).web3 = new Web3((window as any).ethereum);
    (window as any).ethereum.enable();
    const defaultAccount = (await (window as any).web3.eth.getAccounts())[0];
    return defaultAccount;
  }
  return "";
};

// Contracts
export const getDungeonContract = async () => {
  const defaultAccount = await ethEnabled();
  return new (window as any).web3.eth.Contract(
    GLOBALS.WAIFU_VERSION === "eth" ? DUNGEON : DUNGEONBSC,
    GLOBALS.DUNGEON_CONTRACT_ADDRESS,
    {
      from: defaultAccount,
    }
  );
};

export const getWaifuContract = async () => {
  const defaultAccount = await ethEnabled();
  return new (window as any).web3.eth.Contract(
    WaifuABI,
    GLOBALS.WAIFU_CONTRACT_ADDRESS,
    {
      from: defaultAccount,
    }
  );
};

export const getWETContract = async () => {
  const defaultAccount = await ethEnabled();
  return new (window as any).web3.eth.Contract(
    WETABI,
    GLOBALS.WET_CONTRACT_ADDRESS,
    {
      from: defaultAccount,
    }
  );
};

export const getAccoomulateContract = async () => {
  const defaultAccount = await ethEnabled();
  return new (window as any).web3.eth.Contract(
    ACCOOMULATORABI,
    GLOBALS.ACCOOMULATOR_CONTRACT_ADDRESS,
    {
      from: defaultAccount,
    }
  );
};

// Functions
export const isDungeonApprovedForAll = async () => {
  const defaultAccount = await ethEnabled();
  const waifuContract = await getWaifuContract();
  const approvedForAll = await waifuContract.methods
    .isApprovedForAll(defaultAccount, GLOBALS.DUNGEON_CONTRACT_ADDRESS)
    .call();
  return approvedForAll;
};

export const getDungeonAllowance = async () => {
  const defaultAccount = await ethEnabled();
  const wetContract = await getWETContract();
  const currentAllowance = await wetContract.methods
    .allowance(defaultAccount, GLOBALS.DUNGEON_CONTRACT_ADDRESS)
    .call();
  return currentAllowance;
};

export const revealPending = async () => {
  const defaultAccount = await ethEnabled();
  const dungeonContract = await getDungeonContract();
  const commits = await dungeonContract.methods.commits(defaultAccount).call();
  return commits.block > 0;
};

// Other Functions

export const getAllowance = async () => {
  const defaultAccount = await ethEnabled();
  const wetContract = await getWETContract();
  const currentAllowance = await wetContract.methods
    .allowance(defaultAccount, GLOBALS.WAIFU_CONTRACT_ADDRESS)
    .call();
  return currentAllowance;
};

export const balanceOf = async (address: string) => {
  const defaultAccount = await ethEnabled();
  const waifuContract = await getWaifuContract();
  const currentlyOwned = await waifuContract.methods
    .balanceOf(address || defaultAccount)
    .call();
  return currentlyOwned;
};

export const wetBalanceOf = async (address: string) => {
  const defaultAccount = await ethEnabled();
  const wetContract = await getWETContract();
  const currentlyOwned = await wetContract.methods
    .balanceOf(address || defaultAccount)
    .call();
  return currentlyOwned;
};

export const tokenOfOwnerByIndex = async (index: number, address: string) => {
  const defaultAccount = await ethEnabled();
  const waifuContract = await getWaifuContract();
  const currentlyOwned = await waifuContract.methods
    .tokenOfOwnerByIndex(address || defaultAccount, index)
    .call();
  return currentlyOwned;
};

export const accoomulate = async () => {
  const defaultAccount = await ethEnabled();
  const accoomulatorContract = await getAccoomulateContract();
  return accoomulatorContract.methods
    .accoomulatedTokenIdsOwned(defaultAccount)
    .call();
};

export const accumulatedForIndex = async (index: number) => {
  const accoomulatorContract = await getAccoomulateContract();
  return accoomulatorContract.methods.accumulated(index).call();
};

export const claimWET = async (indices: number[]) => {
  const defaultAccount = await ethEnabled();
  const wetContract = await getWETContract();
  return wetContract.methods.claim(indices).send({ from: defaultAccount });
};

export const changeNFTName = async (index: number, newName: string) => {
  const waifuContract = await getWaifuContract();
  return waifuContract.methods.changeName(index, newName).send();
};

export const getWETName = async (index: number) => {
  const wetContract = await getWETContract();
  return wetContract.methods.tokenNameByIndex(index).call();
};

export const getTokenId = async (index: number) => {
  const waifuContract = await getWaifuContract();
  return waifuContract.methods.tokenByIndex(index).call();
};

export const isNameReserved = async (name: string) => {
  const waifuContract = await getWaifuContract();
  return waifuContract.methods.isNameReserved(name).call();
};

export const getWETOwner = async (index: number) => {
  const waifuContract = await getWaifuContract();
  return waifuContract.methods.ownerOf(index).call();
};
