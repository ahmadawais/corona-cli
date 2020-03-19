const chalk = require('chalk');
const green = chalk.green;
const red = chalk.red;
const dim = chalk.dim;

module.exports = {
	single: [
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`Deaths`,
		`Deaths ${dim(`(today)`)}`,
		`Recovered`,
		`Active`,
		`Critical`,
		`Per Million`
	],
	colored: [
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`${red(`Deaths`)}`,
		`${red(`Deaths (today)`)}`,
		`${green(`Recovered`)}`,
		`Active`,
		`${red(`Critical`)}`,
		`Per Million`
	],
	style: { head: ['cyan'] }
};
