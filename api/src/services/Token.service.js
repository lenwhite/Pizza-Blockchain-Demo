import contract from 'truffle-contract';
import Web3 from 'web3';
import tokenContractJson from '../../contracts/Token.json';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));

const {
  hexToBytes,
  toHex,
  bytesToHex,
  BN
} = web3.utils;

const TokenContract = contract(tokenContractJson);
TokenContract.setProvider(web3.currentProvider);

const accountNumber = process.env.ACCOUNT_NUMBER || 0;

let TokenContractInstance;
(async () => {
  const account = (await web3.eth.getAccounts())[accountNumber];

  TokenContract.defaults({
    from: account,
    gas: 999999,
    gasPrice: 0,
  })

  TokenContractInstance = await TokenContract.deployed();

  console.log('Successfully connected to Token contract.');
})().catch(err => {
  console.error('Failed to connect to Token contract.');
  console.error(err);
});

export const mint = async (tokenId, data) => {
  let response;
  if (!data) {
    response = await TokenContractInstance.mint(tokenId);
  } else {
    let compressedData = JSON.stringify(data);
    compressedData = hexToBytes(toHex(compressedData));

    response = await TokenContractInstance.mint(
      tokenId, compressedData
    );
  }

  return response;
};

export const burn = async (tokenId) => {
  const response = await TokenContractInstance.burn(tokenId);

  return response;
};
