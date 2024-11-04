// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config"

const CoinFlipAttackModule = buildModule("CoinFlipAttackModule", (m) => {
  const coinFlipAddress = vars.get("COIN_FLIP_ADDRESS");

  if (!coinFlipAddress) {
    throw "Need to provide COIN_FLIP_ADDRESS";
  }

  const coinFlipAttack = m.contract("CoinFlipAttack", [coinFlipAddress], {
    value: 0n,
  });

  return { coinflip: coinFlipAttack };
});

export default CoinFlipAttackModule;
