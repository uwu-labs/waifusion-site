const { expect } = require("chai");
const { ethers } = require("hardhat");
  
let ownerAddress, ownerAccount, userAAccount, userAAddress;
let WaifuDungeon, waifuDungeon;
let WET_TOKEN, wet;
let WAIFUSION, waifusion;

before(async () => {
  const accounts = await ethers.getSigners();
  [ ownerAccount, userAAccount ] = accounts;
  ownerAddress = await ownerAccount.getAddress();
  userAAddress = await userAAccount.getAddress();

  // get main contracts
  WaifuDungeon = await ethers.getContractFactory('WaifuDungeon');

  waifuDungeon = await WaifuDungeon.deploy();
  await waifuDungeon.deployed();

  WET_TOKEN = await waifuDungeon.WET_TOKEN()
  wet = await ethers.getContractAt("IERC20", WET_TOKEN);
  WAIFUSION = await waifuDungeon.WAIFUSION()
  // wet = await ethers.getContractAt("IERC20", WET_TOKEN);
  // deploy stablecoins to local blockchain emulator
  // wet = await testHelper.deployCoin(ethers, 'dai');
  // use deployed stablecoin address for collaterals
  // COLLATERAL = dai.address;
});

describe("WaifuDungeon", function() {
  it("Should set the deployer as owner", async function() {
    expect(await waifuDungeon.owner()).to.equal(ownerAddress);
    expect(await wet.allowance(waifuDungeon.address, WAIFUSION)).to.equal("115792089237316195423570985008687907853269984665640564039457584007913129639935");
  });
});
