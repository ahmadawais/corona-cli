const meow = require('meow');
const { green, yellow, cyan } = require('chalk');

module.exports = meow(
	`
	Usage
	  ${green(`corona`)} ${cyan(`<command>`)} ${yellow(`[--option]`)}

	Commands
	  ${cyan(`country-name`)}  Get data for a given country
	  ${cyan(`states`)}        Get data for all USA states

	Options
	  ${yellow(`--sort`)}, ${yellow(`-s`)}      Sort data by type
	  ${yellow(`--reverse`)}, ${yellow(`-r`)}   Reverse print order
	  ${yellow(`--limit`)}, ${yellow(`-l`)}     Print only N entries
	  ${yellow(`--bar`)}, ${yellow(`-b`)}       Print stats in bar charts
	  ${yellow(`--chart`)}, ${yellow(`-c`)}     Print chart for a country
	  ${yellow(`--log`)}, ${yellow(`-g`)}       Print logarithmic chart
	  ${yellow(`--xcolor`)}, ${yellow(`-x`)}    Single colored output
	  ${yellow(`--minimal`)}, ${yellow(`-m`)}   Minimalistic CLI output
	  ${yellow(`--json`)}, ${yellow(`-j`)}      Output JSON only data
	  ${yellow(`--yesterday`)}, ${yellow(`-y`)}      Show yesterday data

	Examples
	  ${green(`corona`)} ${cyan(`china`)}
	  ${green(`corona`)} ${cyan(`states`)}
	  ${green(`corona`)} ${yellow(`--bar`)}
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`--chart`)}
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`--chart`)} ${yellow(`--log`)}
	  ${green(`corona`)} ${yellow(`--sort`)} ${cyan(`cases-today`)}
	  ${green(`corona`)} ${yellow(`-s`)} ${cyan(`critical`)}

	❯ You can also run command + option at once:
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`-x`)} ${yellow(`-s cases`)}
`,
	{
		booleanDefault: undefined,
		hardRejection: false,
		inferType: false,
		flags: {
			xcolor: {
				type: 'boolean',
				default: false,
				alias: 'x'
			},
			sort: {
				type: 'string',
				default: 'cases',
				alias: 's'
			},
			reverse: {
				type: 'boolean',
				default: false,
				alias: 'r'
			},
			limit: {
				type: 'number',
				default: Number.MAX_SAFE_INTEGER,
				alias: 'l'
			},
			chart: {
				type: 'boolean',
				default: false,
				alias: 'c'
			},
			log: {
				type: 'boolean',
				default: false,
				alias: 'g'
			},
			bar: {
				type: 'boolean',
				default: false,
				alias: 'b'
			},
			minimal: {
				type: 'boolean',
				default: false,
				alias: 'm'
			},
			json: {
				type: 'boolean',
				default: false,
				alias: 'j'
			},
			yesterday: {
				type: 'boolean',
				default: false,
				alias: 'y'
			}
		}
	}
);
