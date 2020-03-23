const axios = require("axios");
const chalk = require("chalk");
const comma = require("comma-number");
const { sortKeys, sortOrders } = require("./table.js");

module.exports = async (spinner, table, states, country, options) => {
	if (!country && !states) {
		const api = await axios.get(`https://corona.lmao.ninja/countries`);
		let all = api.data.map(one => {
			const {countryInfo, ...rest } = one;
			return Object.values(rest)
		});

		const sortIndex = sortKeys.indexOf(options.sort);

		if (sortIndex != -1) {
			const dir = sortOrders[sortIndex];
			all = all.sort((a, b) => (a[sortIndex] > b[sortIndex] ? dir : -dir));
		}

		all.map(one => {
			one = one.map(d => comma(d));
			return table.push(one);
		});
		spinner.stopAndPersist();
		spinner.info(`${chalk.cyan(`Sorted by:`)} ${options.sort}`);
		console.log(table.toString());
	}
};
