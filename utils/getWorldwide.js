const axios = require('axios');
const comma = require('comma-number');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (table, states) => {
	const [err, response] = await to(
		axios.get(`https://corona.lmao.ninja/all`)
	);
	handleError(`API is down, try again later.`, err, false);
	const allData = response.data;
	// console.log('allData: ', allData);

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
