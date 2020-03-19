#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	handleError(`UNHANDLED ERROR`, err);
});

const Table = require('cli-table3');
const welcome = require('cli-welcome');
const handleError = require('cli-handle-error');
const pkgJSON = require('./package.json');
const axios = require('axios');
const chalk = require('chalk');
const green = chalk.green;
const red = chalk.red;
const dim = chalk.dim;
const cli = require('./utils/cli.js');
const xcolor = cli.flags.xcolor;
const comma = require('comma-number');

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
})();
