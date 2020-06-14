//引入path
const path = require('path');
//引入solc编译器
const solc = require('solc');
//引入fs-extra文件工具包
const fs = require('fs-extra');
//编译文件存在目录
const buildPath = path.resolve(__dirname,'build');
//先删除这个目录
fs.removeSync(buildPath);
//获取合约文件地址
const campaignParh = path.resolve(__dirname,'contracts','Campaign.sol');
//读取这个文件合约文件
const source = fs.readFileSync(campaignParh,'utf-8');
//编译合约文件并输出
const output = solc.compile(source,1).contracts;
//确保文件夹存在(文件夹目录结构没有会新建)
fs.ensureDirSync(buildPath);
//遍历合约文件中的contracts
for (let contract in output) {
  //写json文件(目录结构没有会新建)
  fs.outputJsonSync(path.resolve(buildPath , contract.replace(':','') + '.json'),output[contract]);
}
