const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const dim = chalk.dim;
const comma = require('comma-number');
const { sortingStateKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');

module.exports = async (spinner, table, states, { stateName, sortBy, limit, reverse }) => {
	if (states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/states`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allStates = response.data;

		// Limit.
		allStates = allStates.slice(0, limit);

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allStates = orderBy(allStates, [sortingStateKeys[sortBy]], [direction]);

		// Push selected data.
		if (stateName) {
		const state = stateName;
		allStates.map((oneState, count) => {
			if (oneState.state === state)
					table.push([
						'-',
						oneState.state,
						comma(oneState.cases),
						comma(oneState.todayCases),
						comma(oneState.deaths),
						comma(oneState.todayDeaths),
						comma(oneState.active)
					]);
				});
		}
		else { allStates.map((oneState, count) => {
						table.push([
							count + 1,
							oneState.state,
							comma(oneState.cases),
							comma(oneState.todayCases),
							comma(oneState.deaths),
							comma(oneState.todayDeaths),
							comma(oneState.active)
						]);
		});
	};

		spinner.stopAndPersist();
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		console.log(table.toString());
	}
};
