import contract from 'truffle-contract';
import tokenContractJson from '../../contracts/Token.json';
import web3 from '../web3';
import zlib from 'zlib';
import util from 'util';

import CONFIG from '../CONFIG';

const {
  hexToBytes,
  toHex,
  bytesToHex,
  BN,
} = web3.utils;

const deflate = util.promisify(zlib.deflateRaw);
const inflate = util.promisify(zlib.inflateRaw);

const TokenContract = contract(tokenContractJson);
TokenContract.setProvider(web3.currentProvider);

let TokenContractInstance;

(async () => {
  const account = (await web3.eth.getAccounts())[0];

  TokenContract.defaults({
    from: account,
    gas: 999999,
    gasPrice: 0,
  });

  TokenContractInstance = await TokenContract.deployed();

  console.log('Connected to Token contract.');
})().catch(err => {
  console.error('Failed to connect to Token contract.');
  console.error(err);
});

export const mint = async (tokenId, data, user) => {
  TokenContract.defaults({ from: CONFIG[user].address });

  let response;
  if (!data) {
    response = await TokenContractInstance.mint(tokenId);
  } else {
    let compressedData = JSON.stringify(data);

    compressedData = (await deflate(compressedData)).toString('hex');

    compressedData = hexToBytes('0x' + compressedData);

    response = await TokenContractInstance.mint(
      tokenId, compressedData
    );
  }

  return response;
};

export const setData = async (tokenId, data, user) => {
  TokenContract.defaults({ from: CONFIG[user].address });

  let compressedData = JSON.stringify(data);

  compressedData = (await deflate(compressedData)).toString('hex');

  compressedData = hexToBytes('0x' + compressedData);

  let response = await TokenContractInstance.setData(
    tokenId, compressedData
  );

  return response;
}

export const burn = async (tokenId, user) => {
  TokenContract.defaults({ from: CONFIG[user].address });

  const response = await TokenContractInstance.burn(tokenId);

  return response;
};

export const getData = async (tokenId, user) => {
  TokenContract.defaults({ from: CONFIG[user].address });

  const response = await TokenContractInstance.getData(tokenId);

  if (response) {
    return JSON.parse(
      (await inflate(Buffer.from(response.slice(2), 'hex'))).toString()
    );
  } else {
    return null;
  };
};

export const transfer = async (tokenId, toAddress, user) => {
  TokenContract.defaults({ from: CONFIG[user].address });

  const response = await TokenContractInstance.transfer(toAddress, tokenId);

  return response;
}

export const tokensOwned = async (user) => {
  TokenContract.defaults({ from: CONFIG[user].address });

  const response = await TokenContractInstance.tokensOwned();

  if (!response) return null;

  let tokens = {};

  for (const tokenId of response.map(BN => BN.toNumber())) {
    tokens[tokenId] = await getData(tokenId, user);
  };

  return tokens;
}
