import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("CoinFlipAttack", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCoinFlipAndAttacj() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const CoinFlip = await hre.ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();

    const CoinFlipAttack = await hre.ethers.getContractFactory("CoinFlipAttack");
    const coinFlipAttack = await CoinFlipAttack.deploy(await coinFlip.getAddress());

    return { owner, otherAccount, coinFlip, coinFlipAttack };
  }

  describe("Deployment", function () {
    it("Guess the correct", async function () {
      const { owner, otherAccount, coinFlip, coinFlipAttack } = await loadFixture(deployCoinFlipAndAttacj);

      for (let i = 0; i < 10; i++) {
        await coinFlipAttack.attack();
      }
      expect(await coinFlip.consecutiveWins()).to.equal(10);
    });

  });
});
