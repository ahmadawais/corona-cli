const axios = require('axios');
const numberFormat = require('./numberFormat');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (table, states, vaccines, json) => {
	const [err, response] = await to(
		axios.get(`https://corona.lmao.ninja/v3/covid-19/all`)
	);
	handleError(`API is down, try again later.`, err, false);

	const allData = response.data;
	const format = numberFormat(json);

	// Don't print coz for states we still need that data of updated data.
	if (!states && !vaccines) {
		table.push([
			`→`,
			`Worldwide`,
			format(allData.cases),
			format(allData.todayCases),
			format(allData.deaths),
			format(allData.todayDeaths),
			format(allData.recovered),
			format(allData.active),
			format(allData.critical),
			format(allData.casesPerOneMillion)
		]);
	}

	const lastUpdated = Date(allData.updated);
	return lastUpdated;
};
