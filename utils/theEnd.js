const sym = require('log-symbols');
const chalk = require('chalk');
const cyan = chalk.cyan;
const dim = chalk.dim;

const infoStates = () =>
	console.log(
		dim(`
			\n${sym.info} ${cyan(`KEY:`)}
${dim(`❯ `)}${cyan(`State:`)} Name of the state
${dim(`❯ `)}${cyan(`Cases:`)} Total number of cases in a country
${dim(`❯ `)}${cyan(`Cases (today):`)} Cases in 24 hours GMT/UTC
${dim(`❯ `)}${cyan(`Deaths:`)} Total number of deaths in a state
${dim(`❯ `)}${cyan(`Deaths (today):`)} Deaths in 24 hours GMT/UTC
${dim(`❯ `)}${cyan(`Recovered:`)} Total number of recovered people
${dim(`❯ `)}${cyan(`Active:`)}  Total number of active patients
`)
	);

const infoCountries = () =>
	console.log(
		dim(`
			\n${sym.info} ${cyan(`KEY:`)}
${dim(`❯ `)}${cyan(`Country:`)} Name of the country
${dim(`❯ `)}${cyan(`Cases:`)} Total number of cases in a country
${dim(`❯ `)}${cyan(`Cases (today):`)} Cases in 24 hours GMT/UTC
${dim(`❯ `)}${cyan(`Deaths:`)} Total number of deaths in a country
${dim(`❯ `)}${cyan(`Deaths (today):`)} Deaths in 24 hours GMT/UTC
${dim(`❯ `)}${cyan(`Recovered:`)} Total number of recovered people
${dim(`❯ `)}${cyan(`Active:`)}  Total number of active patients
${dim(`❯ `)}${cyan(`Critical:`)} Total number of critical patients
${dim(`❯ `)}${cyan(`Per Million:`)} Affected patients per million
`)
	);

module.exports = async (lastUpdated, states) => {
	console.log(dim(`${sym.info} ${cyan(`Last Updated:`)} ${lastUpdated}`));
	states && infoStates();
	!states && infoCountries();
	console.log(
		`\n${sym.success} ${dim(
			`Star the repo for updates → https://git.io/corona-cli`
		)}\n${sym.info} ${dim(
			`Follow for more CLIs → https://twitter.com/MrAhmadAwais\n\n`
		)}`
	);
};
