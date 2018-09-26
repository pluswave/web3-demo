const Prompt = require('prompt-password');
var prompt = new Prompt({
    type: 'password',
    message: '输入密码',
    name: 'password',
    mask: require('prompt-password-strength')
});

const web3 = require('./web3-instance-ropsten');

const accounts = web3.eth.accounts;



keyStore = require('./from_address.json');
toAddress = require('./to_address.json');
address3 = require('./address_3.json');
prompt.run()
    .then(password => {
        var account = accounts.decrypt(keyStore, password);
        var contract_def = require('./SimpleMultiSig.json');
        var contract = new web3.eth.Contract(contract_def.abi);
        var addresses = [keyStore.address, toAddress.address, address3.address];
        addresses.sort();
        // addresses = addresses.map( eb3.utils.toChecksumAddress );
        var data = contract.deploy({
            data: contract_def.bytecode,
            arguments: [2, addresses]
        }).encodeABI();
        return contractDeploy(web3, account, data);
    })
    .then( console.log)
    .catch((x) => {
        console.error(x)
        process.exit(1)
    })
// console.log(account3);

function contractDeploy(web3, account, data) {


    var rawTx = {
        // to: web3.utils.padRight('0x0', 40),
        from: account.address,
        nonce: '0x00',
        value: '0x',
        gasPrice: '0x5',
        gasLimit: '21000', // 
        data: data
    }

    return Promise.all([
        web3.eth.getGasPrice(),
        web3.eth.getTransactionCount(rawTx.from),
    ]).then((results) => {
        var price = results[0];
        var count = results[1];
        rawTx.gasLimit = 1000000;
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

