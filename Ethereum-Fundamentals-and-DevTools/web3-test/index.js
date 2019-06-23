var Web3 = require('web3');

var url = 'HTTP://127.0.0.1:7545'; // ganache-cli
var EthereumTransaction = require("ethereumjs-tx").Transaction;
var web3 = new Web3(url);
//web3.eth.getAccounts().then(acc => console.log(acc) );

var sendingAddress = '0xf6570403365befAfb000502063b3044E28bfE3bF';
var receivingAddress = '0x9A9d8Ab6206DD8e2e393d98c20c10E1501DfD731';

//web3.eth.getBalance(sendingAddress).then(console.log);
//web3.eth.getBalance(receivingAddress).then(console.log);

var rawTransaction = { 
	nonce: 1, 
    to: receivingAddress, 
   	gasPrice: 20000000, 
  	gasLimit: 30000, 
  	value: 100, 
  	data: "" 
};
// -- Step 7: Sign the transaction with the Hex value of the private key of the sender 

// var privateKeySender = '8ef2f6ed86f1a6c817161d889fabc9c5f8a75eeb068227c41d4fd1a9a33d16ca' ;
// var privateKeySenderHex = Buffer.from(privateKeySender, 'hex'); 
// var transaction = new EthereumTransaction(rawTransaction);
// transaction.sign(privateKeySenderHex);


// -- Step 8: Send the serialized signed transaction to the Ethereum network. 
//var serializedTransaction = transaction.serialize(); 
//web3.eth.sendSignedTransaction(serializedTransaction);
///web3.eth.getBalance(sendingAddress).then(console.log)
// web3.eth.getBalance(receivingAddress).then(console.log)

