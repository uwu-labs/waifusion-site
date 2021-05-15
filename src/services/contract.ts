import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import BN from "bn.js";
import { toEthUnit } from "./web3";

import waifuAbi from "../contracts/ERC721.json";
import erc20Abi from "../contracts/ERC20.json";
import accomulatorAbi from "../contracts/Accoomulator.json";
import dungeonAbi from "../contracts/Dungeon.json";
import dungeonBscAbi from "../contracts/DungeonBSC.json";
import wrapperAbi from "../contracts/NFTXWrapper.json";
import farmAbi from "../contracts/Farm.json";

import { Waifu } from "../types/waifusion";
import { getGlobals, GlobalsData, Network } from "./globals";

export type AccoomulateWaifu = {
  wetAccumulate: string;
  tokenId: number;
  name: string;
  accumulatedWETNumber: number;
};

export const getAddress = async (): Promise<string> => {
  if ((window as any).ethereum) {
    (window as any).web3 = new Web3((window as any).ethereum);
    (window as any).ethereum.enable();
    const addressList = await (window as any).web3.eth.getAccounts();
    return addressList[0];
  }
  return "";
};

export class ContractHelper {
  address: string;

  globals: GlobalsData | undefined;

  constructor() {
    this.address = "";
  }

  init = async (): Promise<void> => {
    this.address = await getAddress();

    const _globals = await getGlobals();
    this.globals = _globals;
  };

  // Contracts
  getDungeonContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      this.globals?.network === Network.BSC ? dungeonBscAbi : dungeonAbi,
      this.globals?.dungeonAddress,
      {
        from: this.address,
      }
    );
  };

  getWaifuContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      waifuAbi,
      this.globals?.waifuAddress,
      {
        from: this.address,
      }
    );
  };

  getWetContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      erc20Abi,
      this.globals?.wetAddress,
      {
        from: this.address,
      }
    );
  };

  getNftxContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      erc20Abi,
      this.globals?.nftxAddress,
      {
        from: this.address,
      }
    );
  };

  getWrapperContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      wrapperAbi,
      this.globals?.wrapperAddress,
      {
        from: this.address,
      }
    );
  };

  getAccoomulateContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      accomulatorAbi,
      this.globals?.accoomulatorAddress,
      {
        from: this.address,
      }
    );
  };

  getFarmContract = async (): Promise<Contract> => {
    return new (window as any).web3.eth.Contract(
      farmAbi,
      this.globals?.farmAddress,
      {
        from: this.address,
      }
    );
  };

  getLpContract = async (): Promise<Contract> => {
    const farmContract = await this.getFarmContract();
    const lpAddress = await farmContract.methods.stakingToken().call();
    return new (window as any).web3.eth.Contract(erc20Abi, lpAddress, {
      from: this.address,
    });
  };

  getRewardContract = async (): Promise<Contract> => {
    const farmContract = await this.getFarmContract();
    const rewardToken = await farmContract.methods.rewardToken().call();
    return new (window as any).web3.eth.Contract(erc20Abi, rewardToken, {
      from: this.address,
    });
  };

  // Functions
  getRewardTicker = async (): Promise<string> => {
    const rewardContract = await this.getRewardContract();
    return rewardContract.methods.symbol().call();
  };

  getUserWrapperAddress = async (): Promise<string> => {
    const wrapperContract = await this.getWrapperContract();
    return wrapperContract.methods.userWrapperAddr(this.address).call();
  };

  isWaifuApprovedForDungeon = async (): Promise<boolean> => {
    const waifuContract = await this.getWaifuContract();
    const approvedForAll = await waifuContract.methods
      .isApprovedForAll(this.address, this.globals?.dungeonAddress)
      .call();
    return approvedForAll;
  };

  isWetApprovedForDungeon = async (): Promise<boolean> => {
    const dungeonAllowance = await this.getDungeonAllowance();
    return new BN(dungeonAllowance).gt(new BN("9999999999999999999999999"));
  };

  isLpApprovedForFarm = async (): Promise<boolean> => {
    const lpContract = await this.getLpContract();
    const allowance = await lpContract.methods
      .allowance(this.address, this.globals?.farmAddress)
      .call();
    return new BN(allowance).gt(new BN("9999999999999999999999999"));
  };

  isWetApprovedForWrapper = async (): Promise<boolean> => {
    const wetContract = await this.getWetContract();
    const userWrapperAddress = await this.getUserWrapperAddress();
    const allowance = await wetContract.methods
      .allowance(this.address, userWrapperAddress)
      .call();
    return new BN(allowance).gt(new BN("9999999999999999999999999"));
  };

  isNftxApprovedForWrapper = async (): Promise<boolean> => {
    const nftxContract = await this.getNftxContract();
    const userWrapperAddress = await this.getUserWrapperAddress();
    const allowance = await nftxContract.methods
      .allowance(this.address, userWrapperAddress)
      .call();
    return new BN(allowance).gt(new BN("9999999999999999999999999"));
  };

  getDungeonAllowance = async (): Promise<number> => {
    const wetContract = await this.getWetContract();
    const currentAllowance = await wetContract.methods
      .allowance(this.address, this.globals?.dungeonAddress)
      .call();
    return currentAllowance;
  };

  blockNumber = async (): Promise<number> => {
    return (window as any).web3.eth.getBlockNumber();
  };

  revealPending = async (): Promise<boolean> => {
    const dungeonContract = await this.getDungeonContract();
    const commits = await dungeonContract.methods.commits(this.address).call();
    const commitBlock = Number(commits.block);
    const blockNumber = Number(await this.blockNumber());
    const pending = commitBlock + 256 > blockNumber;
    return pending;
  };

  getAllowance = async (): Promise<number> => {
    const wetContract = await this.getWetContract();
    const currentAllowance = await wetContract.methods
      .allowance(this.address, this.globals?.waifuAddress)
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

    const tokens = await this.accoomulateOfAddress(address);
    tokens.forEach((token: any) => {
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

  // Views
  getBuyPrice = async (): Promise<string> => {
    const dungeonContract = await this.getDungeonContract();
    return toEthUnit(await dungeonContract.methods.buyCost().call());
  };

  getWetBurnPrice = async (): Promise<string> => {
    const contract = await this.getDungeonContract();
    if (this.globals?.network !== Network.BSC)
      return toEthUnit(await contract.methods.swapCost().call());
    return toEthUnit(await contract.methods.swapWETCost().call());
  };

  getBnbBurnPrice = async (): Promise<string> => {
    const contract = await this.getDungeonContract();
    if (this.globals?.network !== Network.BSC) return "";
    return toEthUnit(await contract.methods.swapETHCost().call());
  };

  getApr = async (): Promise<number> => {
    const farmContract = await this.getFarmContract();
    const lpAddress = await farmContract.methods.stakingToken().call();
    const lpContract = await this.getLpContract();
    const balance = await window.web3.eth.getBalance(lpAddress);
    console.log(balance);
    return Number(balance);
  };
}
