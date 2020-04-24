class JsonOutput {
	constructor(options) {
		this.options = options;
		this.values = [];
	}

	get asObject() {
		const keys = this.getKeys();

		return this.values.map(values => {
			return values.reduce((acc, value, index) => {
				if(index === 0) { // skip # column
					return acc;
				}

				acc[keys[index]] = value;
				return acc;
			}, {});
		});
	}

	getKeys() {
		const keys = this.options.head.map(this.toKebabCase);
		return keys;
	}

	toKebabCase(str) {
		return str.toLowerCase()
			.replace(/ {1,}/gi, '-')
			.replace(/\(|\)/gi, '');
	}

	push(value) {
		this.values.push(value);
	}

	toString() {
		return JSON.stringify(this.asObject);
	}
}

module.exports = JsonOutput;
