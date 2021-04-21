const axios = require('axios');
const numberFormat = require('./numberFormat');
const exitCountry = require('./exitCountry');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, states, countryName, options) => {
	if (countryName && !states && !options.chart) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v3/covid-19/countries/${countryName}`)
		);
		exitCountry(err, spinner, countryName);
		err && spinner.stopAndPersist();
		handleError(`API is down, try again later.`, err, false);
		const thisCountry = response.data;

		// Format.
		const format = numberFormat(options.json);

		table.push([
			`—`,
			thisCountry.country,
			format(thisCountry.cases),
			format(thisCountry.todayCases),
			format(thisCountry.deaths),
			format(thisCountry.todayDeaths),
			format(thisCountry.recovered),
			format(thisCountry.active),
			format(thisCountry.critical),
			format(thisCountry.casesPerOneMillion)
		]);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
