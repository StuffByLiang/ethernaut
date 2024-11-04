// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config"

const TelephoneAttackModule = buildModule("TelephoneAttackModule", (m) => {
  const telephoneAddress = vars.get("TELEPHONE_ADDRESS");
  const ownerAddress = vars.get("OWNER_ADDRESS");

  const telephoneAttack = m.contract("TelephoneAttack", [telephoneAddress, ownerAddress], {
    value: 0n,
  });

  return { telephoneAttack };
});

export default TelephoneAttackModule;
