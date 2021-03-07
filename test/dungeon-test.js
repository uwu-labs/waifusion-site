const { expect } = require("chai");
const { ethers } = require("hardhat");
  
let ownerAddress, ownerAccount, ownerNFTId, ownerNFTId2, ownerNFTIdOthers;
let userAAccount, userAAddress;
let WaifuDungeon, waifuDungeon;
let WET_TOKEN, wet;
let WAIFUSION, waifusion;
let WAIFUSION2, waifusion2;
let waifusionOwner, waifusionOwnerSigner;

before(async () => {
  const accounts = await ethers.getSigners();
  [ ownerAccount, userAAccount ] = accounts;
  ownerAddress = await ownerAccount.getAddress();
  userAAddress = await userAAccount.getAddress();

  console.log(ownerAddress)
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
  // wet = await ethers.getContractAt("IERC20", WET_TOKEN);
  // deploy stablecoins to local blockchain emulator
  // wet = await testHelper.deployCoin(ethers, 'dai');
  // use deployed stablecoin address for collaterals
  // COLLATERAL = dai.address;
});

describe("Setup", function() {
  it("Should set the dungeon as waifusion owner", async function() {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [waifusionOwner]}
    )

    waifusionOwnerSigner = await ethers.provider.getSigner(waifusionOwner)
    let waifusionWithOwner = waifusion.connect(waifusionOwnerSigner);
    await waifusionWithOwner.transferOwnership(waifuDungeon.address);
    expect(await waifusion.owner()).to.equal(waifuDungeon.address);

    await hre.network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [waifusionOwner]}
    )
  });

  it("Should let a user buy 1 NFT and claim WET", async function() {
    expect((await wet.balanceOf(ownerAddress)).toString()).to.equal("0");
    await waifusion.mintNFT(1, {value: ethers.utils.parseEther("0.7")});
    expect(await waifusion.balanceOf(ownerAddress)).to.equal(1);
    ownerNFTId = await waifusion.totalSupply() - 1
    expect(await waifusion.ownerOf(ownerNFTId)).to.equal(ownerAddress);
    await wet.claim([ownerNFTId])
    expect((await wet.balanceOf(ownerAddress)).toString()).to.not.equal("0");
  })

  it("Should let a user buy 5 NFTs pt. 2", async function() {
    await waifusion2.mintNFT(5, {value: ethers.utils.parseEther("0.05")});
    expect(await waifusion2.balanceOf(ownerAddress)).to.equal(5);
    ownerNFTId2 = await waifusion2.totalSupply() - 5
    expect(await waifusion2.ownerOf(ownerNFTId2)).to.equal(ownerAddress);
    expect(await waifusion2.ownerOf(ownerNFTId2 + 1)).to.equal(ownerAddress);
  })

  it("Should let a user buy 10 NFTs pt. 2", async function() {
    let tx = await waifusion.mintNFT(10, {value: ethers.utils.parseEther("7")});
    let receipt = await tx.wait();
    let waifus = [];
    for (let i = 0; i < receipt.logs.length; i++) {
      let log = receipt.logs[i];
      waifus.push(ethers.BigNumber.from(log.topics[3]).toNumber())
    }

    expect(await waifusion.balanceOf(ownerAddress)).to.equal(waifus.length + 1);
    ownerNFTIdOthers = waifus;
    for (let i = 0; i < waifus.length; i++) {
      expect(await waifusion.ownerOf(waifus[i])).to.equal(ownerAddress);
    }
    await wet.claim(ownerNFTIdOthers)
    expect((await wet.balanceOf(ownerAddress)).toString()).to.not.equal(0);
  })
});

describe("WaifuDungeon", function() {
  it("Should set the deployer as owner", async function() {
    expect(await waifuDungeon.owner()).to.equal(ownerAddress);
    expect(await wet.allowance(waifuDungeon.address, WAIFUSION)).to.equal("115792089237316195423570985008687907853269984665640564039457584007913129639935");
  });

  it("Should not let anyone funnel waifus", async function() {
    let userADungeon = waifuDungeon.connect(userAAccount);
    await expect(userADungeon.funnelMaxWaifus()).to.be.revertedWith("revert Ownable: caller is not the owner")
  });

  it("Should not let anyone arbitrarily send waifus into the dungeon", async function() {
    let safeTransferFrom = waifusion["safeTransferFrom(address,address,uint256)"]
    await expect(safeTransferFrom(ownerAddress, WAIFUSION, ownerNFTId)).to.be.revertedWith("revert ERC721: transfer to non ERC721Receiver implementer")
  });

  it("Should let owner funnel max waifus", async function() {
    await waifuDungeon.funnelMaxWaifus()
    expect(await waifusion.balanceOf(waifuDungeon.address)).to.equal(20);
  });

  it("Should let owner funnel 5 waifus", async function() {
    await waifuDungeon.funnelWaifus(5)
    expect(await waifusion.balanceOf(waifuDungeon.address)).to.equal(25);
  });

  it("Should let owner add 5 arbitrary NFTs", async function() {
    let waifusBefore = await waifuDungeon.waifuCount();
    await waifusion2.setApprovalForAll(waifuDungeon.address, true);
    let nftID = ownerNFTId2;
    for (let i = 0; i < 5; i++) {
      await waifuDungeon.addNFTToDungeon(waifusion2.address, nftID);
      expect(await waifusion2.ownerOf(nftID)).to.equal(waifuDungeon.address);
      nftID++;
    }
    let waifusAfter = await waifuDungeon.waifuCount();
    expect(waifusAfter).to.equal(waifusBefore.add(5));
  });

  it("Should not let me reveal without committing", async function() {
    let userADungeon = waifuDungeon.connect(userAAccount);
    await expect(userADungeon.revealWaifus()).to.be.revertedWith("revert WaifuMaidCafe: Need to commit")
  });

  it("increment block", async function() {
    await network.provider.send("evm_mine")
  })

  it("Should commit waifu for 0.7 eth", async function() {
    let userAContract = waifuDungeon.connect(userAAccount);
    await userAContract.commitBuyWaifus(1, {value: ethers.utils.parseEther("0.7")});
  });

  it("increment block", async function() {
    await network.provider.send("evm_mine")
    await network.provider.send("evm_mine")
    await network.provider.send("evm_mine")
    await network.provider.send("evm_mine")
  })

  it("Should reveal waifu next tx", async function() {
    let userADungeon = waifuDungeon.connect(userAAccount);
    let waifusBalanceBefore = await waifusion.balanceOf(userAAddress);
    let waifusBalance2Before = await waifusion2.balanceOf(userAAddress);
    let mappedBeforeBalance = {}
    mappedBeforeBalance[waifusion.address] = waifusBalanceBefore;
    mappedBeforeBalance[waifusion2.address] = waifusBalance2Before;

    let tx = await userADungeon.revealWaifus();
    let receipt = await tx.wait();
    let waifus = [];
    for (let i =0; i < receipt.logs.length; i += 2) {
      let log = receipt.logs[i];
      waifus.push({
        waifuID: ethers.BigNumber.from(log.topics[3]),
        nftContract: log.address,
      })
    }

    let waifusBalanceAfter = await waifusion.balanceOf(userAAddress);
    let waifusBalance2After = await waifusion2.balanceOf(userAAddress);
    let mappedAfterBalance = {}
    mappedAfterBalance[waifusion.address] = waifusBalanceAfter;
    mappedAfterBalance[waifusion2.address] = waifusBalance2After;

    for (let i = 0; i < waifus.length; i++) {
      let contractAddr = waifus[i].nftContract;
      let contract = await ethers.getContractAt("Waifus", contractAddr);
      expect(await contract.ownerOf(waifus[i].waifuID)).to.equal(userAAddress)
      expect(await contract.balanceOf(userAAddress)).to.equal(mappedAfterBalance[contractAddr])
      expect(mappedBeforeBalance[contractAddr].toNumber()).to.lessThan(mappedAfterBalance[contractAddr].toNumber())
    }
  });

  it("Should commit 5 waifus for 3.5 eth", async function() {
    await waifuDungeon.commitBuyWaifus(5, {value: ethers.utils.parseEther("3.5")});
  });

  it("increment block", async function() {
    await network.provider.send("evm_mine")
  })

  it("Should reveal 5 waifus next tx", async function() {
    let waifusBalanceBefore = await waifusion.balanceOf(ownerAddress);
    let waifusBalance2Before = await waifusion2.balanceOf(ownerAddress);
    let mappedBeforeBalance = {}
    mappedBeforeBalance[waifusion.address] = waifusBalanceBefore;
    mappedBeforeBalance[waifusion2.address] = waifusBalance2Before;

    let tx = await waifuDungeon.revealWaifus();
    let receipt = await tx.wait();
    let waifus = [];
    for (let i = 0; i < receipt.logs.length; i += 2) {
      let log = receipt.logs[i];
      waifus.push({
        waifuID: ethers.BigNumber.from(log.topics[3]),
        nftContract: log.address,
      })
    }

    let waifusBalanceAfter = await waifusion.balanceOf(ownerAddress);
    let waifusBalance2After = await waifusion2.balanceOf(ownerAddress);
    let mappedAfterBalance = {}
    mappedAfterBalance[waifusion.address] = waifusBalanceAfter;
    mappedAfterBalance[waifusion2.address] = waifusBalance2After;

    for (let i = 0; i < waifus.length; i++) {
      let contractAddr = waifus[i].nftContract;
      let contract = await ethers.getContractAt("Waifus", contractAddr);
      expect(await contract.ownerOf(waifus[i].waifuID)).to.equal(ownerAddress)
      expect(await contract.balanceOf(ownerAddress)).to.equal(mappedAfterBalance[contractAddr])
      expect(mappedBeforeBalance[contractAddr].toNumber()).to.lessThan(mappedAfterBalance[contractAddr].toNumber())
    }
  });

  it("increment block", async function() {
    await network.provider.send("evm_mine")
  })

  let waifusBalanceBeforeSwap;
  let waifusBalance2BeforeSwap;
  it("Should commit swap 1 waifus for 5490 WET", async function() {
    waifusBalanceBeforeSwap = await waifusion.balanceOf(ownerAddress);
    waifusBalance2BeforeSwap = await waifusion2.balanceOf(ownerAddress);
    await wet.approve(waifuDungeon.address, ethers.utils.parseEther("5490"));
    await waifusion.setApprovalForAll(waifuDungeon.address, true);
    expect(await waifusion.isApprovedForAll(ownerAddress, waifuDungeon.address)).to.equal(true)
    await waifuDungeon.commitSwapWaifus([ownerNFTId]);
  });

  it("increment block", async function() {
    await network.provider.send("evm_mine")
  })

  it("Should reveal 1 swapped waifu next tx", async function() {
    let mappedBeforeBalance = {}
    mappedBeforeBalance[waifusion.address] = waifusBalanceBeforeSwap;
    mappedBeforeBalance[waifusion2.address] = waifusBalance2BeforeSwap;

    let tx = await waifuDungeon.revealWaifus();
    let receipt = await tx.wait();
    let waifus = [];
    for (let i =0; i < receipt.logs.length; i += 2) {
      let log = receipt.logs[i];
      waifus.push({
        waifuID: ethers.BigNumber.from(log.topics[3]),
        nftContract: log.address,
      })
    }

    let waifusBalanceAfter = await waifusion.balanceOf(ownerAddress);
    let waifusBalance2After = await waifusion2.balanceOf(ownerAddress);
    let mappedAfterBalance = {}
    mappedAfterBalance[waifusion.address] = waifusBalanceAfter;
    mappedAfterBalance[waifusion2.address] = waifusBalance2After;

    for (let i = 0; i < waifus.length; i++) {
      let contractAddr = waifus[i].nftContract;
      let contract = await ethers.getContractAt("Waifus", contractAddr);
      expect(await contract.ownerOf(waifus[i].waifuID)).to.equal(ownerAddress)
      expect(await contract.balanceOf(ownerAddress)).to.equal(mappedAfterBalance[contractAddr])
    }
    let before = mappedBeforeBalance[waifusion.address].toNumber() + mappedBeforeBalance[waifusion2.address].toNumber();
    let after = mappedAfterBalance[waifusion.address].toNumber() + mappedAfterBalance[waifusion2.address].toNumber();
    expect(before).to.equal(after)
  });

  it("increment block", async function() {
    await network.provider.send("evm_mine")
  })

  it("Should commit swap 2 waifus for 10980 WET", async function() {
    waifusBalanceBeforeSwap = await waifusion.balanceOf(ownerAddress);
    waifusBalance2BeforeSwap = await waifusion2.balanceOf(ownerAddress);
    await wet.approve(waifuDungeon.address, ethers.utils.parseEther("10980"));
    await waifusion.setApprovalForAll(waifuDungeon.address, true);
    expect(await waifusion.isApprovedForAll(ownerAddress, waifuDungeon.address)).to.equal(true)
    await waifuDungeon.commitSwapWaifus([ownerNFTIdOthers[0], ownerNFTIdOthers[1]]);
  });

  it("increment block", async function() {
    await network.provider.send("evm_mine")
  })

  it("Should reveal 2 swapped waifus next tx", async function() {
    let mappedBeforeBalance = {}
    mappedBeforeBalance[waifusion.address] = waifusBalanceBeforeSwap;
    mappedBeforeBalance[waifusion2.address] = waifusBalance2BeforeSwap;

    let tx = await waifuDungeon.revealWaifus();
    let receipt = await tx.wait();
    let waifus = [];
    for (let i = 0; i < receipt.logs.length; i += 2) {
      let log = receipt.logs[i];
      waifus.push({
        waifuID: ethers.BigNumber.from(log.topics[3]),
        nftContract: log.address,
      })
    }

    let waifusBalanceAfter = await waifusion.balanceOf(ownerAddress);
    let waifusBalance2After = await waifusion2.balanceOf(ownerAddress);
    let mappedAfterBalance = {}
    mappedAfterBalance[waifusion.address] = waifusBalanceAfter;
    mappedAfterBalance[waifusion2.address] = waifusBalance2After;

    for (let i = 0; i < waifus.length; i++) {
      let contractAddr = waifus[i].nftContract;
      let contract = await ethers.getContractAt("Waifus", contractAddr);
      expect(await contract.ownerOf(waifus[i].waifuID)).to.equal(ownerAddress)
      expect(await contract.balanceOf(ownerAddress)).to.equal(mappedAfterBalance[contractAddr])
    }
    let before = mappedBeforeBalance[waifusion.address].toNumber() + mappedBeforeBalance[waifusion2.address].toNumber();
    let after = mappedAfterBalance[waifusion.address].toNumber() + mappedAfterBalance[waifusion2.address].toNumber();
    expect(before).to.equal(after)
  });
});
