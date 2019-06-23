var Web3 = require('web3');
var web3 = new Web3('HTTP://127.0.0.1:7545');

web3.eth.getTransactionCount('0xf6570403365befAfb000502063b3044E28bfE3bF').then(console.log);