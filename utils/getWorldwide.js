const comma = require('comma-number');
const fetchAndHandleErrors = require('./fetchAndHandleErrors.js');

module.exports = async (table, states) => {
	const { response: all } = await fetchAndHandleErrors(
		`https://corona.lmao.ninja/all`
	);

	let data = Object.values(all.data);
	data = data.map(d => comma(d));

	// Don't print coz for states we still need that data of updated data.
	if (!states) {
		table.push([
			`→`,
			`Worldwide`,
			comma(allData.cases),
			comma(allData.todayCases),
			comma(allData.deaths),
			comma(allData.todayDeaths),
			comma(allData.recovered),
			comma(allData.active),
			comma(allData.critical),
			comma(allData.casesPerOneMillion)
		]);
	}

	const lastUpdated = Date(allData.updated);
	return lastUpdated;
};
