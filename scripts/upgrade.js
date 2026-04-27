const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyTokenV2 = await ethers.getContractFactory("MyTokenV2");

  const upgraded = await upgrades.upgradeProxy(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    MyTokenV2
  );

  console.log("Contract upgraded");
}

main();