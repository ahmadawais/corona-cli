const axios = require('axios');
const comma = require('comma-number');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (table, states) => {
	const [err, all] = await to(axios.get(`https://corona.lmao.ninja/all`));
	handleError(`API is down, try again later.`, err, false);
	let data = Object.values(all.data);
	data = data.map((d) => comma(d));

	if (!states) {
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
			`—`,
		]);
	}

	const lastUpdated = Date(data[3]);
	return lastUpdated;
};
