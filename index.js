#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
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
const getCountryChart = require('./utils/getCountryChart.js');
const getWorldwide = require('./utils/getWorldwide.js');
const getCountries = require('./utils/getCountries.js');
const {
	style,
	single,
	colored,
	singleStates,
	coloredStates,
	borderless
} = require('./utils/table.js');

// Cli.
const [input] = cli.input;
const xcolor = cli.flags.xcolor;
const sortBy = cli.flags.sort;
const reverse = cli.flags.reverse;
const limit = Math.abs(cli.flags.limit);
const chart = cli.flags.chart;
const log = cli.flags.log;
const minimal = cli.flags.minimal;
const add = cli.flags.add;

// Allowed Keys should match keys inside the API response
const allowedColumnKeys = ['tests', 'testsPerOneMillion'];
// Column Names - display name shown in table header
const allowedColumnNames = ['Tests', 'Tests Per Million'];

const extraColumns = // parse and validate allowed extra columns
	add.split(',').filter(col => allowedColumnKeys.includes(col));

const options = { sortBy, limit, reverse, minimal, chart, log, extraColumns };

(async () => {
	// Init.
	init(minimal);
	input === 'help' && (await cli.showHelp(0));
	const states = input === 'states' ? true : false;
	const country = input;

	// Table
	const head = xcolor ? single : colored;
	const headStates = xcolor ? singleStates : coloredStates;
	const border = minimal ? borderless : {};
	const table = !states
		? new Table({ head, style, chars: border })
		: new Table({ head: headStates, style, chars: border });

	// Inject extra columns.
	head.push(...extraColumns.map(col =>
		// Fetch column header name from key
		allowedColumnNames[allowedColumnKeys.indexOf(col)],
	));

	// Display data.
	spinner.start();
	const lastUpdated = await getWorldwide(table, states, options);
	await getCountry(spinner, table, states, country, options);
	await getStates(spinner, table, states, options);
	await getCountries(spinner, table, states, country, options);
	await getCountryChart(spinner, country, options);

	theEnd(lastUpdated, states, minimal);
})();
