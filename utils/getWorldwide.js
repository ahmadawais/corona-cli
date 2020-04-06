const axios = require('axios');
const comma = require('comma-number');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (table, states) => {
	const [err, all] = await to(axios.get(`https://corona.lmao.ninja/all`));
	handleError(`API is down, try again later.`, err, false);

	const { data } = all;

	if (!states) {
		table.push([
			`—`,
			`Worldwide`,
			comma(data.cases),
			comma(data.todayCases),
			comma(data.deaths),
			comma(data.todayDeaths),
			comma(data.recovered),
			comma(data.active),
			comma(data.critical),
			comma(data.casesPerOneMillion),
		]);
	}

	const lastUpdated = Date(data.updated);
	return lastUpdated;
};
