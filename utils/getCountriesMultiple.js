const axios = require('axios');
const comma = require('comma-number');
const { sortingKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');

function isCountriesMultiple(country) {
	return typeof country === 'string' && country.includes(',');
}

async function getCountriesMultiple(
	spinner,
	table,
	states,
	country,
	{ sortBy, reverse, chart }
) {
	if (country && isCountriesMultiple(country) && !states && !chart) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/countries/${country}`)
		);
		handleError(`API is down, try again later.`, err, false);
		let countries = Array.isArray(response.data)
			? response.data
			: [response.data];

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		countries = orderBy(countries, [sortingKeys[sortBy]], [direction]);

		countries.map((country, count) => {
			table.push([
				count + 1,
				country.country,
				comma(country.cases),
				comma(country.todayCases),
				comma(country.deaths),
				comma(country.todayDeaths),
				comma(country.recovered),
				comma(country.active),
				comma(country.critical),
				comma(country.casesPerOneMillion)
			]);
		});

		spinner.stopAndPersist();
		console.log(table.toString());
	}
}

module.exports = {
	isCountriesMultiple,
	getCountriesMultiple
};
