import contract from 'truffle-contract';
import Web3 from 'web3';
import tokenContractJson from '../../contracts/Token.json';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));

const TokenContract = contract(tokenContractJson);
TokenContract.setProvider(web3.currentProvider);

const accountNumber = process.env.ACCOUNT_NUMBER || 0;

export const mint = async (tokenId) => {
  const account = (await web3.eth.getAccounts())[accountNumber];
  const TokenContractInstance = await TokenContract.deployed();

  const response = await TokenContractInstance.mint(tokenId, { from: account });
  console.log(tokenId);
  console.log(response);
  return response;

}