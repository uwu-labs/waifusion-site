import BN from "bn.js";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

import uwuMintAbi from "../contracts/uwucrewWaveLockSaleWithMint.json";
import uwuMintBscAbi from "../contracts/uwucrewBSCWetSale.json";
import { ContractHelper } from "./contract";
import { getGlobals, Network } from "./globals";

export const getAddress = async (): Promise<string> => {
  if ((window as any).ethereum) {
    (window as any).web3 = new Web3((window as any).ethereum);
    (window as any).ethereum.enable();
    const addressList = await (window as any).web3.eth.getAccounts();
    return addressList[0];
  }
  return "";
};

export const getUwuMintContract = async (
  uwuMintContract: string
): Promise<Contract> => {
  const address = await getAddress();
  const globals = await getGlobals();
  return new (window as any).web3.eth.Contract(
    globals.network === Network.BSC ? uwuMintBscAbi : uwuMintAbi,
    uwuMintContract,
    {
      from: address,
    }
  );
};

export const getUwuSwapPrice = async (
  uwuMintContract: string
): Promise<string> => {
  const globals = await getGlobals();
  const contract = await getUwuMintContract(uwuMintContract);
  let weiPrice;
  if (globals.network === Network.BSC)
    weiPrice = await contract.methods.buyPrice().call();
  else weiPrice = await contract.methods.swapPrice().call();
  return Web3.utils.fromWei(weiPrice);
};

export const getTicketBalance = async (
  uwuMintContract: string
): Promise<number> => {
  const address = await getAddress();
  const contract = await getUwuMintContract(uwuMintContract);
  return contract.methods.balance(address).call();
};

export const isWetApproved = async (uwuMint: string): Promise<boolean> => {
  const address = await getAddress();
  const contractHelper = new ContractHelper();
  await contractHelper.init();
  const wet = await contractHelper.getWetContract();
  const allowance = await wet.methods.allowance(address, uwuMint).call();
  return new BN(allowance).gt(new BN("9999999999999999999999999"));
};

export const isWaifusApproved = async (
  uwuMintContract: string
): Promise<boolean> => {
  const address = await getAddress();
  const contractHelper = new ContractHelper();
  await contractHelper.init();
  const waifus = await contractHelper.getWaifuContract();
  return waifus.methods.isApprovedForAll(address, uwuMintContract).call();
};
