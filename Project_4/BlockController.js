const SHA256 = require('crypto-js/sha256');
const B = require('./Block.js');
const Blockchain = require('./Blockchain');
const chain = new Blockchain();
/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app, mempool) {
        this.app = app;
        this.mempool = mempool;
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/api/block/:index", async (req, res) => {
            let index = req.params.index;
            let height = await chain.getBlockMaxHeight();
            
            let jsonRes = {};
            if (index < height) {
                jsonRes = await chain.getBlockByHeight(index);
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
            const {data} = req.body;
            let resData;
            if (data) {
                resData = await chain.addBlock(new B.Block(data));
            } else {
                resData = "data is required";
            }
            return res.json(resData);
        });
    }

    /*
     * add new star block data.
     * 1. verify address data.
     * 2. save star data
     * 3. return result.
     */
    addNewStar() {
        this.app.post("/block", async (req, res) => {
            const {address, star} = req.body;
            if(address && star) {
                let res = this.mempool.getRequestByWalletAddress(address);
                console.log('you have it!!!', res);
                console.log(star);
                if(res) {
                    const {ra, dec, mag, cen, story} = star;
//                    console.log()
                }
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    // async initializeMockData() {
        
    //     if(this.blocks.length === 0){
    //         for (let index = 0; index < 10; index++) {
    //             let blockAux = new B.Block(`Test Data #${index}`);
    //             blockAux.height = index;
    //             blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
    //         }
    //     }
    // }
}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}
