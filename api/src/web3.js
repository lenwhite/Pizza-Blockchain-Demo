import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));

export default web3
