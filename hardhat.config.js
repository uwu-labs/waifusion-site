require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("hardhat-gas-reporter");
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 50000
      }
    }
  },
  networks: {
  hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/RMvI_78sarzOxWrBf2Ujh5oqVX-EeWNa",
        blockNumber: 11981299
      }
    }
  },
  mocha: {
    timeout: 200000
  }

};

