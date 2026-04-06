
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const Lock = await hre.ethers.getContractFactory("Lock");

  const unlockTime = Math.floor(Date.now() / 1000) + 60;

  const lock = await Lock.deploy(unlockTime, { value: hre.ethers.parseEther("0.01") });

  await lock.waitForDeployment();

  console.log("Lock deployed to:", await lock.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });