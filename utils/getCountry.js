const chalk = require('chalk');
const axios = require('axios');
const logSymbols = require('log-symbols');
const comma = require('comma-number');
const red = chalk.red;

module.exports = async (spinner, table, country) => {
	if (country) {
		const api = await axios.get(`https://corona.lmao.ninja/countries/${country}`);
		if (api.data === 'Country not found') {
			console.log(`${red(`${logSymbols.error} Nops. A country named "${country}" does not exist…`)}\n`);
			process.exit(0);
		}
		let data = Object.values(api.data);
		data = data.map(d => comma(d));
		table.push(data);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
