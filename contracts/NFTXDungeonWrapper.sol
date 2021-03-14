pragma solidity ^0.8.0;

import "./utils/Clones.sol";
import "./utils/Address.sol";
import "./WrapperChild.sol";

contract NFTXDungeonWrapper {
  // TODO: Maybe derive some way from NFTX addr.
  address immutable wrapperChildImpl;
  address public nftxFund = 0xAf93fCce0548D3124A5fC3045adAf1ddE4e8Bf7e; 
  address public xToken = 0x0F10E6ec76346c2362897BFe948c8011BB72880F;
  uint256 public vaultID = 37;

  constructor() {
    address impl = address(new WrapperChildImpl());
    wrapperChildImpl = impl;
  }

  function commitWaifusWithNFTX(uint256 num) external {
    address userWrapper = checkChild();
    WrapperChildImpl(userWrapper).commitSwapWaifus(num);
  }

  function revealWaifusWithNFTX() external {
    address userWrapper = checkChild();
    WrapperChildImpl(userWrapper).revealWaifus();
  }

  function userWrapperAddr(address user) public view returns (address) {
    bytes32 salt = keccak256(abi.encodePacked(address(this), user));
    return Clones.predictDeterministicAddress(wrapperChildImpl, salt);
  }

  function checkChild() public returns (address) {
    address properWrapper = userWrapperAddr(msg.sender);
    if (!Address.isContract(properWrapper)) {
      bytes32 salt = keccak256(abi.encodePacked(address(this), msg.sender));
      address wrapper = Clones.cloneDeterministic(wrapperChildImpl, salt);
      WrapperChildImpl(wrapper).initialize(address(this), msg.sender); 
    }
    return properWrapper;
  }
}