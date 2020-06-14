//立即执行导入的函数，再返回routes对象
const routes = require('next-routes');

module.exports = routes()
.add('/campaign/new','campaign/new')
.add('/campaign/:address','/campaign/show')
.add('/campaign/:address/requests','campaign/requests/index')
.add('/campaign/:address/requests/new','campaign/requests/new')
