const axios = require("axios");
const chalk = require("chalk");
const comma = require("comma-number");
const { sortingKeys } = require("./table.js");
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");
const orderBy = require("lodash.orderby");

module.exports = async (spinner, table, states, countryName, sortBy) => {
	if (!countryName && !states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/countries`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allCountries = response.data;

		// Sort.
		allCountries = orderBy(allCountries, [sortingKeys[sortBy]], ["desc"]);

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
		spinner.info(`${chalk.cyan(`Sorted by:`)} ${sortBy}`);
		console.log(table.toString());
	}
};
