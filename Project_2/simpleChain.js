/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');
const levelSandbox = require('./levelSandbox.js')

/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block {
  constructor(data) {
    this.hash = "",
      this.height = 0,
      this.body = data,
      this.time = 0,
      this.previousBlockHash = ""
  }
}

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain {
  constructor() {
    //this.chain = [];
    //this.addBlock(new Block("First block in the chain - Genesis block"));
    let newBlock = new Block("First block in the chain - Genesis block");
    this.getBlockHeight().then(height => {
      if (height == 0) {
        addBlock(newBlock);
      }
    });
  }

  // Add new block
  addBlock(newBlock) {
    let self = this;
    // Block height
    return new Promise(function addblockResult(resolve, reject) {
      self.getBlockHeight().then(function addBlockDate(height) {
        let block1 = JSON.parse(JSON.stringify(newBlock));
        // UTC timestamp
        block1.time = new Date().getTime().toString().slice(0, -3);
        return block1;
      }).then(function checkPreviousBlockHash(block2) {
        var lastHeight = block2.height;
        if (lastHeight > 0) {
          block2.height = lastHeight;
          return new Promise(function withPrev(resolve) {
            self.getBlock(lastHeight - 1).then(function getPrevBlock(b) {
              resolve({ block: block2, prevBlock: b });
            });
          });

        } else {
          return new Promise(function withoutPrev(resolve) {
            resolve({ block: block2, prevBlock: "" });
          });
        }
      }).then(function addPreviousHash(data) {
        var block3 = data.block;
        if (data.prevBlock) {
          block3.previousBlockHash = data.prevBlock.hash;
        }
        return block3;
      }).then(function addHash(block4) {
        block4.hash = SHA256(JSON.stringify(block4)).toString();
        return levelSandbox.addLevelDBData(block4.height, JSON.stringify(block4));
      }).then(value => {
        return resolve(value);
      }).catch(function (err) {
        console.log("NO!! ERROR!!", err);
      });
    });
  }

  // Get block height
  getBlockHeight() {
    return levelSandbox.getBlockHeight();
    // return levelSandbox.getBlockHeight().then(function addBlockHeight(height) {
    //   if (newBlock) {
    //     newBlock.height = height;
    //   } else {
    //     newBlock = height;
    //   }
    //   return newBlock;
    // });
  }

  // get block
  getBlock(blockHeight) {
    // return object as a single string
    //return JSON.parse(JSON.stringify(this.chain[blockHeight]));
    return levelSandbox.getLevelDBData(blockHeight).then(function parseJSON(block) {
      return JSON.parse(block);
    }).catch(e => console.log('getBlock ERROR', e));
  }

  // validate block
  validateBlock(blockHeight) {
    // get block object
    let block = this.getBlock(blockHeight);
    // get block hash
    let blockHash = block.hash;
    // remove block hash to test block integrity
    block.hash = '';
    // generate block hash
    let validBlockHash = SHA256(JSON.stringify(block)).toString();
    // Compare
    if (blockHash === validBlockHash) {
      return true;
    } else {
      console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash);
      return false;
    }
  }

  // Validate blockchain
  validateChain() {
    var self = this;
    let errorLog = [];

    self.getBlockHeight().then((height) => {
      for (let i = 0; i < height - 1; i++) {
        if (!this.validateBlock(i)) errorLog.push(i);
        self.getBlock(i).then(blockHash => {
          let previousHash = blockHash.previousBlockHash;
          if (blockHash !== previousHash) {
            errorLog.push(i);
          }
          if (height - 1 == i) {
            resolve("finish");
          }
        });
      }
    })
      .then(data => {
        if (errorLog.length > 0) {
          console.log('Block errors = ' + errorLog.length);
          console.log('Blocks: ' + errorLog);
        } else {
          console.log('No errors detected');
        }
      })
      .catch(err => console.log("validateChain ERROR", err));

  }
}


let blockchain = new Blockchain();
// blockchain.addBlock(new Block('My Test1')).then(value => console.log('last value', value));


// blockchain.getBlockHeight()  // DEBUG
// blockchain.addBlock(new Block('teste'))  // DEBUG

// add 10 blocks in blockchain
(function theLoop(i) {
  console.log(i);
    blockchain.addBlock(new Block(`Block # ${i}`)).then((value) => {
      console.log(value);
      if (i++ < 10) {
        theLoop(i);
      } else {
        console.log('will stop!');
      }  
    });
})(0);

// validate blockchain
blockchain.validateChain()
