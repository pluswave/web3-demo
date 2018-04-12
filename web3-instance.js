
const Web3 = require('web3');

const web3 = new Web3(new
    // Web3.providers.HttpProvider("https://ropsten.infura.io/my22Z70hMy1BP9MuETwJ")
    // Web3.providers.HttpProvider("http://127.0.0.1:8645")
    Web3.providers.WebsocketProvider("ws://127.0.0.1:8646")
);

module.exports = web3;
