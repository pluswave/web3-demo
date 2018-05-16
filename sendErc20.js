// https://ropsten.etherscan.io/address/0x96a62428509002a7ae5f6ad29e4750d852a3f3d7#code

const Prompt = require('prompt-password');
var prompt = new Prompt({
    type: 'password',
    message: '输入密码',
    name: 'password',
    mask: require('prompt-password-strength')
});

const web3 = require('./web3-instance');

const accounts = web3.eth.accounts;

const poly_abi = require('./polyabi.json');

const keyStore = require('./from_address.json');

prompt.run()
    .then(password => {
        var account = accounts.decrypt(keyStore, password);

        var keyStore_to = require('./to_address.json');
        const contract = new web3.eth.Contract(poly_abi, '0x96A62428509002a7aE5F6AD29E4750d852A3f3D7', {
            from: account.address
        })
        
        const method = contract.methods.transfer('0x931D7e796984a15BEd2f89A796F44e6bDbb0117A', '' + 1e17);
        contractExecute(web3, account, contract, method)
            .then( (r)=>{
                console.log('success', r);
                process.exit(0);
            })
            .catch( (e)=>{
                console.log('error', e);
                process.exit(1);
            })
    })
    .catch((x) => {
        console.log(x)
        process.exit(1)
    })







function contractExecute(web3, account, contract, method) {


    var rawTx = {
        to: contract.options.address,
        from: account.address,
        nonce: '0x00',
        value: '0x',
        gasPrice: '0x5',
        gasLimit: '21000', // 
        data: method.encodeABI()
    }

    return Promise.all([
        web3.eth.getGasPrice(),
        web3.eth.getTransactionCount(rawTx.from),
        method.estimateGas()
    ]).then((results) => {
        var price = results[0];
        var count = results[1];
        // var tx = new Tx(rawTx);
        rawTx.gasLimit = results[2] * 2;
        rawTx.gasPrice = price;
        rawTx.nonce = count;
        console.log('gasPrice', price);
        console.log('gasLimit', rawTx.gasLimit);
        return account.signTransaction(rawTx)



    }).then((tx) => {
        console.log(tx);
        return web3.eth.sendSignedTransaction(tx.rawTransaction)
    })
}
