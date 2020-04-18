const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const dim = chalk.dim;
const numberFormat = require('./numberFormat');
const { sortingKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');

module.exports = async (
	spinner,
	output,
	states,
	countryName,
	{ sortBy, limit, reverse, json }
) => {
	if (!countryName && !states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/countries`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allCountries = response.data;

		// Format.
		const format = numberFormat(json);

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allCountries = orderBy(
			allCountries,
			[sortingKeys[sortBy]],
			[direction]
		);

		// Limit.
		allCountries = allCountries.slice(0, limit);

		// Push selected data.
		allCountries.map((oneCountry, count) => {
			output.push([
				count + 1,
				oneCountry.country,
				format(oneCountry.cases),
				format(oneCountry.todayCases),
				format(oneCountry.deaths),
				format(oneCountry.todayDeaths),
				format(oneCountry.recovered),
				format(oneCountry.active),
				format(oneCountry.critical),
				format(oneCountry.casesPerOneMillion)
			]);
		});

		spinner.stopAndPersist();
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		if (!json) {
			spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		}
		console.log(output.toString());
	}
};
