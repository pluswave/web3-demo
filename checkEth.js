// https://ropsten.etherscan.io/address/0x96a62428509002a7ae5f6ad29e4750d852a3f3d7#code

const web3 = require('./web3-instance');

const accounts = web3.eth.accounts;

const keyStore = require('./from_address.json');

web3.eth.getBalance(keyStore.address)
    .then( (b)=>{
        console.log(keyStore.address, b, web3.utils.fromWei(b))
    })
