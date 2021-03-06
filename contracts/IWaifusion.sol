pragma solidity ^0.8.0;

interface IWaifusion {
    function withdraw() external;
    function mintNFT(uint256 num) external payable;
    function changeName(uint256 tokenId, string memory newName) external;
    function transferOwnership(address newOwner) external;

    // Read functions.
    function getNFTPrice() external view returns (uint256);
    function totalSupply() external view returns (uint256);
}