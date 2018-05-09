'use strict'

const api = require('./parity-instance');
const web3 = require('./web3-websocket-instance');
//console.log(api.parity);

// console.log(api.pubsub);

const keyStore = require('./from_address.json');

function balanceChange(err, balance ){
    if( !err ){
        console.log("balance", web3.utils.fromWei(balance));
    }
}

const pubsub = api.pubsub;

const parity = api.pubsub.parity;

const subscription = parity.addListener('parity','eth_getBalance',balanceChange, ['0x' + keyStore.address]  )

console.log(subscription);
// const subscription2 = parity.subscribe('eth_getBalance',balanceChange, ['0x' + keyStore.address]  )
