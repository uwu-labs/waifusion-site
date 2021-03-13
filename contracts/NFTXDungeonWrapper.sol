pragma solidity ^0.8.0;

import "./utils/Clones.sol";
import "./utils/WrapperChild.sol";

contract NFTXDungeonWrapper {
  // TODO: Maybe derive some way from NFTX addr.
  address nftxVaultToken = 0x925297edcb4893d0d914e6d28f49381d47b864b0;
  address wrapperChildImpl;
  address nftxFund; 
  address xToken;
  uint256 vaultID;

  constructor() {
    wrapperChildImpl = address(new WrapperChildImpl());
    WrapperChildImpl(wrapperChildImpl).initialize(address(0), address(0)); 
  }

  function commitWaifusWithNFTX(uint256 num) external {
    address userWrapper = userWrapperAddr(msg.sender);
    delegatecall(userWrapper, 0x0);
  }

  function revealWaifusWithNFTX(uint256 num) external {
    address userWrapper = userWrapperAddr(msg.sender);
    delegatecall(userWrapper, 0x0);
  }

  function userWrapperAddr(address user) public returns (address) {
    bytes32 salt = keccak256(abi.encodePacked(address(this), user));
    return Clones.predictDeterministicAddress(implementation, salt);
  }
}