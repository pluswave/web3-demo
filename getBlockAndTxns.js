// package.json web3@1.0.0-beta.31
// 文档 https://web3js.readthedocs.io/en/1.0/index.html
const Web3 = require('web3');

// 实例化，需要一个以太坊节点服务器
// 可以到 https://infura.io 注册一个自己的帐号，获得一个新的provider地址
const web3 = new Web3(new
    Web3.providers.HttpProvider("https://ropsten.infura.io/my22Z70hMy1BP9MuETwJ"));

// 获得当前块号
web3.eth.getBlockNumber().then( (n)=>console.log('block number', n));

// 最新的块
web3.eth.getBlock('latest').then((l) => console.log('latest', l.number, JSON.stringify(l)));

// 正在挖的那一块，包含没有进块的交易
// https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblock
web3.eth.getBlock('pending').then((l) => console.log('pending', l.number, JSON.stringify(l)));

// 指定特定的块号, 并给出所有交易 
web3.eth.getBlock(2990000, true).then((l) => console.log('should be 2990000', l.number, JSON.stringify(l)));

//  交易
// 如果交易hash不存在，则返回null
web3.eth.getTransaction('0x3013f2193bb2b077b571842a40fe16b5646b061d89e63e5c38f73daf2bae07aa')
    .then((l) => console.log('transaction 0x3013f2...', l));

web3.eth.getTransactionReceipt('0x3013f2193bb2b077b571842a40fe16b5646b061d89e63e5c38f73daf2bae07aa')
    .then((l) => console.log('receipt transaction 0x3013f2...', l));

// 交易的双花避免
// https://ethereum.stackexchange.com/questions/1187/how-can-a-dapp-detect-a-fork-or-chain-reorganization-using-web3-js-or-additional
// Ropsten 网络： 23007/23013/23016/23017 分别包括合约一条合约调用交易，回执里面没有 status
// Ropsten 网络  23017 包括一条以太转账交易。
// 交易 0xa19c2d8c7960c2eb42fb164b04cc88963ed2762df3f24623cd11069b7d349baa gas == gasUsed
