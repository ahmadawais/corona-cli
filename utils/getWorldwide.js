const comma = require('comma-number');
const fetchAndHandleErrors = require('./fetchAndHandleErrors.js');

module.exports = async (table, states) => {
	const { response: all } = await fetchAndHandleErrors(
		`https://corona.lmao.ninja/all`
	);

	let data = Object.values(all.data);
	data = data.map(d => comma(d));

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
			`—`
		]);
	}

	const lastUpdated = Date(data[3]);
	return lastUpdated;
};
