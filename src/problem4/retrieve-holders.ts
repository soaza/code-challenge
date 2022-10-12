import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);

const ERC20_ABI = ["function balanceOf(address) view returns (uint)"];

const address = "0xC0ECB8499D8dA2771aBCbF4091DB7f65158f1468"; // SWTH Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  const addresses = [
    "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
    "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
    "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392",
  ];

  addresses.forEach(async (address) => {
    const balance = await contract.balanceOf(address);
    console.log(
      `Address: ${address} Balance: ${ethers.utils.formatEther(balance)}`
    );
  });
};

main();
