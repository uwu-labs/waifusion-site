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

export class ContractHelper {
  address: string;

  constructor() {
    this.address = "";
  }

  init = async () => {
    if ((window as any).ethereum) {
      (window as any).web3 = new Web3((window as any).ethereum);
      (window as any).ethereum.enable();
      const addressList = await (window as any).web3.eth.getAccounts();
      [this.address] = addressList;
    }
  };

  // Contracts
  getDungeonContract = async () => {
    return new (window as any).web3.eth.Contract(
      GLOBALS.WAIFU_VERSION === "eth" ? DUNGEON : DUNGEONBSC,
      GLOBALS.DUNGEON_CONTRACT_ADDRESS,
      {
        from: this.address,
      }
    );
  };

  getWaifuContract = async () => {
    return new (window as any).web3.eth.Contract(
      WaifuABI,
      GLOBALS.WAIFU_CONTRACT_ADDRESS,
      {
        from: this.address,
      }
    );
  };

  getWetContract = async () => {
    return new (window as any).web3.eth.Contract(
      WETABI,
      GLOBALS.WET_CONTRACT_ADDRESS,
      {
        from: this.address,
      }
    );
  };

  getAccoomulateContract = async () => {
    return new (window as any).web3.eth.Contract(
      ACCOOMULATORABI,
      GLOBALS.ACCOOMULATOR_CONTRACT_ADDRESS,
      {
        from: this.address,
      }
    );
  };

  // Functions
  isDungeonApprovedForAll = async () => {
    const waifuContract = await this.getWaifuContract();
    const approvedForAll = await waifuContract.methods
      .isApprovedForAll(this.address, GLOBALS.DUNGEON_CONTRACT_ADDRESS)
      .call();
    return approvedForAll;
  };

  getDungeonAllowance = async () => {
    const wetContract = await this.getWetContract();
    const currentAllowance = await wetContract.methods
      .allowance(this.address, GLOBALS.DUNGEON_CONTRACT_ADDRESS)
      .call();
    return currentAllowance;
  };

  revealPending = async () => {
    const dungeonContract = await this.getDungeonContract();
    const commits = await dungeonContract.methods.commits(this.address).call();
    return commits.block > 0;
  };

  // Other Functions

  getAllowance = async () => {
    const wetContract = await this.getWetContract();
    const currentAllowance = await wetContract.methods
      .allowance(this.address, GLOBALS.WAIFU_CONTRACT_ADDRESS)
      .call();
    return currentAllowance;
  };

  waifuBalance = async () => {
    const waifuContract = await this.getWaifuContract();
    const currentlyOwned = await waifuContract.methods
      .balanceOf(this.address)
      .call();
    return currentlyOwned;
  };

  waifuBalanceOfAddress = async (address: string) => {
    const waifuContract = await this.getWaifuContract();
    const currentlyOwned = await waifuContract.methods
      .balanceOf(address)
      .call();
    return currentlyOwned;
  };

  wetBalance = async () => {
    const wetContract = await this.getWetContract();
    const currentlyOwned = await wetContract.methods
      .balanceOf(this.address)
      .call();
    return currentlyOwned;
  };

  wetBalanceOfAddress = async (address: string) => {
    const wetContract = await this.getWetContract();
    const currentlyOwned = await wetContract.methods.balanceOf(address).call();
    return currentlyOwned;
  };

  tokenOfOwnerByIndex = async (index: number) => {
    const waifuContract = await this.getWaifuContract();
    const currentlyOwned = await waifuContract.methods
      .tokenOfOwnerByIndex(this.address, index)
      .call();
    return currentlyOwned;
  };

  tokenOfAddressByIndex = async (index: number, address: string) => {
    const waifuContract = await this.getWaifuContract();
    const currentlyOwned = await waifuContract.methods
      .tokenOfOwnerByIndex(address, index)
      .call();
    return currentlyOwned;
  };

  accoomulate = async () => {
    const accoomulatorContract = await this.getAccoomulateContract();
    return accoomulatorContract.methods
      .accoomulatedTokenIdsOwned(this.address)
      .call();
  };

  accumulatedForIndex = async (index: number) => {
    const accoomulatorContract = await this.getAccoomulateContract();
    return accoomulatorContract.methods.accumulated(index).call();
  };

  claimWET = async (indices: number[]) => {
    const wetContract = await this.getWetContract();
    return wetContract.methods.claim(indices).send({ from: this.address });
  };

  changeNFTName = async (index: number, newName: string) => {
    const waifuContract = await this.getWaifuContract();
    return waifuContract.methods.changeName(index, newName).send();
  };

  getWETName = async (index: number) => {
    const wetContract = await this.getWetContract();
    return wetContract.methods.tokenNameByIndex(index).call();
  };

  getTokenId = async (index: number) => {
    const waifuContract = await this.getWaifuContract();
    return waifuContract.methods.tokenByIndex(index).call();
  };

  isNameReserved = async (name: string) => {
    const waifuContract = await this.getWaifuContract();
    return waifuContract.methods.isNameReserved(name).call();
  };

  getWETOwner = async (index: number) => {
    const waifuContract = await this.getWaifuContract();
    return waifuContract.methods.ownerOf(index).call();
  };

  getWaifus = async () => {
    const waifus: Waifu[] = [];

    const t = await this.accoomulate();
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
