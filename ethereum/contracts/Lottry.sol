pragma solidity ^0.4.23;


contract Lottry {
  //管理者
    address public manager;
  //玩家
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

  //加入游戏
    function enter() public payable {
    //参与者参与的同时验资，满足才允许成为玩家
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }

  //随机数
    function random() public view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    modifier restricted() {
    //验证当前是否为管理者
        require(msg.sender == manager);
        _;
    }

  //摇奖
    function pickwiner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players.length = 0;
    }

    function getPlayersLength() public view returns(uint) {
        return players.length;
    }

    function getPlayers() public view returns(address[]) {
        return players;
    }
}
