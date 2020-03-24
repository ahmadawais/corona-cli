// Get last updated time from corona.lmao.ninja
const axios = require("axios");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const cyan = chalk.cyan;

module.exports = async () => {
	const api = await axios.get(`https://corona.lmao.ninja/all`);
	let data = Object.values(api.data);

	console.log(
		`${logSymbols.info} ${cyan(`Last Updated:`)} ${Date(data[3])}`
	);
}
