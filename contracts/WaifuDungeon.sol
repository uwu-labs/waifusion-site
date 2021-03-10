// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token/IERC721.sol";
import "./IWaifusion.sol";
import "./token/SafeERC20.sol";
import "./utils/Ownable.sol";

// Author: 0xKiwi. 

contract WaifuDungeon is Ownable {
    address public constant BURN_ADDR = 0x0000000000000000000000000000000000080085;
    address public constant WAIFUSION = 0x2216d47494E516d8206B70FCa8585820eD3C4946;
    uint256 constant MAX_NFT_SUPPLY = 16384;
    uint256 public constant MAX_SWAP = 5;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    uint256 public buyCost = 1.8 ether;
    uint256 public swapCost = .25 ether;

    uint256 public waifuCount;
    uint256 public revealNonce;

    struct Commit {
        uint64 block;
        uint64 amount;
    }
    mapping (address => Commit) public commits;

    struct Waifu {
        address nftContract;
        uint256 waifuID;
    }
    mapping (uint256 => Waifu) public waifusInDungeon;

    constructor() Ownable() {
    }
    
    receive() external payable {
    }

    // This function is executed when a ERC721 is received via safeTransferFrom. This function is purposely strict to ensure 
    // the NFTs in this contract are all valid.
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4) {
        // Only accept NFTs through this function if they're being funneled.
        require(msg.sender == WAIFUSION, "WaifuDungeon: NFT not from waifusion");
        require(operator == address(this), "WaifuDungeon: invalid operator");
        require(tokenId <= MAX_NFT_SUPPLY, "WaifuDungeon: over max waifus");
        waifusInDungeon[waifuCount] = Waifu(WAIFUSION, uint64(tokenId));
        waifuCount++;
        return _ERC721_RECEIVED;
    }
    
    // This function commits that the sender will purchase a waifu within the next 255 blocks.
    // If they fail to revealWaifus() within that timeframe. The money they sent is forfeited to reduce complexity.
    function commitBuyWaifus(uint256 num) external payable {
        require(msg.value == num * buyCost, "WaifuDungeon: invalid bnb to buy");
        require(num <= 20, "WaifuDungeon: swapping too many");
        require(num <= waifuCount, "WaifuDungeon: not enough waifus in dungeon");
        _commitRandomWaifus(num);
    }

    // This function commits that the sender will swap a waifu within the next 255 blocks.
    // If they fail to revealWaifus() within that timeframe. The money they sent is forfeited to reduce complexity.
    function commitSwapWaifus(uint256[] calldata _ids) external payable {
        uint256 amountToSwap = _ids.length;
        require(msg.value == swapCost * amountToSwap);
        require(amountToSwap <= MAX_SWAP, "WaifuDungeon: swapping too many");
        require(amountToSwap <= waifuCount, "WaifuDungeon: not enough waifus in dungeon");
        address _BURN_ADDR = BURN_ADDR;
        address _WAIFUSION = WAIFUSION;
        for (uint256 i = 0; i < amountToSwap; i++) {    
            // Burn waifu.
            IERC721(_WAIFUSION).transferFrom(msg.sender, _BURN_ADDR, _ids[i]);
        }
        _commitRandomWaifus(amountToSwap);
    }

    function revealWaifus() external {
        uint256[] memory randomIDs = _revealRandomWaifus();
        for (uint256 i = 0; i < randomIDs.length; i++) { 
            Waifu memory waifu = waifusInDungeon[randomIDs[i]];
            IERC721(waifu.nftContract).safeTransferFrom(address(this), msg.sender, uint256(waifu.waifuID));
        }
        for (uint256 i = 0; i < randomIDs.length; i++) { 
            uint256 count = waifuCount;
            if (randomIDs[i] < count) {
                waifusInDungeon[randomIDs[i]] = waifusInDungeon[count-1];
            }
            delete waifusInDungeon[count-1];
            waifuCount--;
        }
    }

    // Permissioned functions.

    // This function is permissioned and allows the owner to receive ETH from the waifusion contract, 
    // and uses said funds to buy more NFTs. If there are under 20 waifus remaining in the contract, it should adjust to that.
    function funnelMaxWaifus() external onlyOwner() {
        uint256 remainingWaifus = MAX_NFT_SUPPLY - IWaifusion(WAIFUSION).totalSupply();
        uint256 waifusToMint = remainingWaifus < 20 ? remainingWaifus : 20;
        if (waifusToMint == 0) {
            return;
        }
        funnelWaifusFromWaifusion(waifusToMint);
    }

    function funnelWaifusFromWaifusion(uint256 num) public onlyOwner() {
        withdrawFromWaifusion();
        funnelWaifus(num);
    }

    function funnelWaifus(uint256 num) public onlyOwner() {
        uint256 nftPrice = IWaifusion(WAIFUSION).getNFTPrice();
        IWaifusion(WAIFUSION).mintNFT{value: num * nftPrice}(num);
    }

    // addNFTToDungeon allows for arbitrary NFT addition to the contract, assuming 
    // its ID fits within uint48. 
    function addNFTToDungeon(address nftContract, uint256 nftID) external onlyOwner() {
        require(nftContract != address(0), "WaifuDungeon: addNFT zero addr");
        IERC721(nftContract).transferFrom(msg.sender, address(this), nftID);
        waifusInDungeon[waifuCount] = Waifu(nftContract, uint64(nftID));
        waifuCount++;
    }

    function withdraw() external onlyOwner() {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function withdrawFromWaifusion() public onlyOwner() {
        IWaifusion(WAIFUSION).withdraw();
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

    // Internal functions.

    function _commitRandomWaifus(uint256 num) internal {
        require(num > 0, "WaifuDungeon: anon, you cant reveal 0 waifus");
        uint256 currentBlock = block.number;
        require(commits[msg.sender].block + 255 < currentBlock, "WaifuDungeon: still need to reveal");
        commits[msg.sender].block = uint64(currentBlock);
        commits[msg.sender].amount = uint64(num);
    }

    function _revealRandomWaifus() internal returns (uint256[] memory) {
        Commit memory commit = commits[msg.sender];
        require(commit.amount > 0 && commit.block != 0, "WaifuDungeon: Need to commit");
        require(commit.block < uint64(block.number), "WaifuDungeon: cannot reveal same block");
        require(commit.block + 255 >= uint64(block.number), "WaifuDungeon: Revealed too late");
        commits[msg.sender].block = 0;
        
        // Get the hash of the block that happened after they committed.
        bytes32 revealHash = blockhash(commit.block + 1);

        uint256[] memory randomIDs = new uint256[](commit.amount); 
        uint256 _waifuCount = waifuCount;
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(revealNonce, revealHash))) % _waifuCount;
        for (uint256 i = 0; i < commit.amount; i++) {
            randomIDs[i] = randomIndex;
            randomIndex = (randomIndex + 1) % _waifuCount;
        }
        revealNonce++;
        return randomIDs;
    }
}
