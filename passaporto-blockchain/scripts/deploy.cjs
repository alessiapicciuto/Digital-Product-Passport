// File: scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const ProductPassport = await hre.ethers.getContractFactory("ProductPassport");
  
  const productPassport = await ProductPassport.deploy();

  console.log("Contratto ProductPassport distribuito all'indirizzo:", productPassport.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });