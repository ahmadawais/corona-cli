const sym = require('log-symbols');
const { cyan, dim } = require('chalk');

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

const infoVaccins = () =>
	console.log(
		dim(`
			\n${sym.info} ${cyan(`KEY:`)}
${dim(`❯ `)}${cyan(`Candidate:`)} Name of the vaccine
${dim(`❯ `)}${cyan(`Mechanism:`)} What mechanism the vaccine uses
${dim(`❯ `)}${cyan(`TrialPhase:`)} Current trialPhase of vaccine
${dim(`❯ `)}${cyan(`Institutions:`)} Institution which tests the vaccine
`)
	);

module.exports = async (lastUpdated, states, vaccines, minimal) => {
	if (minimal) return console.log();
	console.log(dim(`${sym.info} ${cyan(`Last Updated:`)} ${lastUpdated}`));
	if(states){
		infoStates();
	}else if(vaccines){
		infoVaccins();
	}else{
		infoCountries();
	}
	console.log(
		`\n${sym.success} ${dim(
			`Star the repo for updates → https://git.io/corona-cli`
		)}\n${sym.info} ${dim(
			`Follow for more CLIs → https://twitter.com/MrAhmadAwais\n\n`
		)}`
	);
};
