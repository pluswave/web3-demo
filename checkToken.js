// https://ropsten.etherscan.io/address/0x96a62428509002a7ae5f6ad29e4750d852a3f3d7#code

const web3 = require('./web3-instance');

const accounts = web3.eth.accounts;

const poly_abi = require('./polyabi.json');

const keyStore = require('./from_address.json');

const contract = new web3.eth.Contract(poly_abi, '0x96A62428509002a7aE5F6AD29E4750d852A3f3D7', {
    from: keyStore.address
})

contract.methods.balanceOf(keyStore.address).call()
    .then( (b)=>{
        console.log('balance', b);

    });

contract.methods.decimals().call()
 .then( (b)=>{
    console.log('decimal', b);
});
