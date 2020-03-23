const chalk = require("chalk");
const axios = require("axios");
const logSymbols = require("log-symbols");
const comma = require("comma-number");
const red = chalk.red;
const green = chalk.green;

module.exports = async (spinner, table, states, country) => {
	if (country && !states) {
		const api = await axios.get(
			`https://corona.lmao.ninja/countries/${country}`
		);
		if (api.data === "Country not found") {
			spinner.stopAndPersist();
			console.log(
				`${red(
					`${logSymbols.error} Nops. A country named "${country}" does not exist…`
				)}\n`
			);
			process.exit(0);
		}
		let dataPerCountry = Object.values(api.data);
		dataPerCountry = [
			dataPerCountry[0],
			...dataPerCountry.slice(2, dataPerCountry.length)
		];
		dataPerCountry = dataPerCountry.map(stat => comma(stat));
		table.push([`—`, ...dataPerCountry]);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
