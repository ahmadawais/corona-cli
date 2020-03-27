const meow = require('meow');
const chalk = require('chalk');
const green = chalk.green;
const yellow = chalk.yellow;
const cyan = chalk.cyan;

module.exports = meow(
	`
	Usage
	  ${green(`corona`)} ${cyan(`<command>`)} ${yellow(`[--option]`)}

	Commands
	  ${cyan(`country-name`)}         Get data for a given country
	  ${cyan(`states`)}               Get data for all USA states

	Options
	  ${yellow(`--xcolor`)}, ${yellow(`-x`)}         Single colored output
	  ${yellow(`--sort`)}, ${yellow(`-s`)}           Sort data by type
	  ${yellow(`--reverse`)}, ${yellow(`-r`)}        Reverse print order
	  ${yellow(`--limit`)}, ${yellow(`-l`)}          Print only N entries
	  ${yellow(`--compare`)}, ${yellow(`-c`)}          Statistical comparison between countries 

	Examples
	  ${green(`corona`)} ${cyan(`china`)}
	  ${green(`corona`)} ${cyan(`states`)}
	  ${green(`corona`)} ${yellow(`-x`)}
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
			minimal: {
				type: 'boolean',
				defualt: false,
				alias: 'm'
			},
			compare: {
				type: 'array',
				default: [],
				alias: 'c'
			}
		}
	}
);
