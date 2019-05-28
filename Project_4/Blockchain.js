const SHA256 = require('crypto-js/sha256');
const db = require('./levelSandbox.js');


class Blockchain {
	async addBlock(block) {
	    let res;
	    try {
	        //console.log(`hash=${this.hash}, height=${this.height}, body=${this.body}, time=${this.time}`);
	        let h = await this.getBlockMaxHeight();
	        console.log('h=',h);
	        block.height = h;
	        if (block.height > 0) {
	            let previousBlock = await this.getBlockByHeight(h - 1);
	            let previousBlockHash = previousBlock.hash;
	            block.previousBlockHash = previousBlockHash;
	        }
	        block.hash = SHA256(JSON.stringify(block)).toString();
	        res = await db.addDataToLevelDB(JSON.stringify(block));
	    } catch (err) {
	        console.log("getBlockMaxHeight err");
	        console.log(block.hash);
	        console.log(res);
	        console.log(err);
	    }
	    return JSON.parse(res);
	}

	async getBlockMaxHeight() {
	    const height = await db.getBlockHeight();
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

module.exports = Blockchain;