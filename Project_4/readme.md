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

### 4. getBlock By Hash
```
curl -X GET http://localhost:8000/stars/hash:c81fafd3edb6b0f5a23ed79bed993339d3307cddebd0636a9f4a55fec30b845d
>> {"hash":"c81fafd3edb6b0f5a23ed79bed993339d3307cddebd0636a9f4a55fec30b845d","height":7,"body":{"address":"17uaMkikvz8nnphnSTnTgMmGAAq6K2HG6d","star":{"dec":"68° 52' 56.9","ra":"16h 29m 1.0s","story":"34363666373536653634323037333734363137323230373537333639366536373230363837343734373037333361326632663737373737373265363736663666363736633635326536333666366432663733366237393266","storyDecoded":"466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"}},"time":"1559564829","previousBlockHash":"2118e8e2d6a89074d0296619c5482169bd73b4b447eb774be97f829c87f82137"}
```
