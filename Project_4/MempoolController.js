const BlockReq = require('./BlockRequest');

class MempoolController {
	constructor(app, mempool) {
		this.app = app;
		this.mempool = mempool;
		this.requestValidation();
	}

	requestValidation() {
		this.app.post('/requestValidation', (req, res) => {
			if(req.body.address) {
				let blockReq = new BlockReq(req.body.address);
				let resJson = await this.mempool.addWallet(blockReq);
				res.send(resJson);
			} else {
				res.status(500).send('include address.');
			}
		});
	}
}

/**
 * Exporting the MempoolController class
 * eleminate new keyword
 * @param {*} app 
 */
module.exports = (app) => { return new MempoolController(app);}