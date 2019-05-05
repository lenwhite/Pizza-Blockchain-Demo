import contract from 'truffle-contract';
import Web3 from 'web3';
import tokenContractJson from '../../contracts/Token.json';
import zlib from 'zlib';
import util from 'util';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));

const {
  hexToBytes,
  toHex,
  bytesToHex,
  BN
} = web3.utils;

const deflate = util.promisify(zlib.deflateRaw);
const inflate = util.promisify(zlib.inflateRaw);

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

  console.log('Connected to Token contract.');
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

    compressedData = (await deflate(compressedData)).toString('hex');

    compressedData = hexToBytes('0x' + compressedData);

    console.log(`Data length: ${compressedData.length}`);

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

export const getData = async (tokenId) => {
  const response = await TokenContractInstance.getData(tokenId);

  return JSON.parse(
    (await inflate(Buffer.from(response.slice(2), 'hex'))).toString()
  );
}
