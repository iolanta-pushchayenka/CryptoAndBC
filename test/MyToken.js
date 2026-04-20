const { expect } = require("chai");

describe("MyToken", function () {

  it("Should deploy with correct initial supply", async function () {
    const [owner] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(ethers.parseEther("1000"));

    await token.waitForDeployment();

    const balance = await token.balanceOf(owner.address);

    expect(balance).to.equal(ethers.parseEther("1000"));
  });


  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(ethers.parseEther("1000"));

    await token.waitForDeployment();

    await token.transfer(addr1.address, ethers.parseEther("100"));

    const balance = await token.balanceOf(addr1.address);

    expect(balance).to.equal(ethers.parseEther("100"));
  });


  it("Should fail if sender doesn’t have enough tokens", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(ethers.parseEther("100"));

    await token.waitForDeployment();

    await expect(
      token.connect(addr1).transfer(owner.address, ethers.parseEther("10"))
    ).to.be.reverted;
  });


  it("Should allow owner to mint tokens", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(ethers.parseEther("100"));

    await token.waitForDeployment();

    await token.mint(addr1.address, ethers.parseEther("50"));

    const balance = await token.balanceOf(addr1.address);

    expect(balance).to.equal(ethers.parseEther("50"));
  });


  it("Should NOT allow non-owner to mint", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(ethers.parseEther("100"));

    await token.waitForDeployment();

    await expect(
      token.connect(addr1).mint(addr1.address, ethers.parseEther("50"))
    ).to.be.reverted;
  });

});