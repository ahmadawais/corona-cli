const { red } = require('chalk');
const axios = require('axios');
const sym = require('log-symbols');
const numberFormat = require('./numberFormat');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, states, countryName, options) => {
	if (countryName && !states && !options.chart) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/countries/${countryName}`)
		);

		if (err && err.response.status === 404) {
			spinner.stopAndPersist();
			console.log(
				`${red(
					`${sym.error} Oops. A country named "${countryName}" does not exist or has no cases...`
				)}\n`
			);
			process.exit(0);
		}
		
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
