'use strict';

const web3 = require('./web3-instance');

const accounts = web3.eth.accounts;

const poly_abi = require('./polyabi.json');

var keyStore_from = require('./from_address.json');
var keyStore_to = require('./to_address.json');
const contract = new web3.eth.Contract(poly_abi, '0x96A62428509002a7aE5F6AD29E4750d852A3f3D7', {
    from: keyStore_from.address
})

const method = contract.methods.transfer(keyStore_to.address, 1e17);

const data = method.encodeABI();

console.log(data);

function generateHashTable(){
    var hashTable = {};
    poly_abi.forEach( func_def =>{
        var hash = web3.eth.abi.encodeFunctionSignature(func_def);
        hashTable[hash] = func_def;
    });
    return hashTable;
}

const hashTable = generateHashTable();

console.log(hashTable);


var func_bin = data.substring(0,10);

console.log(func_bin, hashTable[func_bin]);

var params_bin = data.substring(10);

console.log('params', web3.eth.abi.decodeParameters(hashTable[func_bin].inputs,  params_bin));