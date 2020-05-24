const { red } = require('chalk');
const sym = require('log-symbols');

module.exports = (err, spinner, continent) => {
	if (
		err &&
		err.response &&
		err.response.status &&
		err.response.status === 404
	) {
		spinner.stopAndPersist();
		console.log(
			`${red(
				`${sym.error} Oops. A continent named "${continent}" doesn't exist…`
			)}\n`
		);
		process.exit(0);
	}
};
