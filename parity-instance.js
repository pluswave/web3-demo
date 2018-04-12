
'use strict';

const Api = require('@parity/api');

const api = new Api(new 
    // Api.Provider.Http("https://ropsten.infura.io/my22Z70hMy1BP9MuETwJ")
    // Api.Provider.Http("http://127.0.0.1:8645")
    Api.Provider.Ws("ws://127.0.0.1:8646")
);

module.exports = api;
