const _ = require('lodash');
const bitcoinMessage = require('bitcoinjs-message');

const RequestValid = require('./RequestValid.js');
const RequestValidTimeout = 30*60*1000;

class Mempool {
	constructor() {
		this.mempool = {};
		this.timeoutRequests = {};
		this.mempoolValid = {};
		this.timeoutMempoolValid = {};

	}

	async addRequest(blockRequest) {
		let existWallet = this.getRequestByBlock(blockRequest);
		if (existWallet) {
			// console.log('already isexist=', existWallet);
			return existWallet;
		} else {
			this.setWallet(blockRequest);
			return blockRequest;
		}
	}

	async validateRequestByWallet(address, signature) {
		let wallet = this.getRequestByWalletAddress(address);
		const self = this;
		try {
			if (wallet) {
				const verified = bitcoinMessage.verify(wallet.message, address, signature);
				let reqValid = new RequestValid(wallet, verified);
				if(verified) {
					this.mempoolValid[reqValid.status.walletAddress] = reqValid;
					this.timeoutMempoolValid[reqValid.status.address] = setTimeout(() => {
						self.removeValidRequest(reqValid.status.address);
					}, RequestValidTimeout);
				}
				return reqValid;
			}
		} catch(err) {
			console.log(err);
		}
		return this.getRequestByWalletAddress(address)
	}

	getRequestByBlock(blockRequest) {
		return this.getRequestByWalletAddress(blockRequest.walletAddress);
	}

	getRequestByWalletAddress(address) {
		let res;
		try {
			let wallet = this.getWallet(address);
			if(wallet) {
				res = wallet;
				res.renewValidationWindow();
			}
		} catch(err) {
			console.log(err);
		}
		return res;
	}

	// abstract getWallet
	getWallet(address) {
		return this.mempool[address];
	}
	
	setWallet(blockRequest) {
		const address = blockRequest.walletAddress;
		let self = this;
		this.mempool[address] = blockRequest;
		this.timeoutRequests[address] = setTimeout(function() {
			console.log("remove it!");
			self.removeBlockRequest(address);
		}, blockRequest.validationWindow * 1000);
		return;
	}

	removeBlockRequest(address) {
		delete this.mempool[address];
		delete this.timeoutRequests[address];
	}

    removeValidRequest(address) {
        delete this.mempoolValid[address]
        delete this.timeoutMempoolValid[address]
    }
}

module.exports = new Mempool();