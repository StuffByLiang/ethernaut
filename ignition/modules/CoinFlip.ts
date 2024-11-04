// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CoinFlipModule = buildModule("CoinFlipModule", (m) => {

  const coinflip = m.contract("CoinFlip", [], {
    value: 0n,
  });

  return { coinflip };
});

export default CoinFlipModule;