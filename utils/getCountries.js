const chalk = require('chalk');
const cyan = chalk.cyan;
const dim = chalk.dim;
const comma = require('comma-number');
const { sortingKeys } = require('./table.js');
const orderBy = require('lodash.orderby');
const fetchAndHandleErrors = require('./fetchAndHandleErrors.js');

module.exports = async (
	spinner,
	table,
	states,
	countryName,
	{ sortBy, limit, reverse }
) => {
	if (!countryName && !states) {
		const { response } = await fetchAndHandleErrors(
			`https://corona.lmao.ninja/countries`
		);

		let allCountries = response.data;

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allCountries = orderBy(allCountries, [sortingKeys[sortBy]], [direction]);

		// Limit.
		allCountries = allCountries.slice(0, limit);

		// Push selected data.
		allCountries.map((oneCountry, count) => {
			table.push([
				count + 1,
				oneCountry.country,
				comma(oneCountry.cases),
				comma(oneCountry.todayCases),
				comma(oneCountry.deaths),
				comma(oneCountry.todayDeaths),
				comma(oneCountry.recovered),
				comma(oneCountry.active),
				comma(oneCountry.critical),
				comma(oneCountry.casesPerOneMillion)
			]);
		});

		spinner.stopAndPersist();
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		console.log(table.toString());
	}
};
