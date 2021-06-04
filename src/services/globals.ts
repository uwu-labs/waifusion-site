import { getNetwork } from "./web3";

export enum Network {
  ETH,
  TEST,
  BSC,
}

export type GlobalsData = {
  network: Network;
  waifuAddress: string;
  wetAddress: string;
  accoomulatorAddress: string;
  dungeonAddress: string;
  wrapperAddress: string;
  nftxAddress: string;
  farmAddress: string;
  startingIndex: number;
  currency: string;
  imageApi: string;
  waifuApi: string;
  wetTradeLink: string;
  wetLpLink: string;
  waifuTradeLink: string;
};

export const TEST_GLOBALS: GlobalsData = {
  network: Network.TEST,
  waifuAddress: "0xdb5b6d8058a8B3514c603B997Ee1810cD788ddeE",
  wetAddress: "0x38047BF7642f7fcD13ff53316AE2b698c8dE243C",
  accoomulatorAddress: "0x496099939A7a384b80c8380c4Cc36132fE8970aD",
  dungeonAddress: "0xfFA01A6F5c530157a2e639798F93D44009AA069a",
  wrapperAddress: "0x2966F786133f39e1b75c57Ce17eB1B32335ea560",
  nftxAddress: "0x245f0dd9142c5b3d52373127ee2fe3a87080ad06",
  farmAddress: "0xd8c0e08b3843393a7c698d47b532c9af0086e78f",
  startingIndex: 11595,
  currency: "ETH",
  imageApi: "https://global-harem.waifusion.sexy/v1/ETH_WAIFU/",
  waifuApi: "waifus/",
  wetTradeLink:
    "https://app.sushi.com/swap?inputCurrency=eth&outputCurrency=0x76280af9d18a868a0af3dca95b57dde816c1aaf2",
  wetLpLink:
    "https://app.sushi.com/add/ETH/0x76280af9d18a868a0af3dca95b57dde816c1aaf2",
  waifuTradeLink: "https://opensea.io/assets/waifusion",
};

export const ETH_GLOBALS: GlobalsData = {
  network: Network.ETH,
  waifuAddress: "0x2216d47494E516d8206B70FCa8585820eD3C4946",
  wetAddress: "0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2",
  accoomulatorAddress: "0x5cEB3ec62f8151628a6A645da52F0ba7e6d6de26",
  dungeonAddress: "0xB291984262259BcFe6Aa02b66a06e9769C5c1eF3",
  wrapperAddress: "0x0dc79a38f2fDFD6df40F69d9784d2a869b58A137",
  nftxAddress: "0x0F10E6ec76346c2362897BFe948c8011BB72880F",
  farmAddress: "",
  startingIndex: 11595,
  currency: "ETH",
  imageApi: "https://global-harem.waifusion.sexy/v1/ETH_WAIFU/",
  waifuApi: "waifus/",
  wetTradeLink:
    "https://info.uniswap.org/#/pools/0xbf190af824a0f79838ae79df738e4086a084a057",
  wetLpLink:
    "https://info.uniswap.org/#/pools/0xbf190af824a0f79838ae79df738e4086a084a057",
  waifuTradeLink: "https://opensea.io/assets/waifusion",
};

export const BSC_GLOBALS: GlobalsData = {
  network: Network.BSC,
  waifuAddress: "0x2216d47494E516d8206B70FCa8585820eD3C4946",
  wetAddress: "0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2",
  accoomulatorAddress: "0xe21580d17708b29455a42602B3A964B9a1BFBCCa",
  dungeonAddress: "0x21d2cf043937dcbaeff1feff75776f526b0c83d9",
  wrapperAddress: "",
  nftxAddress: "",
  farmAddress: "0x95ce780b7cc5329f2b6f52004b688b2dc3b50e91",
  startingIndex: 11936,
  currency: "BNB",
  imageApi: "https://global-harem.waifusion.sexy/v1/BSC_WAIFU/",
  waifuApi: "waifus/bsc/",
  wetTradeLink:
    "https://exchange.pancakeswap.finance/#/swap?inputCurrency=bnb&outputCurrency=0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2",
  wetLpLink:
    "https://exchange.pancakeswap.finance/#/add/BNB/0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2",
  waifuTradeLink: "https://nftkey.app/collections/waifusion/bsc/",
};

export const getGlobals = async (): Promise<GlobalsData> => {
  const networkId = await getNetwork();
  if (networkId === 1) return ETH_GLOBALS;
  if (networkId === 4 || networkId === 5) return TEST_GLOBALS;
  return BSC_GLOBALS;
};
