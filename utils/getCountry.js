const chalk = require("chalk");
const axios = require("axios");
const sym = require("log-symbols");
const comma = require("comma-number");
const red = chalk.red;
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");

module.exports = async (spinner, table, states, country) => {
	if (country && !states) {
		const [err, api] = await to(
			axios.get(`https://corona.lmao.ninja/countries/${country}`)
		);
		handleError(`API is down, try again later.`, err, false);

		if (api.data === "Country not found") {
			spinner.stopAndPersist();
			console.log(
				`${red(
					`${sym.error} Nops. A country named "${country}" does not exist…`
				)}\n`
			);
			process.exit(0);
		}
		let dataPerCountry = Object.values(api.data);
		dataPerCountry = dataPerCountry
			.filter(stat => typeof stat !== "object")
			.map(stat => comma(stat));
		table.push([`—`, ...dataPerCountry]);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
