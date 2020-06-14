pragma solidity ^0.4.24;


contract CampaignFactory {

    //已发布的众筹项目地址
    address[] public deployedCampaign;

    //创建众筹项目合约
    function createCampaign(uint _minimun) public {
        address newCampaign = new Campaign(_minimun, msg.sender);
        deployedCampaign.push(newCampaign);
    }

    //获取众筹项目地址列表
    function getDeployedCampaign() public view returns(address[]) {
        return deployedCampaign;
    }
}


contract Campaign {

    struct Request {
        //描述
        string discription;
        //总金额
        uint totalValue;
        //受益人地址
        address recipient;
        //项目是否完成
        bool complate;
        //支持的总人数
        uint approvalCount;
        //请求有多少人同意
        mapping(address => bool) approvers;
    }

    //管理者
    address public manager;
    //最小贡献量
    uint public minimumContribution;
    //所有已投资人地址
    mapping(address => bool) public approvers;
    //管理者已创建的请求
    Request[] public requests;
    //投资人总数量
    uint public approversCount;

    constructor(uint _minimun, address _address) public {
        manager = _address;
        minimumContribution = _minimun;
    }

    modifier restricted {
        require(msg.sender == manager);
        _;
    }

    //投资人投资 第一步
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    //创建请求 第二步
    function createRequest(string _discription, uint _value, address _addr) public restricted {
        Request memory req = Request({
            discription : _discription,
            totalValue : _value,
            recipient : _addr,
            complate : false,
            approvalCount : 0
        });

        requests.push(req);
    }

    //对请求投票 第三步
    function approvalRequest(uint _index) public {
        //对哪一个项目投票
        Request storage req = requests[_index];
        //判断是否存在已投资人列表中
        require(approvers[msg.sender]);
        //判断是否已投过票
        require(!req.approvers[msg.sender]);
        req.approvers[msg.sender] = true;
        req.approvalCount++;
    }

    //支持的人数超过一半，向受益人打款
    function finalizeRequest(uint _index) public restricted payable {
        //对哪一个项目投票
        Request storage req = requests[_index];
        //如果这个项目的此次请求已成功，此次请求不能继续，孟小飞添加
        require(!req.complate);
        //判断支持的人数超过一半
        require(req.approvalCount > approversCount/2);
        //对受益人转账
        req.recipient.transfer(req.totalValue);
        //并设置项目已完成
        req.complate = true;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address) {
        return (
            //最小贡献量
            minimumContribution,
            //合约总金额
            address(this).balance,
            //请求总数量
            requests.length,
            //已投资人总数
            approversCount,
            //管理员地址
            manager);
    }

    function getRequestCount() public view returns(uint) {
        return requests.length;
    }

}
