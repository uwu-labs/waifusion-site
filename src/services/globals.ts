const TEST_MODE = false;

type Globals = {
  WAIFU_VERSION: string;
  WALLET_TYPE_WALLETCONNECT: string;
  WALLET_TYPE_METAMASK: string;
  WAIFU_CONTRACT_ADDRESS: string;
  WET_CONTRACT_ADDRESS: string;
  ACCOOMULATOR_CONTRACT_ADDRESS: string;
  DUNGEON_CONTRACT_ADDRESS: string;
  INFURA_API: string;
  STARTING_INDEX: number;
  TOTAL_WAIFUS: number;
  NAME_CHANGE_PRICE: number;
  APPROVE_AMOUNT: string;
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
  WALLET_TYPE_WALLETCONNECT: "walletconnect",
  WALLET_TYPE_METAMASK: "metamask",
  WAIFU_CONTRACT_ADDRESS: TEST_MODE
    ? "0xe6a4b81DB7d82d91820f7BB4f63855cBb25139bc"
    : "0x2216d47494E516d8206B70FCa8585820eD3C4946",
  WET_CONTRACT_ADDRESS: TEST_MODE
    ? "0x24884ED967c1B9A33e384f67E185e81afEEFaD55"
    : "0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2",
  ACCOOMULATOR_CONTRACT_ADDRESS: TEST_MODE
    ? "0xA7db262AAf709d1fAC767dB099E9b23ACCD5793C"
    : waifuVersion === "eth"
    ? "0x5cEB3ec62f8151628a6A645da52F0ba7e6d6de26"
    : "0xe21580d17708b29455a42602B3A964B9a1BFBCCa",
  DUNGEON_CONTRACT_ADDRESS: TEST_MODE
    ? "0x18f921e62E7196Fddf5CDE1e8df53fE16FfECC19"
    : waifuVersion === "eth"
    ? "0xB291984262259BcFe6Aa02b66a06e9769C5c1eF3"
    : "0x21d2cf043937dcbaeff1feff75776f526b0c83d9",
  INFURA_API:
    waifuVersion === "bsc"
      ? "https://bsc-dataseed.binance.org/"
      : `https://mainnet.infura.io/v3/b732460c3da849bca6067e7bb72f4bee`,
  STARTING_INDEX: waifuVersion === "eth" ? 11595 : 11936,
  TOTAL_WAIFUS: 16384,
  NAME_CHANGE_PRICE: 1830000000000000000000,
  APPROVE_AMOUNT: "16470000000000000000000",
  BUY_PRICE: waifuVersion === "eth" ? "0.7" : "1.8",
  CURRENCY: waifuVersion === "eth" ? "ETH" : "BNB",
  IMAGE_API:
    waifuVersion === "eth"
      ? "https://global-harem.waifusion.sexy/v1/ETH_WAIFU/"
      : "https://global-harem.waifusion.sexy/v1/BSC_WAIFU/",
  WAIFU_API: waifuVersion === "eth" ? "waifus/" : "waifus/bsc/",
};

export default GLOBALS;

// BSC Test Accomulator: 0x025A1e58A673CCb0f93985b07516850a195BFa38
