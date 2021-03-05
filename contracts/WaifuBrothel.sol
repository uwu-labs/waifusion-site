pragma solidity ^0.8.0;

import "./token/IERC721.sol";
import "./token/SafeERC20.sol";
import "./utils/Ownable.sol";

contract WaifuBrothel is Ownable {
    address public constant BURN_ADDR = 0x0000000000000000000000000000000000080085;
    address public constant WET_TOKEN = 0x76280af9d18a868a0af3dca95b57dde816c1aaf2;
    IERC721 public constant WAIFUSION = IERC721(0x2216d47494e516d8206b70fca8585820ed3c4946);
    uint256 public constant MAX_SWAP = 3;

    uint256 public buyCost = 0.7 ether;
    uint256 public swapCost = 5490 ether;

    constructor() Ownable() {
    }

    function buyWaifus(uint256 num) external returns (uint256) {
        require(msg.value == num * buyCost, "not enough ether");
        for (uint256 i = 0; i < amountToSwap; i++) {        
            _sendRandomWaifu();
        }
    }

    function swapWaifus(uint256[] _ids) external {
        uint256 amountToSwap = _ids.length;
        require(amountToSwap < MAX_SWAP, "swapping too many");
        SafeERC20.safeTransferFrom(WET_TOKEN, WET_TOKEN, BURN_ADDR, mintCost*amountToSwap);
        for (uint256 i = 0; i < amountToSwap; i++) {
            _swapWaifu(_ids[i]);
        }
    }

    function withdraw() external onlyOwner() {
        uint256 balance = address(this).balance;
        msg.sender.transfer(balance);
    }

    function setBuyCost(uint256 newCost) external onlyOwner() {
        buyCost = newCost;
    }

    function setSwapCost(uint256 newCost) external onlyOwner() {
        swapCost = newCost;
    }

    function _swapWaifu(uint256 id) internal {
        WAIFUSION.safeTransferFrom(msg.sender, BURN_ADDR, tokenId);
        _sendRandomWaifu();
    }

    function _sendRandomWaifu() internal returns (uint256) {
        uint256 randomID = randomWaifuID();
        WAIFUSION.safeTransferFrom(address(this), msg.sender, randomID);
        return randomID;
    }

    function _randomWaifuID() internal returns (uint256) {
        return 5;
    }
}
