const axios = require("axios");
const comma = require("comma-number");
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");

module.exports = async (table, states) => {
	if (!states) {
		const [err, all] = await to(axios.get(`https://corona.lmao.ninja/all`));
		handleError(`API is down, try again later.`, err, false);

		let data = Object.values(all.data);
		data = data.map(d => comma(d));
		table.push([
			`—`,
			`Worldwide`,
			data[0],
			`—`,
			data[1],
			`—`,
			data[2],
			`—`,
			`—`,
			`—`
		]);
	}
};
