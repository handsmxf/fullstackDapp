//引入infura包
const HDWalletProvider = require('truffle-hdwallet-provider');
//引入web3
const Web3 = require('web3');

//引入已经编译好的合约工厂
const campaignFactory = require('./build/CampaignFactory.json');

//由Infura服务提供provider
const provider = new HDWalletProvider(
  //matamask助记词
  'dose wonder swallow medal famous apology tuna short quick choice magnet danger',
  //infura服务网址，这里选择ropsten
  'https://ropsten.infura.io/v3/70344c0d22294e0cbbfc488b3cd2da0b'
);

//创建provider
const web3 = new Web3(provider);

const deploy = async ()=>{
//获取账户信息列表（地址列表）
const accounts = await web3.eth.getAccounts();

const result = await new web3.eth.Contract(JSON.parse(campaignFactory.interface))
                .deploy({data:'0x' + campaignFactory.bytecode})
                .send({from:accounts[0],gas:'1000000'});
  console.log(result.options.address);
}

deploy();
