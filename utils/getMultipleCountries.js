const axios = require('axios');
const numberFormat = require('./numberFormat');
const exitCountry = require('./exitCountry');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, states, countryList, options) => {
	if (countryList && !states && !options.chart) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/countries/${countryList}`)
		);
		exitCountry(err, spinner, countryList);
		err && spinner.stopAndPersist();
		handleError(`API is down, try again later.`, err, false);
		const countries = response.data;

		// Format.
		const format = numberFormat(options.json);

		if (Array.isArray(countries)) {
			countries.map(data => table.push([
				`—`,
				data.country,
				format(data.cases),
				format(data.todayCases),
				format(data.deaths),
				format(data.todayDeaths),
				format(data.recovered),
				format(data.active),
				format(data.critical),
				format(data.casesPerOneMillion)
			]));
		}

		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
