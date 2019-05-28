class Mempool {
	constructor() {
		this.mempool = {};
		this.timeoutReqs = {};
	}

	async addWallet(blockRequest) {
		let self = this;
		console.log(`addWallet call ${blockRequest}`);
		return blockRequest;
	}
}

module.exports = new Mempool();