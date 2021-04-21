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
	  ${yellow(`-s`)}, ${yellow(`--sort`)}      Sort data by type
	  ${yellow(`-r`)}, ${yellow(`--reverse`)}   Reverse print order
	  ${yellow(`-l`)}, ${yellow(`--limit`)}     Print only N entries
	  ${yellow(`-b`)}, ${yellow(`--bar`)}       Print stats in bar charts
	  ${yellow(`-c`)}, ${yellow(`--chart`)}     Print chart for a country
	  ${yellow(`-g`)}, ${yellow(`--log`)}       Print logarithmic chart
	  ${yellow(`-x`)}, ${yellow(`--xcolor`)}    Single colored output
	  ${yellow(`-m`)}, ${yellow(`--minimal`)}   Minimalistic CLI output
	  ${yellow(`-j`)}, ${yellow(`--json`)}      Output JSON only data
	  ${yellow(`-y`)}, ${yellow(`--yesterday`)}      Show yesterday data

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
