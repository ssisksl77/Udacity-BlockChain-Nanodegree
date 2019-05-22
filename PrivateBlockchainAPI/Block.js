/* ===== Block Class ==============================
   |  Class with a constructor for block 			   |
   |  ===============================================*/
const SHA256 = require('crypto-js/sha256');
const db = require('./levelSandbox.js');

class Block {
	  constructor(data){
		    this.hash = ""; 
		    this.height = 0;
		    this.body = data;
            this.time = new Date().getTime().toString().slice(0,-3);
            this.previousBlockHash = "";
    }

    async addBlock() {
        let res;
        try {
            //console.log(`hash=${this.hash}, height=${this.height}, body=${this.body}, time=${this.time}`);
            let h = await this.getBlockMaxHeight();
            console.log('h=',h);
            this.height = h;
            if (this.height > 0) {
                let previousBlock = await this.getBlockByHeight(h - 1);
                let previousBlockHash = previousBlock.hash;
                this.previousBlockHash = previousBlockHash;
            }
            this.hash = SHA256(JSON.stringify(this)).toString();
            console.log('this.hash == ', this.hash);
            console.log('this == ', this);
            res = await db.addDataToLevelDB(JSON.stringify(this));
        } catch (err) {
            console.log("getBlockMaxHeight err");
            console.log(this.hash);
            console.log(res);
            console.log(err);
        }
        return JSON.parse(res);
    }

    async getBlockMaxHeight() {
        const height = await db.getBlockHeight();
        // console.log(`get BlockMaxHeight height => ${height}`);
        return height;
    }

    async getBlockByHeight(height) {
        let currentHeight = await this.getBlockMaxHeight();
        if (height >= currentHeight) {
            return undefined;
        } 
        let block = await db.getLevelDBData(height);
        block = JSON.parse(block);
        return block;
    }
}

module.exports.Block = Block;
