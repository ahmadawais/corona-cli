const welcome = require('cli-welcome');
const checkNode = require('cli-check-node');
const updateNotifier = require('update-notifier');
const unhandledError = require('cli-handle-unhandled');
const pkgJSON = require('./../package.json');

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
	updateNotifier({
		pkg: pkgJSON,
		shouldNotifyInNpmScript: true,
		updateCheckInterval: 1000 * 60 * 60 * 24 // 24 hours.
	}).notify({ isGlobal: true });
};
