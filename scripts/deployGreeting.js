const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    const Greeting = await ethers.getContractFactory("Greeting");

    const greeting = await Greeting.deploy("Ialanta"); 

    await greeting.waitForDeployment();

    console.log("Greeting deployed to:", await greeting.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });