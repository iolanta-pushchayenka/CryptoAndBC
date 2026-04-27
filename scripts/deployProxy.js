const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Деплой с аккаунта:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyTokenV1");

  const proxy = await upgrades.deployProxy(
    MyToken,
    [ethers.parseEther("1000000")],
    { initializer: "initialize" }
  );

  await proxy.waitForDeployment();

  console.log("Proxy задеплоен по адресу:", await proxy.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});