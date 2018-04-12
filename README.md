# 以太坊客户端例子程序说明

## 上层独立功能文件

| 文件名 | 功能说明 |
|--------------|--------------------------|
| getBlockAndTxn.js | 获取区块和交易         |
| sendEth.js   | 从一个帐号发送ETH到另一个帐号 |
| sendErc20.js | 从一个帐号发送ERC20代币到另一个帐号 |
| getToken.js  | 智能合约调用例子：获取水龙头代币   |
| checkEth.js  | 查看帐号里面的ETH余额           |
| checkToken.js | 查看帐号里面的ERC20代币余额     |
| pastEvent.js  | 查看智能合约的历史事件          |
| subscribe_erc20_transfer.js | 监听ERC20的转账事件 |
| subscribe_eth_balance.js    | 监听某个地址的ETH余额 |

除了 subscribe_eth_balance.js 使用了parity特别的接口，其他的使用通用的接口。

## 底层库

| 文件名  | 说明   |
|--------|------------|
| web3-instance.js | web3实例，需要一个节点提供接口 |
| parity-instance.js | parity api 实例，同样需要一个节点(parity)提供接口 |
| polyabi.json       | poly智能合约的 ABI接口文件          |

## keystore文件

提供了两个keystore文件，加密存储以太坊私钥。运行有些例子时，可替换为自己掌握密码的keystore文件。