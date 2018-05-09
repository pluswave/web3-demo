'use strict'


const web3 = require('./web3-websocket-instance');
const poly_abi = require('./polyabi.json');

const keyStore = require('./from_address.json');
const toStore = require('./to_address.json');

const contract = new web3.eth.Contract(poly_abi, '0x96A62428509002a7aE5F6AD29E4750d852A3f3D7', {
    from: keyStore.address
})

function listenOnTransferEvents() {
    contract.events.Transfer({
        filter: { to: [toStore.address] },
    }).on('data', function (e) {
        console.log('data', e);
    }).on('changed', o => {
        console.log('changed', o);
    }).on('error', e => {
        console.log('error', e);
        listenOnTransferEvents();
    })
}

listenOnTransferEvents();