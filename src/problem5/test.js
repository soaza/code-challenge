const { ethers } = require("ethers");

const ADDR = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // your contract address
const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "Balances",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet_address",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "token_addresses",
        type: "address[]",
      },
    ],
    name: "getBalances",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        internalType: "struct Wallet.Balance[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // some wallet address with token balance
const TOKENS = [
  // token contract addresses
  "0x7D5119b27CC5e6d8A06B8EC90Bf11200A9b289F4",
  "0xDAc3608AcA0a4FC0E10bC6A3A90535bC277D22a2",
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = ethers.providers.getDefaultProvider();

const test = async () => {
  const contract = new ethers.Contract(ADDR, ABI, provider);

  const balances = await contract.getBalances(ADDRESS, TOKENS);

  return balances;
};

test().then(console.log);
