const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const dim = chalk.dim;
const numberFormat = require('./numberFormat');
const { sortingStateKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');

module.exports = async (spinner, output, states, { sortBy, limit, reverse, json }) => {
	if (states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/states`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allStates = response.data;

		// Limit.
		allStates = allStates.slice(0, limit);

		// Format.
		const format = numberFormat(json);

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allStates = orderBy(allStates, [sortingStateKeys[sortBy]], [direction]);

		// Push selected data.
		allStates.map((oneState, count) => {
			output.push([
				count + 1,
				oneState.state,
				format(oneState.cases),
				format(oneState.todayCases),
				format(oneState.deaths),
				format(oneState.todayDeaths),
				format(oneState.active)
			]);
		});

		spinner.stopAndPersist();
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		if (!json) {
			spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		}
		console.log(output.toString());
	}
};
