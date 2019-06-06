const validationWindowTimeout = 300;

class BlockRequest {

	constructor(address) {
		this.walletAddress = address;
		this.requestTimeStamp = new Date().getTime().toString().slice(0,-3);
		this.message = `${this.walletAddress}:${this.requestTimeStamp}:starRegistry`;
		this.validationWindow = validationWindowTimeout;
	}


	renewValidationWindow() {
		const now = new Date().getTime().toString().slice(0,-3);
		const timeElapse = now - this.requestTimeStamp;
		const timeLeft = validationWindowTimeout - timeElapse;
		this.validationWindow = timeLeft; 
	}
}

module.exports = BlockRequest;