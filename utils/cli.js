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

	Options
	  ${yellow(`--xcolor`)}, ${yellow(`-x`)}         Single colored output
	  ${yellow(`--sort`)}, ${yellow(`-s`)}           Sort data by type

	Examples
	  ${green(`corona`)} ${cyan(`china`)}
	  ${green(`corona`)} ${yellow(`-x`)}
	  ${green(`corona`)} ${yellow(`--sort`)} ${cyan(`cases-today`)}
	  ${green(`corona`)} ${yellow(`-s`)} ${cyan(`critical`)}

	❯ You can also run command + option at once:
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`-x`)}
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
				default: 'cases-today',
				alias: 's'
			}
		}
	}
);
