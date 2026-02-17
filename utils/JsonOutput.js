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
		return this.options.head.map(this.toKebabCase);
	}

	toKebabCase(str) {
		return str.toLowerCase()
			.replace(/ {1,}/g, '-')
			.replace(/\(|\)/g, '');
	}

	push(value) {
		this.values.push(value);
	}

	toString() {
		return JSON.stringify(this.asObject);
	}
}

module.exports = JsonOutput;
