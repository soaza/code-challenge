// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Wallet {
    address public owner = msg.sender;
    uint256 constant BALANCES_SIZE = 10;

    struct Balance {
        uint256 balance;
        address token;
    }

    mapping(address => Balance[]) public Wallets;

    constructor() {
        for(uint256 i = 0;i < BALANCES_SIZE;i++){
            address random_wallet_address = address(uint160(uint(keccak256(abi.encodePacked(blockhash(block.number))))));
            address random_token_address = address(uint160(uint(keccak256(abi.encodePacked(blockhash(block.number))))));

            Balance memory balance = Balance(0,random_token_address);
            Wallets[random_wallet_address].push(balance);
        }

    }

    function contains(address _address) private view returns (bool) {
        if (Wallets[_address].length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function getBalances(
        address wallet_address,
        address[] memory token_addresses
    ) public view returns (Balance[] memory) {
        Balance[] memory out_balances = new Balance[](BALANCES_SIZE);

        uint c = 0; // counter

        for (uint256 i = 0; i < token_addresses.length; i++) {
            if (contains(wallet_address)) {
                Balance[] memory balances = Wallets[wallet_address];
                out_balances[c] = balances[0];
                c ++;
            }
        }
        return out_balances;
    }
}
