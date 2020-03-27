const chalk = require('chalk');
const axios = require('axios');
const sym = require('log-symbols');
const comma = require('comma-number');
const red = chalk.red;
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, states, countryName) => {
	if (countryName && !states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/countries/${countryName}`)
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
			comma(thisCountry.casesPerOneMillion)
		]);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
