const SHA256 = require('crypto-js/sha256');
const B = require('./Block.js');


/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/api/block/:index", async (req, res) => {
            let index = req.params.index;
            let block = new B.Block();
            let height = await block.getBlockMaxHeight();
            
            let jsonRes = {};
            if (index < height) {
                jsonRes = await block.getBlockByHeight(index);
            } else {
                jsonRes = "Index Out Of Block Height";
            }
            res.send(jsonRes);
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     * data param is essential.
     */
    postNewBlock() {
        this.app.post("/api/block", async (req, res) => {
            // body
            const {data} = req.body;
            let resData;
            if (data) {
                resData = await new B.Block(data).addBlock();
            } else {
                resData = "data is required";
            }
            return res.json(resData);
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    async initializeMockData() {

        if(this.blocks.length === 0){
            for (let index = 0; index < 10; index++) {
                let blockAux = new B.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
            }
        }
    }
}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}
