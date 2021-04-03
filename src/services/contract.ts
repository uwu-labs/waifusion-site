import { Contract } from "web3-eth-contract";
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

export type AccoomulateWaifu = {
  wetAccumulate: string;
  tokenId: number;
  name: string;
  accumulatedWETNumber: number;
};

export class ContractHelper {
  address: string;

  constructor() {
    this.address = "";
  }

  init = async (): Promise<void> => {
    if ((window as any).ethereum) {
      (window as any).web3 = new Web3((window as any).ethereum);
      (window as any).ethereum.enable();
      const addressList = await (window as any).web3.eth.getAccounts();
      [this.address] = addressList;
    }
  };

  // Contracts
  getDungeonContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      GLOBALS.WAIFU_VERSION === "eth" ? DUNGEON : DUNGEONBSC,
      GLOBALS.DUNGEON_CONTRACT_ADDRESS,
      {
        from: this.address,
      }
    );
  };

  getWaifuContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      WaifuABI,
      GLOBALS.WAIFU_CONTRACT_ADDRESS,
      {
        from: this.address,
      }
    );
  };

  getWetContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      WETABI,
      GLOBALS.WET_CONTRACT_ADDRESS,
      {
        from: this.address,
      }
    );
  };

  getAccoomulateContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      ACCOOMULATORABI,
      GLOBALS.ACCOOMULATOR_CONTRACT_ADDRESS,
      {
        from: this.address,
      }
    );
  };

  // Functions
  isDungeonApprovedForAll = async (): Promise<boolean> => {
    const waifuContract = await this.getWaifuContract();
    const approvedForAll = await waifuContract.methods
      .isApprovedForAll(this.address, GLOBALS.DUNGEON_CONTRACT_ADDRESS)
      .call();
    return approvedForAll;
  };

  getDungeonAllowance = async (): Promise<number> => {
    const wetContract = await this.getWetContract();
    const currentAllowance = await wetContract.methods
      .allowance(this.address, GLOBALS.DUNGEON_CONTRACT_ADDRESS)
      .call();
    return currentAllowance;
  };

  revealPending = async (): Promise<boolean> => {
    const dungeonContract = await this.getDungeonContract();
    const commits = await dungeonContract.methods.commits(this.address).call();
    return commits.block > 0;
  };

  // Other Functions

  getAllowance = async (): Promise<number> => {
    const wetContract = await this.getWetContract();
    const currentAllowance = await wetContract.methods
      .allowance(this.address, GLOBALS.WAIFU_CONTRACT_ADDRESS)
      .call();
    return currentAllowance;
  };

  waifuBalance = async (): Promise<number> => {
    const waifuContract = await this.getWaifuContract();
    const currentlyOwned = await waifuContract.methods
      .balanceOf(this.address)
      .call();
    return currentlyOwned;
  };

  waifuBalanceOfAddress = async (address: string): Promise<number> => {
    const waifuContract = await this.getWaifuContract();
    const currentlyOwned = await waifuContract.methods
      .balanceOf(address)
      .call();
    return currentlyOwned;
  };

  wetBalance = async (): Promise<number> => {
    const wetContract = await this.getWetContract();
    const currentlyOwned = await wetContract.methods
      .balanceOf(this.address)
      .call();
    return currentlyOwned;
  };

  wetBalanceOfAddress = async (address: string): Promise<number> => {
    const wetContract = await this.getWetContract();
    const currentlyOwned = await wetContract.methods.balanceOf(address).call();
    return currentlyOwned;
  };

  tokenOfOwnerByIndex = async (index: number): Promise<number> => {
    const waifuContract = await this.getWaifuContract();
    const currentlyOwned = await waifuContract.methods
      .tokenOfOwnerByIndex(this.address, index)
      .call();
    return currentlyOwned;
  };

  tokenOfAddressByIndex = async (
    index: number,
    address: string
  ): Promise<number> => {
    const waifuContract = await this.getWaifuContract();
    const currentlyOwned = await waifuContract.methods
      .tokenOfOwnerByIndex(address, index)
      .call();
    return currentlyOwned;
  };

  accoomulate = async (): Promise<AccoomulateWaifu[]> => {
    return this.accoomulateOfAddress(this.address);
  };

  accoomulateOfAddress = async (
    address: string
  ): Promise<AccoomulateWaifu[]> => {
    const accoomulatorContract = await this.getAccoomulateContract();
    return accoomulatorContract.methods
      .accoomulatedTokenIdsOwned(address)
      .call();
  };

  accumulatedForIndex = async (index: number): Promise<number> => {
    const accoomulatorContract = await this.getAccoomulateContract();
    return accoomulatorContract.methods.accumulated(index).call();
  };

  claimWET = async (indices: number[]): Promise<void> => {
    const wetContract = await this.getWetContract();
    return wetContract.methods.claim(indices).send({ from: this.address });
  };

  changeNFTName = async (index: number, newName: string): Promise<void> => {
    const waifuContract = await this.getWaifuContract();
    return waifuContract.methods.changeName(index, newName).send();
  };

  getWETName = async (index: number): Promise<string> => {
    const wetContract = await this.getWetContract();
    return wetContract.methods.tokenNameByIndex(index).call();
  };

  getTokenId = async (index: number): Promise<number> => {
    const waifuContract = await this.getWaifuContract();
    return waifuContract.methods.tokenByIndex(index).call();
  };

  isNameReserved = async (name: string): Promise<boolean> => {
    const waifuContract = await this.getWaifuContract();
    return waifuContract.methods.isNameReserved(name).call();
  };

  getWaifuOwner = async (index: number): Promise<string> => {
    const waifuContract = await this.getWaifuContract();
    return waifuContract.methods.ownerOf(index).call();
  };

  getWaifus = async (): Promise<Waifu[]> => {
    return this.getWaifusOfAddress(this.address);
  };

  getWaifusOfAddress = async (address: string): Promise<Waifu[]> => {
    const waifus: Waifu[] = [];

    const t = await this.accoomulateOfAddress(address);
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
}
