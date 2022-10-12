# Problem 5: Utility Contract

## To test the contract

1. Install packages - `npm install`
2. Start the HardHat server - `npx hardhat node`
3. On a 2nd terminal, deploy contract -`npx hardhat run --network localhost scripts/deploy.js`, take note of the wallet address
4. In test.js, Replace `ADDR` - the contract address variable, with the deployed address from Step 3.
5. Run test script - `node test.js`
