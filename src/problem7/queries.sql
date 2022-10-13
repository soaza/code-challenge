 --------------SCHEMA QUERIES --------------

CREATE TYPE VALID_DENOM AS ENUM ('usdc', 'swth', 'tmz');

CREATE TABLE Balances(
    id SERIAL PRIMARY KEY,
    address VARCHAR(128),
    denom VALID_DENOM,
    amount BIGINT,
    block_height INT
);

CREATE TABLE Trades(
  id SERIAL PRIMARY KEY,
  address VARCHAR(128),
  denom VALID_DENOM,
  amount BIGINT,
  block_height INT
);

 --------------SEED QUERIES --------------

INSERT INTO Balances VALUES (DEFAULT,'0xabab','usdc',50000000000000,733755);
INSERT INTO Balances VALUES (DEFAULT,'0xabab','usdc',-50000000000,733756);
INSERT INTO Balances VALUES (DEFAULT,'0x99cc','usdc',3500000000000,733757);
-- 0x67f3 has total balance less than $500
INSERT INTO Balances VALUES (DEFAULT,'0x67f3','tmz',72000,733760);
INSERT INTO Balances VALUES (DEFAULT,'0x67f3','tmz',5000,733761);


INSERT INTO Trades VALUES (DEFAULT,'0x99cc','usdc',3500000000000,733757);
INSERT INTO Trades VALUES (DEFAULT,'0x67f3','swth',72000000000000,733758);
-- NOT RECENTLY MADE TRADES
INSERT INTO Trades VALUES (DEFAULT,'0xabab','swth',72000000000000,720000);
INSERT INTO Trades VALUES (DEFAULT,'0xabab','usdc',72000000000000,720001);
INSERT INTO Trades VALUES (DEFAULT,'0xabab','tmz',72000000000000,720002);

 --------------QUERY --------------
-- Write an sql query that returns the the list of addresses which has recently made a trade, and wallet has at least $500 (total balance) in it.
-- *We should expect only 0x99cc as 0xabab did not make a trade recently and 0x67f3 has total balance < 500


SELECT address as queried_accounts from 
(
-- calculate total_balance
SELECT address,
CASE WHEN denom = 'usdc' THEN sum_amount * 0.000001
    WHEN denom = 'swth' THEN sum_amount * 0.00000005
    WHEN denom = 'tmz' THEN sum_amount * 0.003 
    END as denom_balance,denom
FROM
(
-- GROUP BY individual account and their denom with their respective sum
SELECT address,denom,SUM(amount) AS sum_amount 
from Balances 
GROUP BY  address,denom 
-- SELECT addresses where block height > 730,000
HAVING address IN (SELECT address FROM Trades WHERE block_height > 730000)) 
AS x
) 
-- SELECT accounts with total sum >= 500
AS y GROUP BY address HAVING SUM(denom_balance) >= 500;