import contract from 'truffle-contract';
import Web3 from 'web3';
import tokenContractJson from '../../contracts/Token.json';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));

const TokenContract = contract(tokenContractJson);
TokenContract.setProvider(web3.currentProvider);

const accountNumber = process.env.ACCOUNT_NUMBER || 0;

export const mint = async (tokenId, body) => {
  const account = (await web3.eth.getAccounts())[accountNumber];
  const TokenContractInstance = await TokenContract.deployed();
  let response;
  if (!body) {
    response = await TokenContractInstance.mint(tokenId, { from: account });
  }

  return response;
};

export const burn = async (tokenId) => {
  const account = (await web3.eth.getAccounts())[accountNumber];
  const TokenContractInstance = await TokenContract.deployed();

  const response = await TokenContractInstance.burn(tokenId, { from: account });

  return response;
};