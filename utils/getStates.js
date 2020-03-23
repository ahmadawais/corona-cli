const axios = require("axios");
const chalk = require("chalk");
const comma = require("comma-number");
const { sortStateKeys, sortStateOrders } = require("./table.js");

module.exports = async (spinner, table, states, options) => {
	if (states) {
		const api = await axios.get(`https://corona.lmao.ninja/states`);
		let all = api.data.map(one => Object.values(one));

		const sortIndex = sortStateKeys.indexOf(options.sort);

		if (sortIndex != -1) {
			const dir = sortStateOrders[sortIndex];
			all = all.sort((a, b) => (a[sortIndex] > b[sortIndex] ? dir : -dir));
		}

		all.map((one, i) => {
			one = one.map(d => comma(d));
			return table.push([i + 1, ...one]);
		});

		spinner.stopAndPersist();
		spinner.info(`${chalk.cyan(`Sorted by:`)} ${options.sort}`);
		console.log(table.toString());
	}
};
