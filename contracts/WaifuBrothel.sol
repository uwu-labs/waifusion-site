pragma solidity ^0.8.0;

import "./token/IERC721.sol";
import "./token/SafeERC20.sol";
import "./utils/Ownable.sol";

contract WaifuBrothel is Ownable {
    address public constant BURN_ADDR = 0x0000000000000000000000000000000000080085;
    address public constant WET_TOKEN = 0x76280AF9D18a868a0aF3dcA95b57DDE816c1aaf2;
    IERC721 public constant WAIFUSION = IERC721(0x2216d47494e516d8206b70fca8585820ed3c4946);
    uint256 public constant MAX_SWAP = 3;

    uint256 public buyCost = 0.7 ether;
    uint256 public swapCost = 5490 ether;

    struct Commit {
        uint64 block;
        uint64 amount;
        bool revealed;
    }
    
    mapping (address => Commit) public commits;
  
    event CommitHash(address sender, bytes32 dataHash, uint64 block);
    event RevealHash(address sender, bytes32 revealHash, uint8 random);

    constructor() Ownable() {
    }

    function commitBuyWaifus(uint256 num) external {
        require(msg.value == num * buyCost, "not enough ether");
        _commitRandomWaifus(num);
    }

    function commitSwapWaifus(uint256[] calldata _ids) external {
        uint256 amountToSwap = _ids.length;
        require(amountToSwap < MAX_SWAP, "swapping too many");
        SafeERC20.safeTransferFrom(IERC20(WET_TOKEN), WET_TOKEN, BURN_ADDR, swapCost*amountToSwap);
        for (uint256 i = 0; i < amountToSwap; i++) {    
            // Burn waifu.
            WAIFUSION.safeTransferFrom(msg.sender, BURN_ADDR, _ids[i]);
            _commitRandomWaifus(amountToSwap);
        }
    }

    function revealWaifus() external returns (uint256[] memory) {
        uint256[] memory randomIDs = _revealRandomWaifus();
        for (uint256 i = 0; i < randomIDs.length; i++) { 
            WAIFUSION.safeTransferFrom(address(this), msg.sender, randomIDs[i]);
        }
    }

    function withdraw() external onlyOwner() {
        uint256 balance = address(this).balance;
        payable(_msgSender()).transfer(balance);
    }

    function setBuyCost(uint256 newCost) external onlyOwner() {
        buyCost = newCost;
    }

    function setSwapCost(uint256 newCost) external onlyOwner() {
        swapCost = newCost;
    }

    function waifusInBrothel() public view returns (uint256) {
        return WAIFUSION.balanceOf(address(this));
    }

    function _commitRandomWaifus(uint256 num) internal {
        uint256 commitBlock = block.number;
        commits[msg.sender].block = uint64(commitBlock);
        commits[msg.sender].revealed = false;
        commits[msg.sender].amount = uint64(num);
    }

    function _revealRandomWaifus() internal returns (uint256[] memory) {
        Commit memory commit = commits[msg.sender];
        require(!commit.revealed,"WaifuBrothel: Already revealed");
        commits[msg.sender].revealed = true;
        require(uint64(block.number) > commit.block, "WaifuBrothel: cannot reveal same block");
        require(uint64(block.number) <= commit.block + 255, "WaifuBrothel: Revealed too late");

        // Get the hash of the block that happened after they committed.
        bytes32 revealHash = blockhash(commit.block + 1);

        uint256[] memory randomIDs = new uint256[](commit.amount); 
        uint256 waifusInBrothel = waifusInBrothel();
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(revealHash))) % waifusInBrothel;
        for (uint256 i = 0; i < commit.amount; i++) {
            randomIDs[i] = randomIndex % waifusInBrothel;
            randomIndex++;
        }
        return randomIDs;
    }
}
