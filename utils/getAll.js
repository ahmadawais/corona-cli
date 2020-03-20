const axios = require('axios');
const chalk = require('chalk');
const comma = require('comma-number');
const sortKeys = require('./table.js').sortKeys;
const sortOrders = require('./table.js').sortOrders;

module.exports = async (spinner, table, country, options) => {
	if (!country) {
		const api = await axios.get(`https://corona.lmao.ninja/countries`);
		let all = api.data.map(one => Object.values(one));

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
