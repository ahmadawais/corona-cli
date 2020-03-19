const meow = require('meow');
const chalk = require('chalk');
const green = chalk.green;
const yellow = chalk.yellow;
const cyan = chalk.cyan;
const dim = chalk.dim;

module.exports = meow(
	`
	Usage
	  ${green(`corona`)} ${cyan(`<command>`)} ${yellow(`[--option]`)}

	Commands
	  ${cyan(`country-name`)}         Get data for a given country

	Options
	  ${yellow(`--xcolor`)}, ${yellow(`-x`)}         Single colored output

	Examples
	  ${green(`corona`)} ${cyan(`china`)}
	  ${green(`corona`)} ${yellow(`-x`)}

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
			}
		}
	}
);
