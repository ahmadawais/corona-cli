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
const getAll = require('./utils/getAll.js');
const theEnd = require('./utils/theEnd.js');
const handleError = require('cli-handle-error');
const getCountry = require('./utils/getCountry.js');
const getWorldwide = require('./utils/getWorldwide.js');
const { single, colored, style } = require('./utils/table.js');
const xcolor = cli.flags.xcolor;

(async () => {
	// Init.
	init();
	const [country] = cli.input;

	// Table
	const head = xcolor ? single : colored;
	const table = new Table({ head, style });

	// Display data.
	spinner.start();
	await getWorldwide(table);
	await getCountry(spinner, table, country);
	await getAll(spinner, table, country);

	theEnd();
})();
