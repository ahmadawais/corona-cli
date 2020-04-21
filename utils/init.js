const sym = require('log-symbols');
const welcome = require('cli-welcome');
const checkNode = require('cli-check-node');
const pkgJSON = require('./../package.json');
const unhandledError = require('cli-handle-unhandled');
const checkForUpdate = require('update-check');
const { yellow, green } = require('chalk');
const boxen = require('boxen');

module.exports = async () => {
	unhandledError();
	checkNode(`10`);
	welcome(`corona-cli`, `by Awais.dev\n${pkgJSON.description}`, {
		bgColor: `#007C91`,
		color: `#FFFFFF`,
		bold: true,
		clear: true,
		version: `v${pkgJSON.version}`
	});

	const update = await checkForUpdate(pkgJSON);
	if (update) {
		console.log(
			boxen(
				`
${yellow(`UPDATE AVAILABLE!`)}
${sym.info} Run ${green(`npm i -g corona-cli@latest`)} for v${update.latest}
${sym.info} https://git.io/corona-cli-changelog\n`,
				{ padding: 1, dimBorder: true, align: `center` }
			)
		);
	}
};
