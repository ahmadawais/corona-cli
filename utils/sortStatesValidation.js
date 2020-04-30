const sym = require('log-symbols');
const { sortingStateKeys } = require('./table.js');
const { red, green, dim } = require('chalk');

module.exports = (sortBy, spinner) => {
	if (sortBy !== 'cases') {
		if (Object.keys(sortingStateKeys).indexOf(sortBy) === -1) {
			spinner.stop();
			console.log(`${sym.error} ${red(`Wrong sorting key!`)}`);
			console.log(`${sym.info} You can only sort states data by:
${dim(`-`)} ${green(`cases`)}
${dim(`-`)} ${green(`cases-today`)}
${dim(`-`)} ${green(`deaths`)}
${dim(`-`)} ${green(`deaths-today`)}
${dim(`-`)} ${green(`active`)}\n`);
			process.exit(0);
		}
		// It is a custom sort.
		return true;
	}
	// Not a custom sort.
	return false;
};
