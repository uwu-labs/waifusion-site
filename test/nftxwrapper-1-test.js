const { expect } = require("chai");
const { ethers } = require("hardhat");

var ownerAddress, ownerAccount, ownerNFTId, ownerNFTId2, ownerNFTIdOthers;
var userAAccount, userAAddress;
var userBAccount, userBAddress;
var userCAccount, userCAddress;
var WaifuDungeon, waifuDungeon;
var WET_TOKEN, wet;
var NFTX_WRAPPER, nftxWrapper;
let nftxTokenOwner = "0x50664ede715e131f584d3e7eaabd7818bb20a068";
let nftxTokenOwnerSigner;
let xToken;
var WAIFUSION, waifusion;
var WAIFUSION2, waifusion2;
var waifusionOwner, waifusionOwnerSigner;

describe("Setup", function () {
  before(async () => {
    await network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          jsonRpcUrl: "https://eth-mainnet.alchemyapi.io/v2/RMvI_78sarzOxWrBf2Ujh5oqVX-EeWNa",
          blockNumber: 12032074
        }
      }]
    })
    const accounts = await ethers.getSigners();
    [ownerAccount, userAAccount, userBAccount, userCAccount] = accounts;
    ownerAddress = await ownerAccount.getAddress();
    userAAddress = await userAAccount.getAddress();
    userBAddress = await userBAccount.getAddress();
    userCAddress = await userCAccount.getAddress();

    // get main contracts
    WaifuDungeon = await ethers.getContractFactory('WaifuDungeon');
    waifuDungeon = await WaifuDungeon.deploy();
    await waifuDungeon.deployed();

    WET_TOKEN = await waifuDungeon.WET_TOKEN()
    wet = await ethers.getContractAt("contracts/token/IERC20.sol:IERC20", WET_TOKEN);

    WAIFUSION = await waifuDungeon.WAIFUSION()
    waifusion = await ethers.getContractAt("Waifus", WAIFUSION);

    let waifusion2Factory = await ethers.getContractFactory("Waifus");
    waifusion2 = await waifusion2Factory.deploy("dummy", "dummy", WET_TOKEN);
    console.log(waifusion2.address)
    waifusionOwner = await waifusion.owner();

    NFTX_WRAPPER = await ethers.getContractFactory('NFTXDungeonWrapper');
    nftxWrapper = await NFTX_WRAPPER.deploy();
    await nftxWrapper.deployed();

    let xTokenAddr = await nftxWrapper.xToken();
    xToken = await ethers.getContractAt("contracts/token/IERC20.sol:IERC20", xTokenAddr)
  });

  it("Should create a wrapper for a user", async function () {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [nftxTokenOwner]
    })

    nftxTokenOwnerSigner = await ethers.provider.getSigner(nftxTokenOwner)
    let wrapperWithNFTOwner = nftxWrapper.connect(nftxTokenOwnerSigner);
    let wrapperAddr = await wrapperWithNFTOwner.userWrapperAddr(nftxTokenOwner);
    await wrapperWithNFTOwner.checkChild();
  });

  it("Should allow using NFTX to burn waifus", async function() {
    let wrapperWithNFTOwner = nftxWrapper.connect(nftxTokenOwnerSigner);
    let wrapperAddr = await wrapperWithNFTOwner.userWrapperAddr(nftxTokenOwner);
    let xTokenWithOwner = xToken.connect(nftxTokenOwnerSigner);
    await xTokenWithOwner.approve(wrapperAddr, "99999999999999999999999999999");
    await wrapperWithNFTOwner.commitWaifusWithNFTX(3);
  })
});
