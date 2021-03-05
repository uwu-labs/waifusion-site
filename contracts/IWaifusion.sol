pragma solidity ^0.8.0;

interface IWaifusion {
    function withdraw() external;
    function mintNFT(uint256 num) external payable;
    function changeName(uint256 tokenId, string memory newName) external;
    function transferOwnership(address newOwner) public virtual onlyOwner;
    
    // Read functions.
    function totalSupply() external returns (uint256);
    function MAX_NFT_SUPPLY() external returns (uint256);
}