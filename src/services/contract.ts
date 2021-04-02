import Web3 from "web3";
import BN from "bn.js";
import { toEthUnit } from "./web3";

import WaifuABI from "../contracts/ERC721.json";
import WETABI from "../contracts/ERC20.json";
import ACCOOMULATORABI from "../contracts/Accoomulator.json";
import DUNGEON from "../contracts/Dungeon.json";
import DUNGEONBSC from "../contracts/DungeonBSC.json";
import GLOBALS from "./globals";
import { Waifu } from "../types/waifusion";

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

export const waifuBalance = async () => {
  const defaultAccount = await ethEnabled();
  const waifuContract = await getWaifuContract();
  const currentlyOwned = await waifuContract.methods
    .balanceOf(defaultAccount)
    .call();
  return currentlyOwned;
};

export const waifuBalanceOfAddress = async (address: string) => {
  const waifuContract = await getWaifuContract();
  const currentlyOwned = await waifuContract.methods.balanceOf(address).call();
  return currentlyOwned;
};

export const wetBalance = async () => {
  const defaultAccount = await ethEnabled();
  const wetContract = await getWETContract();
  const currentlyOwned = await wetContract.methods
    .balanceOf(defaultAccount)
    .call();
  return currentlyOwned;
};

export const wetBalanceOfAddress = async (address: string) => {
  const wetContract = await getWETContract();
  const currentlyOwned = await wetContract.methods.balanceOf(address).call();
  return currentlyOwned;
};

export const tokenOfOwnerByIndex = async (index: number) => {
  const defaultAccount = await ethEnabled();
  const waifuContract = await getWaifuContract();
  const currentlyOwned = await waifuContract.methods
    .tokenOfOwnerByIndex(defaultAccount, index)
    .call();
  return currentlyOwned;
};

export const tokenOfAddressByIndex = async (index: number, address: string) => {
  const waifuContract = await getWaifuContract();
  const currentlyOwned = await waifuContract.methods
    .tokenOfOwnerByIndex(address, index)
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

export const getWaifus = async () => {
  const waifus: Waifu[] = [];

  const t = await accoomulate();
  await t.forEach(async (token: any) => {
    const accumulated = new BN(token.wetAccumulated);
    const accumulatedWETNumber = Number(toEthUnit(accumulated));
    waifus.push({
      id: token.tokenId,
      name: token.name,
      accumulatedWet: accumulatedWETNumber,
    });
  });

  return waifus;
};
