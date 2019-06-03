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
### 1. BlockChain ID Validation Request
```
curl -X POST localhost:8000/requestValidation -H "Content-Type: application/x-www-form-urlencoded" -d "address=17uaMkikvz8nnphnSTnTgMmGAAq6K2HG6d"
>> {"walletAddress":"17uaMkikvz8nnphnSTnTgMmGAAq6K2HG6d","requestTimeStamp":"1559565922","message":"17uaMkikvz8nnphnSTnTgMmGAAq6K2HG6d:1559565922:starRegistry","validationWindow":300}

```
### 2. Blockchain ID message signature validation
![Screenshot1](https://github.com/ssisksl77/Udacity-BlockChain-Nanodegree/blob/master/Project_4/image/electrum.png)
```
curl -X POST localhost:8000/message-signature/validate -H "Content-Type: application/x-www-form-urlencoded" \
-d "address=17uaMkikvz8nnphnSTnTgMmGAAq6K2HG6d&signature=H4+2FvyQZD5dwaguGBWjlyMhKUnQjRuRqZTgbRqOFde2MEs7G6vjTkOprJ5r/GsHSYQiOxHpgUSRKidiZlqdrsk="
>> {"walletAddress":"17uaMkikvz8nnphnSTnTgMmGAAq6K2HG6d","requestTimeStamp":"1559567338","message":"17uaMkikvz8nnphnSTnTgMmGAAq6K2HG6d:1559567338:starRegistry","validationWindow":179}
```

### 3.add Star Data

![Screenshot2](https://github.com/ssisksl77/Udacity-BlockChain-Nanodegree/blob/master/Project_4/image/addStar.png)


Result Should be

![Screenshot3](https://github.com/ssisksl77/Udacity-BlockChain-Nanodegree/blob/master/Project_4/image/addStarResult.png)

