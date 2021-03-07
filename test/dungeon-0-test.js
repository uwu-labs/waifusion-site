const { expect } = require("chai");
const { ethers } = require("hardhat");

var ownerAddress, ownerAccount, ownerNFTId, ownerNFTId2, ownerNFTIdOthers;
var userAAccount, userAAddress;
var userBAccount, userBAddress;
var userCAccount, userCAddress;
var WaifuDungeon, waifuDungeon;
var WET_TOKEN, wet;
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
          blockNumber: 11981299
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
    // wet = await ethers.getContractAt("IERC20", WET_TOKEN);
    // deploy stablecoins to local blockchain emulator
    // wet = await testHelper.deployCoin(ethers, 'dai');
    // use deployed stablecoin address for collaterals
    // COLLATERAL = dai.address;
  });

  it("Should set the dungeon as waifusion owner", async function () {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [waifusionOwner]
    })

    waifusionOwnerSigner = await ethers.provider.getSigner(waifusionOwner)
    let waifusionWithOwner = waifusion.connect(waifusionOwnerSigner);
    await waifusionWithOwner.transferOwnership(waifuDungeon.address);
    expect(await waifusion.owner()).to.equal(waifuDungeon.address);

    await hre.network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [waifusionOwner]
    }
    )
  });

  it("Should let a user buy 1 NFT and claim WET", async function () {
    expect((await wet.balanceOf(ownerAddress)).toString()).to.equal("0");
    await waifusion.mintNFT(1, { value: ethers.utils.parseEther("0.7") });
    expect(await waifusion.balanceOf(ownerAddress)).to.equal(1);
    ownerNFTId = await waifusion.totalSupply() - 1
    expect(await waifusion.ownerOf(ownerNFTId)).to.equal(ownerAddress);
    await wet.claim([ownerNFTId])
    expect((await wet.balanceOf(ownerAddress)).toString()).to.not.equal("0");
  })

  it("Should let a user buy 5 NFTs pt. 2", async function () {
    await waifusion2.mintNFT(5, { value: ethers.utils.parseEther("0.05") });
    expect(await waifusion2.balanceOf(ownerAddress)).to.equal(5);
    ownerNFTId2 = await waifusion2.totalSupply() - 5
    expect(await waifusion2.ownerOf(ownerNFTId2)).to.equal(ownerAddress);
    expect(await waifusion2.ownerOf(ownerNFTId2 + 1)).to.equal(ownerAddress);
  })

  it("Should let a user buy 10 NFTs", async function () {
    let tx = await waifusion.mintNFT(10, { value: ethers.utils.parseEther("7") });
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

describe("WaifuDungeon", function () {
  it("Should set the deployer as owner", async function () {
    expect(await waifuDungeon.owner()).to.equal(ownerAddress);
  });

  it("Should not let anyone funnel waifus", async function () {
    let userADungeon = waifuDungeon.connect(userAAccount);
    await expect(userADungeon.funnelMaxWaifus()).to.be.revertedWith("revert Ownable: caller is not the owner")
  });

  it("Should not let anyone arbitrarily send waifus into the dungeon", async function () {
    let safeTransferFrom = waifusion["safeTransferFrom(address,address,uint256)"]
    await expect(safeTransferFrom(ownerAddress, WAIFUSION, ownerNFTId)).to.be.revertedWith("revert ERC721: transfer to non ERC721Receiver implementer")
  });

  it("Should let owner funnel max waifus", async function () {
    await waifuDungeon.funnelMaxWaifus()
    expect(await waifusion.balanceOf(waifuDungeon.address)).to.equal(20);
  });

  it("Should let owner funnel 5 waifus", async function () {
    await waifuDungeon.funnelWaifus(5)
    expect(await waifusion.balanceOf(waifuDungeon.address)).to.equal(25);
  });

  it("Should not let me buy 5 waifus with 0.7 eth", async function () {
    await expect(waifuDungeon.commitBuyWaifus(5, { value: ethers.utils.parseEther("0.7") })).to.revertedWith("invalid ether");
  });

  it("Should not let me buy 3 waifus with 4.2 eth", async function () {
    await expect(waifuDungeon.commitBuyWaifus(3, { value: ethers.utils.parseEther("4.2") })).to.revertedWith("invalid ether");
  });

  it("Should let owner add 5 arbitrary NFTs", async function () {
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

  it("Should not let me reveal without committing", async function () {
    let userADungeon = waifuDungeon.connect(userAAccount);
    await expect(userADungeon.revealWaifus()).to.be.revertedWith("revert WaifuDungeon: Need to commit")
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
    await network.provider.send("evm_mine")
  })

  it("Should commit waifu for 0.7 eth", async function () {
    let userAContract = waifuDungeon.connect(userAAccount);
    await userAContract.commitBuyWaifus(1, { value: ethers.utils.parseEther("0.7") });
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
    await network.provider.send("evm_mine")
    await network.provider.send("evm_mine")
    await network.provider.send("evm_mine")
  })

  it("Should reveal waifu next tx", async function () {
    await testReveal(userAAccount, 1, true)
  });


  it("Should not reveal waifu after revealing", async function () {
    let userADungeon = waifuDungeon.connect(userAAccount);
    await expect(userADungeon.revealWaifus()).to.revertedWith("Need to commit")
  })

  it("Should commit 5 waifus for 3.5 eth", async function () {
    await waifuDungeon.commitBuyWaifus(5, { value: ethers.utils.parseEther("3.5") });
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  it("Should reveal 5 waifus next tx", async function () {
    let revealNonceBefore = await waifuDungeon.revealNonce();
    await testReveal(ownerAccount, 5, true);
    let revealNonceAfter = await waifuDungeon.revealNonce();
    expect(revealNonceBefore.toNumber()).to.be.lessThan(revealNonceAfter.toNumber())
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  let waifusBalanceBeforeSwap;
  let waifusBalance2BeforeSwap;
  it("Should commit swap 1 waifus for 5490 WET", async function () {
    waifusBalanceBeforeSwap = await waifusion.balanceOf(ownerAddress);
    waifusBalance2BeforeSwap = await waifusion2.balanceOf(ownerAddress);
    await wet.approve(waifuDungeon.address, ethers.utils.parseEther("5490"));
    await waifusion.setApprovalForAll(waifuDungeon.address, true);
    expect(await waifusion.isApprovedForAll(ownerAddress, waifuDungeon.address)).to.equal(true)
    await waifuDungeon.commitSwapWaifus([ownerNFTId]);
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  it("Should reveal 1 swapped waifu next tx", async function () {
    await testReveal(ownerAccount, 1, true)
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  it("Should set the swap price to 5000 WET", async function () {
    await waifuDungeon.setSwapCost(ethers.utils.parseEther("5000"))
  })

  it("Should commit swap 2 waifus for 10000 WET", async function () {
    waifusBalanceBeforeSwap = await waifusion.balanceOf(ownerAddress);
    waifusBalance2BeforeSwap = await waifusion2.balanceOf(ownerAddress);
    await wet.approve(waifuDungeon.address, ethers.utils.parseEther("10000"));
    await waifusion.setApprovalForAll(waifuDungeon.address, true);
    expect(await waifusion.isApprovedForAll(ownerAddress, waifuDungeon.address)).to.equal(true)
    await waifuDungeon.commitSwapWaifus([ownerNFTIdOthers[0], ownerNFTIdOthers[1]]);
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  it("Should reveal 2 swapped waifus next tx", async function () {
    await testReveal(ownerAccount, 2, true)
  });

  let userANFT;
  it("Should buy waifu for 0.1 eth", async function () {
    let userAContract = waifusion2.connect(userAAccount);
    await userAContract.mintNFT(1, { value: ethers.utils.parseEther("0.01") });
    userANFT = (await userAContract.totalSupply()) - 1;
  });

  it("Should not let anyone add an arbitrary NFT", async function () {
    let userAContract = waifusion2.connect(userAAccount);
    await userAContract.setApprovalForAll(waifuDungeon.address, true);
    let userADungeon = waifuDungeon.connect(userAAccount);
    await expect(userADungeon.addNFTToDungeon(waifusion2.address, userANFT)).to.revertedWith("caller is not the owner")
    expect(await waifusion2.ownerOf(userANFT)).to.equal(userAAddress);
  });

  it("Should not let anyone withdraw eth", async function () {
    let userAContract = waifuDungeon.connect(userAAccount);
    await expect(userAContract.withdraw()).to.revertedWith("caller is not the owner");
  })

  it("Should not let anyone withdraw eth from waifusion", async function () {
    let userAContract = waifuDungeon.connect(userAAccount);
    await expect(userAContract.withdrawFromWaifusion()).to.revertedWith("caller is not the owner");
  })

  it("Should let owner withdraw eth", async function () {
    await waifuDungeon.withdraw();
  })

  it("Should let owner withdraw eth from waifusion", async function () {
    await waifuDungeon.withdrawFromWaifusion();
  })

  it("Should allow transferring back ownership of waifusion", async function () {
    await waifuDungeon.setWaifusionOwner(ownerAddress);
    expect(await waifusion.owner()).to.equal(ownerAddress)
  });

  it("Should let multiple people commit at the same time", async function() {
    let userAContract = waifuDungeon.connect(userAAccount);
    await userAContract.commitBuyWaifus(2, { value: ethers.utils.parseEther("1.4") });
    let userBContract = waifuDungeon.connect(userBAccount);
    await userBContract.commitBuyWaifus(2, { value: ethers.utils.parseEther("1.4") });
    let userCContract = waifuDungeon.connect(userCAccount);
    await userCContract.commitBuyWaifus(2, { value: ethers.utils.parseEther("1.4") });
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  it("Should let multiple people reveal at the same time", async function () {
    await testReveal(userAAccount, 2, true);
    await testReveal(userBAccount, 2, true);
    await testReveal(userCAccount, 2, true);
  });
});

async function testReveal(account, amount, test2) {
  let userAddress = await account.getAddress()
  let userADungeon = waifuDungeon.connect(account);
  let mappedBeforeBalance = {}
  mappedBeforeBalance[waifusion.address] = await waifusion.balanceOf(userAddress);
  if (test2) 
  mappedBeforeBalance[waifusion2.address] = await waifusion2.balanceOf(userAddress);
  let tx = await userADungeon.revealWaifus();
  let receipt = await tx.wait();
  let waifus = [];
  for (let i = 0; i < receipt.logs.length; i += 2) {
    let log = receipt.logs[i];
    waifus.push({
      waifuID: ethers.BigNumber.from(log.topics[3]),
      nftContract: log.address,
    })
  }
  expect(waifus.length).to.equal(amount);

  let mappedAfterBalance = {}
  mappedAfterBalance[waifusion.address] = await waifusion.balanceOf(userAddress);
  if (test2) 
  mappedAfterBalance[waifusion2.address] = await waifusion2.balanceOf(userAddress);

  for (let i = 0; i < waifus.length; i++) {
    let contractAddr = waifus[i].nftContract;
    let contract = await ethers.getContractAt("Waifus", contractAddr);
    expect(await contract.ownerOf(waifus[i].waifuID)).to.equal(userAddress)
    expect(await contract.balanceOf(userAddress)).to.equal(mappedAfterBalance[contractAddr])
    expect(mappedBeforeBalance[contractAddr].toNumber()).to.lessThan(mappedAfterBalance[contractAddr].toNumber())
  }
}

describe("Setup Edge Cases", function () {
  before(async () => {
    await network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          jsonRpcUrl: "https://eth-mainnet.alchemyapi.io/v2/RMvI_78sarzOxWrBf2Ujh5oqVX-EeWNa",
          blockNumber: 11981299
        }
      }]
    })
    const accounts = await ethers.getSigners();
    [ownerAccount, userAAccount] = accounts;
    ownerAddress = await ownerAccount.getAddress();
    userAAddress = await userAAccount.getAddress();

    // get main contracts
    WaifuDungeon = await ethers.getContractFactory('WaifuDungeon');

    waifuDungeon = await WaifuDungeon.deploy();
    await waifuDungeon.deployed();

    WET_TOKEN = await waifuDungeon.WET_TOKEN()
    wet = await ethers.getContractAt("contracts/token/IERC20.sol:IERC20", WET_TOKEN);

    WAIFUSION = await waifuDungeon.WAIFUSION()
    waifusion = await ethers.getContractAt("Waifus", WAIFUSION);

    waifusionOwner = await waifusion.owner();
    // wet = await ethers.getContractAt("IERC20", WET_TOKEN);
    // deploy stablecoins to local blockchain emulator
    // wet = await testHelper.deployCoin(ethers, 'dai');
    // use deployed stablecoin address for collaterals
    // COLLATERAL = dai.address;
  });

  it("Should set the dungeon as waifusion owner", async function () {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [waifusionOwner]
    }
    )

    waifusionOwnerSigner = await ethers.provider.getSigner(waifusionOwner)
    let waifusionWithOwner = waifusion.connect(waifusionOwnerSigner);
    await waifusionWithOwner.transferOwnership(waifuDungeon.address);
    expect(await waifusion.owner()).to.equal(waifuDungeon.address);

    await hre.network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [waifusionOwner]
    }
    )
  });

  it("Should let a user buy 2 NFTs and claim WET", async function () {
    expect((await wet.balanceOf(ownerAddress)).toString()).to.equal("0");
    await waifusion.mintNFT(2, { value: ethers.utils.parseEther("1.4") });
    expect(await waifusion.balanceOf(ownerAddress)).to.equal(2);
    ownerNFTId = await waifusion.totalSupply() - 2
    expect(await waifusion.ownerOf(ownerNFTId)).to.equal(ownerAddress);
    expect(await waifusion.ownerOf(ownerNFTId + 1)).to.equal(ownerAddress);
    await wet.claim([ownerNFTId, ownerNFTId + 1])
    expect((await wet.balanceOf(ownerAddress)).toString()).to.not.equal("0");
  })

  it("Should let a user buy 10 NFTs pt. 2", async function () {
    let tx = await waifusion.mintNFT(10, { value: ethers.utils.parseEther("7") });
    let receipt = await tx.wait();
    let waifus = [];
    for (let i = 0; i < receipt.logs.length; i++) {
      let log = receipt.logs[i];
      waifus.push(ethers.BigNumber.from(log.topics[3]).toNumber())
    }

    expect(await waifusion.balanceOf(ownerAddress)).to.equal(waifus.length + 2);
    ownerNFTIdOthers = waifus;
    for (let i = 0; i < waifus.length; i++) {
      expect(await waifusion.ownerOf(waifus[i])).to.equal(ownerAddress);
    }
    await wet.claim(ownerNFTIdOthers)
    expect((await wet.balanceOf(ownerAddress)).toString()).to.not.equal(0);
  })
});

describe("WaifuDungeon Edge Cases", function () {
  it("Should let owner add 2 arbitrary NFTs", async function () {
    await waifusion.setApprovalForAll(waifuDungeon.address, true);
    await waifuDungeon.addNFTToDungeon(waifusion.address, ownerNFTId);
    await waifuDungeon.addNFTToDungeon(waifusion.address, ownerNFTId + 1);
    expect(await waifusion.ownerOf(ownerNFTId)).to.equal(waifuDungeon.address);
    expect(await waifusion.ownerOf(ownerNFTId + 1)).to.equal(waifuDungeon.address);
    expect(await waifusion.balanceOf(waifuDungeon.address)).to.equal(2);

    let waifusInDungeon = await waifuDungeon.waifusInDungeon(0);
    expect(waifusInDungeon.nftContract).to.equal(waifusion.address);
    expect(waifusInDungeon.waifuID).to.equal(ownerNFTId);
    waifusInDungeon = await waifuDungeon.waifusInDungeon(1);
    expect(waifusInDungeon.nftContract).to.equal(waifusion.address);
    expect(waifusInDungeon.waifuID).to.equal(ownerNFTId + 1);
  });

  it("Should set the buy price to 0.5 eth", async function () {
    await waifuDungeon.setBuyCost(ethers.utils.parseEther("0.5"))
  })

  it("Should commit 1 waifu for 0.5 eth", async function () {
    let userAContract = waifuDungeon.connect(userAAccount);
    await userAContract.commitBuyWaifus(1, { value: ethers.utils.parseEther("0.5") });
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  it("Should reveal 1 waifu next tx", async function () {
    await testReveal(userAAccount, 1, false)
  });

  it("Should commit last waifu for 0.5 eth", async function () {
    let userAContract = waifuDungeon.connect(userAAccount);
    await userAContract.commitBuyWaifus(1, { value: ethers.utils.parseEther("0.5") });
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  it("Should reveal last waifu next tx", async function () {
    let revealNonceBefore = await waifuDungeon.revealNonce();
    await testReveal(userAAccount, 1, false)
    let revealNonceAfter = await waifuDungeon.revealNonce();
    expect(revealNonceBefore.toNumber()).to.be.lessThan(revealNonceAfter.toNumber())

    let waifusInDungeon = await waifuDungeon.waifusInDungeon(0);
    expect(waifusInDungeon.nftContract).to.equal("0x0000000000000000000000000000000000000000");
    expect(waifusInDungeon.waifuID).to.equal(0);
    waifusInDungeon = await waifuDungeon.waifusInDungeon(0);
    expect(waifusInDungeon.nftContract).to.equal("0x0000000000000000000000000000000000000000");
    expect(waifusInDungeon.waifuID).to.equal(0);
  });

  it("Should not let commit waifus when empty", async function () {
    let userAContract = waifuDungeon.connect(userAAccount);
    await expect(userAContract.commitBuyWaifus(1, { value: ethers.utils.parseEther("0.5") })).to.revertedWith("not enough waifus");
  });

  it("Should let a user buy 5 NFTs pt. 2", async function () {
    await waifusion.mintNFT(5, { value: ethers.utils.parseEther("3.5") });
    expect(await waifusion.balanceOf(ownerAddress)).to.equal(15);
    ownerNFTId2 = await waifusion.totalSupply() - 5
    expect(await waifusion.ownerOf(ownerNFTId2)).to.equal(ownerAddress);
    expect(await waifusion.ownerOf(ownerNFTId2 + 1)).to.equal(ownerAddress);
  })

  it("Should let owner add 10 arbitrary NFTs", async function () {
    let waifusBefore = await waifuDungeon.waifuCount();
    for (let i = 0; i < ownerNFTIdOthers.length; i++) {
      await waifuDungeon.addNFTToDungeon(waifusion.address, ownerNFTIdOthers[i]);
      expect(await waifusion.ownerOf(ownerNFTIdOthers[i])).to.equal(waifuDungeon.address);
    }
    let waifusAfter = await waifuDungeon.waifuCount();
    expect(waifusAfter).to.equal(waifusBefore.add(10));
  });

  it("Should commit 8 waifus for 4 eth", async function () {
    await waifuDungeon.commitBuyWaifus(8, { value: ethers.utils.parseEther("4") });
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  it("Should reveal 8 waifus next tx", async function () {
    await testReveal(ownerAccount, 8, false)
  });

  it("Should commit last 2 waifus for 1 eth", async function () {
    await waifuDungeon.commitBuyWaifus(2, { value: ethers.utils.parseEther("1") });
  });

  it("increment block", async function () {
    await network.provider.send("evm_mine")
  })

  it("Should reveal 2 waifus next tx", async function () {
    await testReveal(ownerAccount, 2, false)
    
    let waifusInDungeon = await waifuDungeon.waifusInDungeon(0);
    expect(waifusInDungeon.nftContract).to.equal("0x0000000000000000000000000000000000000000");
    expect(waifusInDungeon.waifuID).to.equal(0);
    waifusInDungeon = await waifuDungeon.waifusInDungeon(0);
    expect(waifusInDungeon.nftContract).to.equal("0x0000000000000000000000000000000000000000");
    expect(waifusInDungeon.waifuID).to.equal(0);
  });
});
