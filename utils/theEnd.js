const chalk = require('chalk');
const logSymbols = require('log-symbols');
const dim = chalk.dim;

module.exports = async () => {
	console.log(
		`\n\n${logSymbols.success} ${dim(`Star the repo for updates → https://git.io/corona-cli`)}\n${logSymbols.info} ${dim(
			`Follow for more CLIs → https://twitter.com/MrAhmadAwais\n\n`
		)}`
	);
};
