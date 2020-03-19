#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	handleError(`UNHANDLED ERROR`, err);
});

const chalk = require('chalk');
const axios = require('axios');
const Table = require('cli-table3');
const comma = require('comma-number');
const cli = require('./utils/cli.js');
const welcome = require('cli-welcome');
const pkgJSON = require('./package.json');
const logSymbols = require('log-symbols');
const handleError = require('cli-handle-error');
const updateNotifier = require('update-notifier');
const xcolor = cli.flags.xcolor;
const green = chalk.green;
const red = chalk.red;
const dim = chalk.dim;

(async () => {
	welcome(
		`corona-cli`,
		`by Awais.dev\n${pkgJSON.description}\n\n${dim(
			`Stargaze the repo for updates ↓\nhttps://github.com/ahmadawais/corona-cli`
		)}`,
		{
			bgColor: `#007C91`,
			color: `#FFFFFF`,
			bold: true,
			clear: true,
			version: `v${pkgJSON.version}`
		}
	);
	updateNotifier({
		pkg: pkgJSON,
		shouldNotifyInNpmScript: true
	}).notify({ isGlobal: true });

	// Init.
	const [country] = cli.input;

	const headSingle = [
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`Deaths`,
		`Deaths ${dim(`(today)`)}`,
		`Recovered`,
		`Active`,
		`Critical`,
		`Per Million`
	];

	const headColored = [
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`${red(`Deaths`)}`,
		`${red(`Deaths (today)`)}`,
		`${green(`Recovered`)}`,
		`Active`,
		`${red(`Critical`)}`,
		`Per Million`
	];

	const head = xcolor ? headSingle : headColored;
	const table = new Table({
		head,
		style: { head: ['cyan'] }
	});

	// Overall.
	const all = await axios.get(`https://corona.lmao.ninja/all`);
	let data = Object.values(all.data);
	data = data.map(d => comma(d));
	table.push([`Worldwide`, data[0], `—`, data[1], `—`, data[2], `—`, `—`, `—`]);

	if (country) {
		const api = await axios.get(`https://corona.lmao.ninja/countries/${country}`);
		if (api.data === 'Country not found') {
			console.log(`${red(`${logSymbols.error} Nops. A country named "${country}" does not exist…`)}\n`);
			process.exit(0);
		}
		let data = Object.values(api.data);
		data = data.map(d => comma(d));
		table.push(data);
		console.log(table.toString());
	}

	if (!country) {
		const api = await axios.get(`https://corona.lmao.ninja/countries`);
		const all = api.data;
		all.map(one => {
			let data = Object.values(one);
			data = data.map(d => comma(d));
			return table.push(data);
		});
		console.log(table.toString());
	}

	console.log(
		dim(
			`\nFound a bug? Report here ↓\nhttps://github.com/ahmadawais/corona-cli/issues\nFollow on twitter → https://twitter.com/MrAhmadAwais\n`
		)
	);
})();
