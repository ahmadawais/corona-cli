#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	handleError(`UNHANDLED ERROR`, err);
});

const ora = require('ora');
const Table = require('cli-table3');
const JsonOutput = require('./utils/JsonOutput.js');
const cli = require('./utils/cli.js');
const init = require('./utils/init.js');
const theEnd = require('./utils/theEnd.js');
const handleError = require('cli-handle-error');
const getStates = require('./utils/getStates.js');
const getCountry = require('./utils/getCountry.js');
const getCountryChart = require('./utils/getCountryChart.js');
const getBar = require('./utils/getBar.js');
const getWorldwide = require('./utils/getWorldwide.js');
const getCountries = require('./utils/getCountries.js');
const getVaccines = require('./utils/getVaccines');
const {
	style,
	single,
	colored,
	singleStates,
	coloredStates,
	borderless,
	vaccinesTable,
	coloredVaccinesTable
} = require('./utils/table.js');

// Cli.
const [input] = cli.input;
const xcolor = cli.flags.xcolor;
const sortBy = cli.flags.sort;
const reverse = cli.flags.reverse;
const limit = Math.abs(cli.flags.limit);
const chart = cli.flags.chart;
const log = cli.flags.log;
const bar = cli.flags.bar;
const minimal = cli.flags.minimal;
const json = cli.flags.json;
const vaccines = cli.flags.vaccines;
const options = { sortBy, limit, reverse, minimal, chart, vaccines, log, json, bar };

(async () => {
	// Init.
	await init(minimal || json);
	const spinner = ora({ text: '' });
	input === 'help' && (await cli.showHelp(0));
	const states = input === 'states';
	const country = states ? '' : input;

	// Table
	const head = xcolor ? single : colored;
	const headStates = xcolor ? singleStates : coloredStates;
	const headVaccines = xcolor ? vaccinesTable : coloredVaccinesTable;
	const border = minimal ? borderless : {};
	const OutputFormat = json ? JsonOutput : Table;
	let output;
	if(states){
		output = new OutputFormat({ head: headStates, style, chars: border });
	}else if(vaccines){
		output = new OutputFormat({ head: headVaccines, style, chars: border });
	}else{
		output = new OutputFormat({ head, style, chars: border });
	}

	// Display data.
	spinner.start();
	const lastUpdated = await getWorldwide(output, states,vaccines, json);
	await getCountry(spinner, output, states, country, options);
	await getStates(spinner, output, states, options);
	await getVaccines(spinner, output, options);
	await getCountries(spinner, output, states, country, options);
	await getCountryChart(spinner, country, options);
	await getBar(spinner, country, states, options);

	theEnd(lastUpdated, states, vaccines ,minimal || json);
})();
