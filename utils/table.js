const chalk = require("chalk");
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
		`Recovery Rate`,
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
		`${green(`Recovery Rate`)}`,
		`Active`,
		`${red(`Critical`)}`,
		`Per Million`
	],
	sortKeys: [
		`country`,
		`cases`,
		`cases-today`,
		`deaths`,
		`deaths-today`,
		`recovered`,
		`recovery-rate`,
		`active`,
		`critical`,
		`per-million`
	],
	singleStates: [
		`State`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`Deaths`,
		`Deaths ${dim(`(today)`)}`,
		`Recovered`,
		`Recovery Rate`,
		`Active`
	],
	coloredStates: [
		`State`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`${red(`Deaths`)}`,
		`${red(`Deaths (today)`)}`,
		`${green(`Recovered`)}`,
		`${green(`Recovery Rate`)}`,
		`Active`
	],
	sortStateKeys: [
		`state`,
		`cases`,
		`cases-today`,
		`deaths`,
		`deaths-today`,
		`recovered`,
		`recovery-rate`,
		`active`
	],
	sortOrders: [1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	sortStateOrders: [1, -1, -1, -1, -1, -1, -1, -1],
	style: { head: ["cyan"] }
};
