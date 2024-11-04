import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("TelephoneAttack", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTelephoneAndAttack() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Telephone = await hre.ethers.getContractFactory("Telephone");
    const telephone = await Telephone.deploy();

    const TelephoneAttack = await hre.ethers.getContractFactory("TelephoneAttack");
    const telephoneAttack = await TelephoneAttack.deploy(await telephone.getAddress(), otherAccount);

    return { owner, otherAccount, telephone, telephoneAttack };
  }

  describe("Attack", function () {
    it("Succesfully changes the owner", async function () {
      const { owner, otherAccount, telephone, telephoneAttack } = await loadFixture(deployTelephoneAndAttack);
      expect(await telephone.owner()).to.equal(owner);
      await telephoneAttack.attack();
      expect(await telephone.owner()).to.equal(otherAccount);
    });

  });
});
