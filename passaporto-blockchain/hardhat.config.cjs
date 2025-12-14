// File: hardhat.config.js
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", 
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545", // La tua porta Ganache verificata
      chainId: 1337, 
    },
  },
};