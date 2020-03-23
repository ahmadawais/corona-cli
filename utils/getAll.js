const axios = require("axios");
const chalk = require("chalk");
const comma = require("comma-number");
const { sortKeys, sortOrders } = require("./table.js");

module.exports = async (spinner, table, states, country, options) => {
	if (!country && !states) {
		const api = await axios.get(`https://corona.lmao.ninja/countries`);
		let allCountries = api.data.map(country => Object.values(country));

		const sortIndex = sortKeys.indexOf(options.sort);

		if (sortIndex != -1) {
			const dir = sortOrders[sortIndex];
			allCountries = allCountries.sort((a, b) =>
				a[sortIndex] > b[sortIndex] ? dir : -dir
			);
		}

		allCountries.map((oneCountry, count) => {
			oneCountry = [oneCountry[0], ...oneCountry.slice(2, oneCountry.length)];
			oneCountry = oneCountry.map(stat => comma(stat));
			return table.push([count + 1, ...oneCountry]);
		});
		spinner.stopAndPersist();
		spinner.info(`${chalk.cyan(`Sorted by:`)} ${options.sort}`);
		console.log(table.toString());
	}
};
