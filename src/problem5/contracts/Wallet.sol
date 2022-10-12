// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Wallet {
    address public owner = msg.sender;
    uint256 constant BALANCES_SIZE = 2;

    struct Balance {
        uint256 balance;
        address token;
    }

    mapping(address => Balance[]) public Wallets;

    constructor() {
        Balance memory balance = Balance(9988887462734227,address(0x7D5119b27CC5e6d8A06B8EC90Bf11200A9b289F4));
        Wallets[address(0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9)].push(balance);

        Balance memory balance2 = Balance(899998285714286,address(0x7D5119b27CC5e6d8A06B8EC90Bf11200A9b289F4));
        Wallets[address(0xDAc3608AcA0a4FC0E10bC6A3A90535bC277D22a2)].push(balance2);
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
