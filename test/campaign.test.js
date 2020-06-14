const assert = require('assert');
const Web3 = require('web3');
const ganache = require('ganache-cli');

const web3 = new Web3(ganache.provider());

const compileCampaign = require('../ethereum/build/Campaign.json');
const compileFactory = require('../ethereum/build/CampaignFactory.json');

//账户列表
var accounts;
//众筹项目地址
var campaignAdress;
//factory合约
var factory;
//campaign合约
var campaign;

beforeEach(async()=>{
  //获取账户列表
  accounts = await web3.eth.getAccounts();

  //实例化factory合约，deploy方法中bytecode是不带‘0x’的字符，所以要在前面固定加上
  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
            .deploy({data:'0x' + compileFactory.bytecode}).send({from:accounts[0],gas:'1000000'});
  //调用创建众筹项目
  await factory.methods.createCampaign('200').send({from:accounts[0],gas:'1000000'});
  //返回的数组第一个元素赋值给campaignAdress，使用[]包裹起来。静态的方法需要在后面添加call()函数
  [campaignAdress] = await factory.methods.getDeployedCampaign().call();
  //实例化campaign合约(因为已经部署了factory合约，所以这里只需要传递众筹的地址，就可以构建众筹实例)
  campaign = await new web3.eth.Contract(JSON.parse(compileCampaign.interface),campaignAdress);

})
//mocha框架主函数
describe('campaign',()=>{
  it('deploy factory and campaign',()=>{
    //判断对象是否存在
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('验证管理员账号：',async ()=>{
    const manager = await campaign.methods.manager().call();
    assert(manager,accounts[0]);
  });

  it('验证投资人投资(额度大于最小额度)：',async ()=>{
    await campaign.methods.contribute().send({
      from : accounts[1],
      value : 250
    });

    const isContribute = campaign.methods.approvers(accounts[1]).call();
    assert(isContribute);
  });

  it('验证投资人投资(额度小于最小额度)：',async ()=>{
    try {
      await campaign.methods.contribute().send({
        from : accounts[1],
        value : 5
      });

      const isContribute = campaign.methods.approvers(accounts[1]).call();
      assert(isContribute);
    } catch (e) {
      assert(e);
    }
  });

  it('验证请求：',async ()=>{
    await campaign.methods.createRequest('buy pigs',400,accounts[1]).send({
      from : accounts[0],
      gas : '1000000'
    });

    const requests = campaign.methods.requests(accounts[1]).call();
    assert('buy pigs',requests.discription);
  });

})
