const chalk = require('chalk');
const axios = require('axios');
const sym = require('log-symbols');
const comma = require('comma-number');
const red = chalk.red;
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const format = require('./format');

module.exports = async (spinner, table, states, countryName, options) => {
	if (countryName && !states && !options.chart) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/countries/${countryName}`)
		);
		handleError(`API is down, try again later.`, err, false);
		const thisCountry = response.data;

		if (response.data === 'Country not found') {
			spinner.stopAndPersist();
			console.log(
				`${red(
					`${sym.error} Nops. A country named "${countryName}" does not exist…`
				)}\n`
			);
			process.exit(0);
		}

		table.push([
			`—`,
			thisCountry.country,
			comma(thisCountry.cases),
			comma(thisCountry.todayCases),
			comma(thisCountry.deaths),
			comma(thisCountry.todayDeaths),
			comma(thisCountry.recovered),
			comma(thisCountry.active),
			comma(thisCountry.critical),
			comma(thisCountry.casesPerOneMillion),
			comma(format((thisCountry.deaths/thisCountry.cases)*100))
		]);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
