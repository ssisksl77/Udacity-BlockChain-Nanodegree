# Udacity Block Chain NanoDegree Project
## Simple Block Chain Rest API with Node.js & Express.js
This Project describe a simple block-chain web app.

## Architecture
* index.js : start server and delegate route url
* BlockController.js : route url
* Block.js : create, retrieve, add block
* levelSandbox : using leveldb it stores block data ('./chaindata')

## Dependencies
* body-parser : 1.19.0
* crypto-js : 3.1.9-1
* express : 4.17.0
* level : 5.0.1

## Getting started
```
npm install
npm start
```

## Testing
Get Block By Height
```
curl -X POST localhost:8000/api/block -H "Content-Type: application/x-www-form-urlencoded" -d "data=This is My Post Block Test"
>> {"hash":"140e4decf877ddee359dfda95dfd6fc7845696075bd99291c61e793b4e6aa8c5","height":0,"body":"This is My Post Block Test","time":"1558530905","previousBlockHash":""}

curl -X POST localhost:8000/api/block -H "Content-Type: application/x-www-form-urlencoded" -d "data=This is My Post Block Test2"
{"hash":"0ee3e8a519693c51674f0c45be9634aa1288f9c7c78a6818d2380f8d803a478a","height":1,"body":"This is My Post Block Test2","time":"1558530920","previousBlockHash":"140e4decf877ddee359dfda95dfd6fc7845696075bd99291c61e793b4e6aa8c5"}
```

Add Block 
```
curl -X GET localhost:8000/api/block/0
>> {"hash":"140e4decf877ddee359dfda95dfd6fc7845696075bd99291c61e793b4e6aa8c5","height":0,"body":"This is My Post Block Test","time":"1558530905","previousBlockHash":""}

Add RequestBlock
curl -X POST localhost:8000/requestValidation -H "Content-Type: application/x-www-form-urlencoded" -d "address=19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL"
{"walletAddress":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL","requestTimeStamp":"1559373026","message":"19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL:1559373026:starRegistry","validationWindow":300}

Validate Request
curl -X POST localhost:8000/message-signature/validate -H "Content-Type: application/x-www-form-urlencoded" -d "address=19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL&signature=H8K4+1MvyJo9tcr2YN2KejwvX1oqneyCH+fsUL1z1WBdWmswB9bijeFfOfMqK68kQ5RO6ZxhomoXQG3fkLaBl+Q="

```