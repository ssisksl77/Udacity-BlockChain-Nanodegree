const each = require('lodash/each');
const map = require('lodash/map');
const _ = require('lodash/wrapperLodash');

const BlockReq = require('./BlockRequest');

class MempoolController {
	constructor(app, mempool) {
		this.app = app;
		this.mempool = mempool;
		
		this.AddRequestValidation();
		this.validRequest();
	}

	AddRequestValidation() {
		//const self = this;
		try {
			this.app.post('/requestValidation', async (req, res) => {
				if(req.body.address) {
					let resJson = await this.mempool.addRequest(new BlockReq(req.body.address));
					
					if (resJson) {
						res.status(200).send(resJson);
					} else {
						res.status(500).send("Error happend on requestValidation");
					}
				} else {
					res.status(500).send('include address.');
				}
			});
		} catch(err) {
			console.log(err);
		}
	}

	validRequest() {
		try {
			this.app.post('/message-signature/validate', async (req, res) => {
				if(req.body.address && req.body.signature) {
					let resJson = await this.mempool.validateRequestByWallet(req.body.address, req.body.signature)
					
					if (resJson) {
						res.status(200).send(resJson);
					} else {
						res.status(200).send('no matching address');
					}
				}
			});

		} catch(err) {
			console.log(err);
		}
	}
}

/**
 * Exporting the MempoolController class
 * eleminate new keyword
 * @param {*} app 
 */
module.exports = (app, mempool) => { return new MempoolController(app, mempool);}