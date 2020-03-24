const axios = require("axios");
const chalk = require("chalk");
const comma = require("comma-number");
const { sortKeys, sortOrders } = require("./table.js");
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");

module.exports = async (spinner, table, states, country, options) => {
	if (!country && !states) {
		const [err, api] = await to(
			axios.get(`https://corona.lmao.ninja/countries`)
		);
		handleError(`API is down, try again later.`, err, false);

		let allCountries = api.data.map(country => Object.values(country));

		const sortIndex = sortKeys.indexOf(options.sort);

		if (sortIndex != -1) {
			const dir = sortOrders[sortIndex];
			allCountries = allCountries.sort((a, b) => {
				if ( options.order !== undefined ) {
					return a[sortIndex] < b[sortIndex] ? dir : -dir;
				}
				return a[sortIndex] > b[sortIndex] ? dir : -dir;
			});
		}

		allCountries.map((oneCountry, count) => {
			oneCountry = oneCountry
				.filter(stat => typeof stat !== "object")
				.map(stat => comma(stat));
			return table.push([count + 1, ...oneCountry]);
		});
		spinner.stopAndPersist();
		spinner.info(`${chalk.cyan(`Sorted by:`)} ${options.sort}`);
		if ( options.order !== undefined ) {
			spinner.info(`${chalk.cyan(`Order:`)} reverse`);
		}
		console.log(table.toString());
	}
};
