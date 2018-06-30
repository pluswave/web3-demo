
const Web3 = require('web3');

const web3 = new Web3(new
   Web3.providers.HttpProvider("https://ropsten.infura.io/PleaseUpdateWithYourKeyInsideInfura")
);

module.exports = web3;
