const chalk = require('chalk');
const cyan = chalk.cyan;
const dim = chalk.dim;
const comma = require('comma-number');
const { sortingStateKeys } = require('./table.js');
const orderBy = require('lodash.orderby');
const fetchAndHandleErrors = require('./fetchAndHandleErrors.js');

module.exports = async (spinner, table, states, { sortBy, limit, reverse }) => {
	if (states) {
		const { response } = await fetchAndHandleErrors(
			`https://corona.lmao.ninja/states`
		);
		let allStates = response.data;

		// Limit.
		allStates = allStates.slice(0, limit);

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allStates = orderBy(allStates, [sortingStateKeys[sortBy]], [direction]);

		// Push selected data.
		allStates.map((oneState, count) => {
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

		spinner.stopAndPersist();
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		console.log(table.toString());
	}
};
