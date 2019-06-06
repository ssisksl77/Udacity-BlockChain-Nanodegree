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
}

module.exports.Block = Block;
