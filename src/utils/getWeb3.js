import Web3 from 'web3';
import { Platform } from 'react-native';
import Promise from 'bluebird';
import HDWalletProvider from 'truffle-hdwallet-provider';
//import { ROPSTEN_RPC_URL } from './config';

const getWeb3 = (mnemonic, rpcUrl) => {
  if (!mnemonic) {
    //mnemonic = 'knee violin certain rebuild rival couch wonder bind bridge delay tourist poet';
    mnemonic = 'involve risk sponsor firm october measure loud despair orchard celery track normal';
  }

  if(!rpcUrl) {
    rpcUrl = 'http://localhost:8545/';
  }
  
  // iOS and Android have different host computer hostnames.
  var testRpcUrl = '10.0.2.2';

  if (Platform.OS === 'ios') {
    testRpcUrl = 'localhost';
  }

  //var provider = new Web3.providers.HttpProvider(rpcUrl);
  // var provider = new HDWalletProvider('knee violin certain rebuild rival couch wonder bind bridge delay tourist poet', 'https://ropsten.infura.io/');
  //const provider = new HDWalletProvider(mnemonic, rpcUrl);

  //const web3 = new Web3(provider);
  //let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  //const mnemonic = 'involve risk sponsor firm october measure loud despair orchard celery track normal';
  var provider = new HDWalletProvider(mnemonic, "http://10.0.2.2:8545");
  const web3 = new Web3(provider);
  if (typeof web3.eth.getAccountsPromise === "undefined") {
    Promise.promisifyAll(web3.eth, { suffix: "Promise" });
  }
  return web3;
};

export default getWeb3;
