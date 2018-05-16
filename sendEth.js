const Prompt = require('prompt-password');
var prompt = new Prompt({
    type: 'password',
    message: '输入密码',
    name: 'password',
    mask: require('prompt-password-strength')
});

// var Accounts = require('web3-eth-accounts');
// var Tx = require('ethereumjs-tx');

const web3 = require('./web3-instance');

const accounts = web3.eth.accounts;



keyStore = require('./from_address.json');
prompt.run()
    .then(password => {
        var account = accounts.decrypt(keyStore, password);

        var keyStore_to = require('./to_address.json');
        sendEth(web3, account, '0x931D7e796984a15BEd2f89A796F44e6bDbb0117A', '0.008')
            .then((r)=>{
                console.log(r);
                process.exit(0);
            })
            .catch (e=>{
                console.error(e);
                process.exit(1);
            })
    })
    .catch((x) => {
        console.log(x)
        process.exit(1)
    })
// console.log(account3);

function sendEth(web3, fromAccount, toAddress, eth_amount) {

    var rawTx = {
        to: toAddress,
        from: fromAccount.address,
        nonce: '0x00',
        value: web3.utils.toWei(eth_amount),
        gasPrice: '0x09184e72a000',
        gasLimit: '21000', // 
    }


    return Promise.all([
        web3.eth.getGasPrice(),
        web3.eth.getTransactionCount(rawTx.from)
    ]).then((results) => {
        var price = results[0];
        var count = results[1];
        // var tx = new Tx(rawTx);

        rawTx.gasPrice = price;
        rawTx.nonce = count;
        console.log('gasPrice', price);
        return fromAccount.signTransaction(rawTx)



    }).then((tx) => {
        return web3.eth.sendSignedTransaction(tx.rawTransaction)
    })
}
