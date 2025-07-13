// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "hardhat/console.sol";
contract HelloWorld {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }

    function setMessage(string memory newMessage) public {
        console.log("%s this is change %s",message,newMessage);
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}