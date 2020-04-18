const welcome = require('cli-welcome');
const checkNode = require('cli-check-node');
const pkgJSON = require('./../package.json');
const updateNotifier = require('update-notifier');
const unhandledError = require('cli-handle-unhandled');

const MINIMUM_NODE_JS_VERSION = '10';

module.exports = async dangerous => {
	unhandledError();
	if (!dangerous) {
		checkNode(MINIMUM_NODE_JS_VERSION);
	}
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
