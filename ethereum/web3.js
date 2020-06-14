import Web3 from 'web3';

//const web3 = new Web3(window.web3.currentProvider);

var web3;
if(typeof window != "undefined" && window.web3 != "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/70344c0d22294e0cbbfc488b3cd2da0b'
  );
  web3 = new Web3(provider);
}
// console.log(1);
// console.log(web3.eth.getAccounts());
// console.log(2);

export default web3;
