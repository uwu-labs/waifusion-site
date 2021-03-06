// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token/IERC721.sol";
import "./IWaifusion.sol";
import "./token/SafeERC20.sol";
import "./utils/Ownable.sol";

contract WaifuDungeon is Ownable {
    address public constant BURN_ADDR = 0x0000000000000000000000000000000000080085;
    address public constant WET_TOKEN = 0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2;
    address public constant WAIFUSION = 0x2216d47494E516d8206B70FCa8585820eD3C4946;
    uint256 constant MAX_NFT_SUPPLY = 16384;
    uint256 public constant MAX_SWAP = 3;

    uint256 public buyCost = 0.7 ether;
    uint256 public swapCost = 5490 ether;

    struct Commit {
        uint64 block;
        uint64 amount;
        bool revealed;
    }
    
    mapping (address => Commit) public commits;

    constructor() Ownable() {
        IERC20(WET_TOKEN).approve(WAIFUSION, 2**256 - 1);
    }
    
    receive() external payable {
    }

    function commitBuyWaifus(uint256 num) external payable {
        require(msg.value >= num * buyCost, "not enough ether to buy");
        uint256 maxWaifusToMint = _maxWaifus();
        require(num < maxWaifusToMint, "too many waifus for you");
        _commitRandomWaifus(num);
    }

    function commitSwapWaifus(uint256[] calldata _ids) external {
        uint256 amountToSwap = _ids.length;
        uint256 maxWaifusToMint = _maxWaifus();
        require(amountToSwap <= (maxWaifusToMint < MAX_SWAP ? maxWaifusToMint : MAX_SWAP), "swapping too many");
        SafeERC20.safeTransferFrom(IERC20(WET_TOKEN), WET_TOKEN, BURN_ADDR, swapCost*amountToSwap);
        for (uint256 i = 0; i < amountToSwap; i++) {    
            // Burn waifu.
            IERC721(WAIFUSION).transferFrom(address(this), BURN_ADDR, _ids[i]);
        }
        _commitRandomWaifus(amountToSwap);
    }

    function revealWaifus() external returns (uint256[] memory) {
        uint256[] memory randomIDs = _revealRandomWaifus();
        for (uint256 i = 0; i < randomIDs.length; i++) { 
            IERC721(WAIFUSION).transferFrom(address(this), msg.sender, randomIDs[i]);
        }
        return randomIDs;
    }

    // Permissioned functions.

    function withdrawFromWaifusion() public onlyOwner() {
        IWaifusion(WAIFUSION).withdraw();
    }

    function funnelMaxWaifus() external onlyOwner() {
        uint256 waifusToMint = _maxWaifus();
        funnelWaifus(waifusToMint);
    }

    function funnelWaifus(uint256 num) public onlyOwner() {
        withdrawFromWaifusion();
        IWaifusion(WAIFUSION).mintNFT(num);
    }

    function withdraw() external onlyOwner() {
        uint256 balance = address(this).balance;
        payable(_msgSender()).transfer(balance);
    }

    function setWaifusionOwner(address newOwner) external onlyOwner() {
        IWaifusion(WAIFUSION).transferOwnership(newOwner);
    }

    function setBuyCost(uint256 newBuyCost) external onlyOwner() {
        buyCost = newBuyCost;
    }

    function setSwapCost(uint256 newSwapCost) external onlyOwner() {
        swapCost = newSwapCost;
    }

    // View functions.

    function waifusInMaidCafe() public view returns (uint256) {
        return IERC721(WAIFUSION).balanceOf(address(this));
    }

    // Internal functions.

    function _maxWaifus() internal view returns (uint256) {
        uint256 remainingWaifus = MAX_NFT_SUPPLY - IWaifusion(WAIFUSION).totalSupply();
        uint256 waifusToMint = remainingWaifus < 20 ? remainingWaifus : 20;
        return waifusToMint;
    }

    function _commitRandomWaifus(uint256 num) internal {
        uint256 commitBlock = block.number;
        commits[msg.sender].block = uint64(commitBlock);
        commits[msg.sender].amount = uint64(num);
        commits[msg.sender].revealed = false;
    }

    function _revealRandomWaifus() internal returns (uint256[] memory) {
        Commit memory commit = commits[msg.sender];
        require(!commit.revealed,"WaifuMaidCafe: Already revealed");
        commits[msg.sender].revealed = true;
        require(uint64(block.number) > commit.block, "WaifuMaidCafe: cannot reveal same block");
        require(uint64(block.number) <= commit.block + 255, "WaifuMaidCafe: Revealed too late");

        // Get the hash of the block that happened after they committed.
        bytes32 revealHash = blockhash(commit.block + 1);

        uint256[] memory randomIDs = new uint256[](commit.amount); 
        uint256 _waifusInMaidCafe = waifusInMaidCafe();
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(revealHash))) % _waifusInMaidCafe;
        for (uint256 i = 0; i < commit.amount; i++) {
            randomIDs[i] = randomIndex;
            randomIndex = (randomIndex + 1) % _waifusInMaidCafe;
        }
        return randomIDs;
    }
}
