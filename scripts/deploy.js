const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Деплой с аккаунта:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");

    const myToken = await MyToken.deploy(
        ethers.parseEther("1000000") 
    );

    await myToken.waitForDeployment();

    console.log("Контракт задеплоен:", await myToken.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});