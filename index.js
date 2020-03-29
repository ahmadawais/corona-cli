#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
	handleError(`UNHANDLED ERROR`, err);
});

const ora = require('ora');
const spinner = ora({ text: '' });
const Table = require('cli-table3');
const cli = require('./utils/cli.js');
const init = require('./utils/init.js');
const theEnd = require('./utils/theEnd.js');
const handleError = require('cli-handle-error');
const getStates = require('./utils/getStates.js');
const getCountry = require('./utils/getCountry.js');
const getWorldwide = require('./utils/getWorldwide.js');
const getCountries = require('./utils/getCountries.js');
const validateOptions = require('./utils/validateOptions');
const commonUtils = require('./utils/commonUtils');
const {
	style,
	single,
	colored,
	singleStates,
	coloredStates,
	borderless
} = require('./utils/table.js');
const xcolor = cli.flags.xcolor;
const sortBy = cli.flags.sort;
const reverse = cli.flags.reverse;
const limit = Math.abs(cli.flags.limit);
const date = cli.flags.date;
const minimal = cli.flags.minimal;
const options = { sortBy, limit, reverse, date, minimal };
const flagValidation = validateOptions(cli.flags);
(async () => {
	// Init.
	init(minimal);
	const [input] = cli.input;
	input === 'help' && (await cli.showHelp(0));
	if (flagValidation.status) {
		commonUtils.throwError({
			type: flagValidation.type,
			message: flagValidation.error
		});
		await cli.showHelp(0);
	}
	const states = input === 'states' ? true : false;
	const country = input;

	// Table
	const head = xcolor ? single : colored;
	const headStates = xcolor ? singleStates : coloredStates;
	const border = minimal ? borderless : {};
	const table = !states
		? new Table({ head, style, chars: border })
		: new Table({ head: headStates, style, chars: border });
	// Display data.
	spinner.start();
	const lastUpdated = await getWorldwide(table, states);
	await getCountry(spinner, table, states, country, options);
	await getStates(spinner, table, states, options);
	await getCountries(spinner, table, states, country, options);

	theEnd(lastUpdated, states, minimal);
})();
