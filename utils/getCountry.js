const chalk = require('chalk');
const axios = require('axios');
const sym = require('log-symbols');
const comma = require('comma-number');
const red = chalk.red;
const dim = chalk.dim;
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const commonUtils = require('./commonUtils');

module.exports = async (
	spinner,
	table,
	states,
	countryName,
	{ sortBy, limit, reverse, date }
) => {
	if (countryName && !states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/countries/${countryName}`)
		);
		handleError(
			`API endpoint GET /countries is down, try again later.`,
			err,
			false
		);
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

		// get historical data if date option is provided
		if (commonUtils.isPastDate(date)) {
			const [err, historicalDataresponse] = await to(
				axios.get(
					`https://corona.lmao.ninja/v2/historical/${countryName}`
				)
			);
			handleError(
				`API endpoint GET /v2/historical is down, try again later.`,
				err,
				false
			);
			const thisCountryHistoricalDate = historicalDataresponse.data;
			var ninjaDateFormat = commonUtils.getNinjaDateFormat(date);
			table.options.head[3] = `Cases ${dim(`(${ninjaDateFormat})`)}`;
			table.options.head[5] = `Deaths ${red(`(${ninjaDateFormat})`)}`;
			thisCountry.todayCases =
				ninjaDateFormat in
				thisCountryHistoricalDate['timeline']['cases']
					? thisCountryHistoricalDate['timeline']['cases'][
							ninjaDateFormat
					  ]
					: '-';
			thisCountry.todayDeaths =
				ninjaDateFormat in
				thisCountryHistoricalDate['timeline']['deaths']
					? thisCountryHistoricalDate['timeline']['deaths'][
							ninjaDateFormat
					  ]
					: '-';
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
			comma(thisCountry.casesPerOneMillion)
		]);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
