const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

const B = require('./Block.js');
const Blockchain = require('./Blockchain.js');
const VerifyAddressRequest = new require('./VerifyAddressRequest.js');
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
        this.addNewStar();
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
        const self = this;

        this.app.post("/block", async (req, res) => {
            const {address, star} = req.body;
            if(address && star) {
                let mempoolValid = self.mempool.getRequestByWalletAddress(address);
                let validReq = new VerifyAddressRequest(address, star);
                // console.log(`mempoolValid ${mempoolValid}`);
                // mempoolValid
                if(validReq.get()) {
                    let resData = await chain.addBlock(new B.Block(validReq.get()));
                    resData.body.star.storyDecoded = hex2ascii(resData.body.star.story);
                    console.log(resData.body.star.story);
                    console.log(hex2ascii(resData.body.star.story));
                    res.json(resData);
                } else {
                    res.status(500).json('request is not valid');
                }
            }
        });
    }
}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app, mempool) => { return new BlockController(app, mempool);}
