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