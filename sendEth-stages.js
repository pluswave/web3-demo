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
        var tryIndex = 0;
        function _internalSend(){
            generateSignedTransaction(web3, account, keyStore_to.address, '0.005')
                .then(signedTx =>{
                    console.log(signedTx);
                    web3.eth.sendSignedTransaction(signedTx)
                        .on('transactionHash', (hash)=>{
                            console.log('hash', hash);
                        })
                        .on('receipt', receipt=>{
                            console.log('receipt', JSON.stringify(receipt, null ,2))
                        })
                        .on('confirmation', (n, receipt) =>{
                            console.log('confirmation', n, receipt);
                        })
                        .on('error', (err)=>{
                            _internalSend();
                        })
                })
                .catch( e=>{
                    console.log(tryIndex++, e);
                    setTimeout(_internalSend, 3000);
                })
        }
        _internalSend();

    })
    .catch((x) => {
        console.log(x)
        process.exit(1)
    })
// console.log(account3);

function generateSignedTransaction(web3, fromAccount, toAddress, eth_amount) {

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

        rawTx.gasPrice = price / 20;
        rawTx.nonce = count;
        console.log('gasPrice', price);
        return fromAccount.signTransaction(rawTx)
    }).then(tx => {
        return tx.rawTransaction
    });
}
