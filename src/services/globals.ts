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
  nftxAddress: string;
  startingIndex: number;
  buyPrice: string;
  currency: string;
  imageApi: string;
  waifuApi: string;
  wetTradeLink: string;
};

export const TEST_GLOBALS: GlobalsData = {
  network: Network.TEST,
  waifuAddress: "0xdb5b6d8058a8B3514c603B997Ee1810cD788ddeE",
  wetAddress: "0x38047BF7642f7fcD13ff53316AE2b698c8dE243C",
  accoomulatorAddress: "0x496099939A7a384b80c8380c4Cc36132fE8970aD",
  dungeonAddress: "0xfFA01A6F5c530157a2e639798F93D44009AA069a",
  nftxAddress: "0x2966F786133f39e1b75c57Ce17eB1B32335ea560",
  startingIndex: 11595,
  buyPrice: "0.07",
  currency: "ETH",
  imageApi: "https://global-harem.waifusion.sexy/v1/ETH_WAIFU/",
  waifuApi: "waifus/",
  wetTradeLink:
    "https://app.sushi.com/swap?inputCurrency=eth&outputCurrency=0x76280af9d18a868a0af3dca95b57dde816c1aaf2",
};

export const ETH_GLOBALS: GlobalsData = {
  network: Network.ETH,
  waifuAddress: "0x2216d47494E516d8206B70FCa8585820eD3C4946",
  wetAddress: "0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2",
  accoomulatorAddress: "0x5cEB3ec62f8151628a6A645da52F0ba7e6d6de26",
  dungeonAddress: "0xB291984262259BcFe6Aa02b66a06e9769C5c1eF3",
  nftxAddress: "0xa862351f459ec386aa23e752d5435d268de2ef04",
  startingIndex: 11595,
  buyPrice: "0.7",
  currency: "ETH",
  imageApi: "https://global-harem.waifusion.sexy/v1/ETH_WAIFU/",
  waifuApi: "waifus/",
  wetTradeLink:
    "https://app.sushi.com/swap?inputCurrency=eth&outputCurrency=0x76280af9d18a868a0af3dca95b57dde816c1aaf2",
};

export const BSC_GLOBALS: GlobalsData = {
  network: Network.BSC,
  waifuAddress: "0x2216d47494E516d8206B70FCa8585820eD3C4946",
  wetAddress: "0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2",
  accoomulatorAddress: "0xe21580d17708b29455a42602B3A964B9a1BFBCCa",
  dungeonAddress: "0x21d2cf043937dcbaeff1feff75776f526b0c83d9",
  nftxAddress: "0xa862351f459ec386aa23e752d5435d268de2ef04",
  startingIndex: 11936,
  buyPrice: "1.8",
  currency: "BNB",
  imageApi: "https://global-harem.waifusion.sexy/v1/BSC_WAIFU/",
  waifuApi: "waifus/bsc/",
  wetTradeLink:
    "https://exchange.pancakeswap.finance/#/swap?inputCurrency=bnb&outputCurrency=0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2",
};

export const getGlobals = async (): Promise<GlobalsData> => {
  const networkId = await getNetwork();
  if (networkId === 1) return ETH_GLOBALS;
  if (networkId === 4) return TEST_GLOBALS;
  return BSC_GLOBALS;
};
