
const Web3 = require('web3');

var wsProvider = new Web3.providers.WebsocketProvider("wss://parity.ropsten.magicw.net/ws");

const web3 = new Web3(
    //new Web3.providers.HttpProvider("https://ropsten.infura.io/my22Z70hMy1BP9MuETwJ")
    //new Web3.providers.HttpProvider("http://127.0.0.1:8645")
    wsProvider
);

wsProvider.on('error', reConnect);

wsProvider.on('end', ()=>{
    console.log('connection closed');
    reConnect();
});

function reConnect(e) {
    setTimeout(() => {
        wsProvider = new Web3.providers.WebsocketProvider("wss://parity.ropsten.magicw.net/ws");
        web3.setProvider(wsProvider);
        wsProvider.on('error', reConnect);
    }, 3000);
}

module.exports = web3;
