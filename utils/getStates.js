const axios = require('axios');
const chalk = require('chalk');

const { cyan } = chalk;
const { dim } = chalk;
const comma = require('comma-number');
const { sortingStateKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');

module.exports = async (spinner, table, states, { sortBy, limit, reverse }) => {
	if (states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/states`)
		);
		handleError(`API is down, try again later.`, err, false);
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
