#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
	handleError(`UNHANDLED ERROR`, err);
});

const ora = require("ora");
const spinner = ora({ text: "" });
const Table = require("cli-table3");
const cli = require("./utils/cli.js");
const init = require("./utils/init.js");
const getAll = require("./utils/getAll.js");
const showHelp = require("./utils/showHelp.js");
const theEnd = require("./utils/theEnd.js");
const handleError = require("cli-handle-error");
const getCountry = require("./utils/getCountry.js");
const getStates = require("./utils/getStates.js");
const getWorldwide = require("./utils/getWorldwide.js");
const {
	single,
	colored,
	singleStates,
	coloredStates,
	style,
	tab_borderless
} = require("./utils/table.js");
const xcolor = cli.flags.xcolor;
const sortBy = cli.flags.sort;
const quiet = cli.flags.quiet;
const borderless = cli.flags.borderless;

(async () => {
	// Init.
	init(quiet);
	const [input] = cli.input;
	await showHelp();
	const states = input === "states" ? true : false;
	const country = input;

	// Table
	const head = xcolor ? single : colored;
	const headStates = xcolor ? singleStates : coloredStates;
	const table = !states
		? borderless
			? new Table({ head, style, chars:tab_borderless })
			: new Table({ head, style })
		: borderless
			? new Table({ head: headStates, style, chars:tab_borderless })
			: new Table({ head: headStates, style});
	

	// Display data.
	spinner.start();
	const lastUpdated = await getWorldwide(table, states);
	await getCountry(spinner, table, states, country);
	await getStates(spinner, table, states, sortBy);
	await getAll(spinner, table, states, country, sortBy);
	theEnd(lastUpdated, states, quiet);
})();
