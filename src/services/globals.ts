const TEST_MODE = false;

type Globals = {
  WAIFU_VERSION: string;
  WAIFU_CONTRACT_ADDRESS: string;
  WET_CONTRACT_ADDRESS: string;
  ACCOOMULATOR_CONTRACT_ADDRESS: string;
  DUNGEON_CONTRACT_ADDRESS: string;
  NFTX_WRAPPER: string;
  STARTING_INDEX: number;
  TOTAL_WAIFUS: number;
  BUY_PRICE: string;
  CURRENCY: string;
  IMAGE_API: string;
  WAIFU_API: string;
};

const waifuVersion =
  typeof window !== "undefined" &&
  window.location.hostname === "waifusionbsc.sexy"
    ? "bsc"
    : "eth";

const GLOBALS: Globals = {
  WAIFU_VERSION: waifuVersion,
  WAIFU_CONTRACT_ADDRESS: TEST_MODE
    ? "0xdb5b6d8058a8B3514c603B997Ee1810cD788ddeE"
    : "0x2216d47494E516d8206B70FCa8585820eD3C4946",
  WET_CONTRACT_ADDRESS: TEST_MODE
    ? "0x38047BF7642f7fcD13ff53316AE2b698c8dE243C"
    : "0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2",
  ACCOOMULATOR_CONTRACT_ADDRESS: TEST_MODE
    ? "0x8b086258BA3d4Cf5eebE628c5Ad82AC6A0320A87"
    : waifuVersion === "eth"
    ? "0x5cEB3ec62f8151628a6A645da52F0ba7e6d6de26"
    : "0xe21580d17708b29455a42602B3A964B9a1BFBCCa",
  DUNGEON_CONTRACT_ADDRESS: TEST_MODE
    ? "0xfFA01A6F5c530157a2e639798F93D44009AA069a"
    : waifuVersion === "eth"
    ? "0xB291984262259BcFe6Aa02b66a06e9769C5c1eF3"
    : "0x21d2cf043937dcbaeff1feff75776f526b0c83d9",
  NFTX_WRAPPER: TEST_MODE
    ? "0x2966F786133f39e1b75c57Ce17eB1B32335ea560"
    : "0xa862351f459ec386aa23e752d5435d268de2ef04",
  STARTING_INDEX: waifuVersion === "eth" ? 11595 : 11936,
  TOTAL_WAIFUS: 16384,
  BUY_PRICE: TEST_MODE ? "0.07" : waifuVersion === "eth" ? "0.7" : "1.8",
  CURRENCY: waifuVersion === "eth" ? "ETH" : "BNB",
  IMAGE_API:
    waifuVersion === "eth"
      ? "https://global-harem.waifusion.sexy/v1/ETH_WAIFU/"
      : "https://global-harem.waifusion.sexy/v1/BSC_WAIFU/",
  WAIFU_API: waifuVersion === "eth" ? "waifus/" : "waifus/bsc/",
};

export default GLOBALS;
