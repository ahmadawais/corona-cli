const welcome = require('cli-welcome');
const pkgJSON = require('./../package.json');
const updateNotifier = require('update-notifier');

module.exports = async () => {
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
