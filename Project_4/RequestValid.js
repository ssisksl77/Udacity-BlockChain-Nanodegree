class RequestValid {
	constructor(blockRequest, valid) {
		this.registerStar = true;
		this.status = {
			...blockRequest,
			messageSignature: valid
		}
	}
}

module.exports = RequestValid;