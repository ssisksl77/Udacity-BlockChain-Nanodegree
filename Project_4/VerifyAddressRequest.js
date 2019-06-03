class VerifyAddressRequest {
	constructor(address, star) {
		this.address = address;
		this.star = star;
		this.isValid = this.validate();
	}

	validate() {
		if(this.addressValid() && this.storyValid()) {
			return true;
		} else {
			console.log("return undefined");
			return undefined;
		}
	}


	addressValid() {
		if(!this.address) {
			console.log(`address is essential. current address=${this.address}`);
			return false;
		}
		return true;
	}

	storyValid() {
		const MAX_STORY_BYTES = 500;
		let star = this.star;
		if (!star || !star.story) {
			console.log('story is not defined');
			return false;
		}

		if (Buffer(star.story).length > MAX_STORY_BYTES) {
     		console.log(`story length is over ${MAX_STORY_BYTES}`);
    		return false;
    	}

    	// success now encode story to hex-decimal
    	console.log(`before star = ${star.story}`);
    	star.story = Buffer(star.story).toString('hex');
    	console.log(`after star = ${star.story}`);
    	return true;
	}

	get() {
		if (this.isValid) {
			return this;
		} else {
			return undefined;
		}
	}
}

module.exports = VerifyAddressRequest;