const TEST_MODE = true;

type Globals = {
  WAIFU_VERSION: string;
  WALLET_TYPE_WALLETCONNECT: string;
  WALLET_TYPE_METAMASK: string;
  WAIFU_CONTRACT_ADDRESS: string;
  WET_CONTRACT_ADDRESS: string;
  ACCOOMULATOR_CONTRACT_ADDRESS: string;
  DUNGEON_CONTRACT_ADDRESS: string;
  NFTX_WRAPPER: string;
  INFURA_API: string;
  STARTING_INDEX: number;
  TOTAL_WAIFUS: number;
  NAME_CHANGE_PRICE: number;
  APPROVE_AMOUNT: string;
  BUY_PRICE: string;
  CURRENCY: string;
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
    : waifuVersion === "eth"
    ? "0xa862351f459ec386aa23e752d5435d268de2ef04"
    : "",
  INFURA_API:
    waifuVersion === "bsc"
      ? "https://bsc-dataseed.binance.org/"
      : `https://mainnet.infura.io/v3/b732460c3da849bca6067e7bb72f4bee`,
  STARTING_INDEX: waifuVersion === "eth" ? 11595 : 11936,
  TOTAL_WAIFUS: 16384,
  NAME_CHANGE_PRICE: 1830000000000000000000,
  APPROVE_AMOUNT: "16470000000000000000000",
  BUY_PRICE: TEST_MODE ? "0.07" : waifuVersion === "eth" ? "0.7" : "1.8",
  CURRENCY: waifuVersion === "eth" ? "ETH" : "BNB",
};

export default GLOBALS;
