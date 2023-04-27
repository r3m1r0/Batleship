import { ethers } from "hardhat";

async function main() {

  const BatailleNavalContractToDeploy = await ethers.getContractFactory("BatailleNaval");
  const BatailleNavalContractDeployed = await BatailleNavalContractToDeploy.deploy();
  await BatailleNavalContractDeployed.deployed();
  console.log("PlayerContract deployed to:", BatailleNavalContractDeployed.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
