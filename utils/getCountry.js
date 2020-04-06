const chalk = require("chalk");
const axios = require("axios");
const logSymbols = require("log-symbols");
const comma = require("comma-number");
const { calculateRecoveryRate } = require("./calcRecoveryRate");
const sym = require('log-symbols');
const red = chalk.red;
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, states, countryName, options) => {
	if (countryName && !states && !options.chart) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/countries/${countryName}`)
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
		// let data = Object.values(api.data);
		// data = calculateSingleRecoveryRate(data);
		// data = data.map(d => comma(d));
		// table.push(data);

		table.push([
			`—`,
			thisCountry.country,
			comma(thisCountry.cases),
			comma(thisCountry.todayCases),
			comma(thisCountry.deaths),
			comma(thisCountry.todayDeaths),
			comma(thisCountry.recovered),
			calculateRecoveryRate(thisCountry.deaths, thisCountry.recovered),
			comma(thisCountry.active),
			comma(thisCountry.critical),
			comma(thisCountry.casesPerOneMillion)
		]);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
