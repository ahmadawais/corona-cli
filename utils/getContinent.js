const axios = require('axios');
const numberFormat = require('./numberFormat');
const exitContinent = require('./exitContinent');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, continentName, options) => {
	if (continentName && !options.chart) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/continents/${continentName}`)
		);
		exitContinent(err, spinner, continentName);
		err && spinner.stopAndPersist();
		handleError(`API is down, try again later.`, err, false);
		const thisContinent = response.data;

		// Format.
		const format = numberFormat(options.json);

		table.push([
			`—`,
			thisContinent.continent,
			format(thisContinent.cases),
			format(thisContinent.todayCases),
			format(thisContinent.deaths),
			format(thisContinent.todayDeaths),
			format(thisContinent.recovered),
			format(thisContinent.active),
			format(thisContinent.critical),
			format(thisContinent.casesPerOneMillion)
		]);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
