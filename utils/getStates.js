const axios = require("axios");
const chalk = require("chalk");
const comma = require("comma-number");
const { sortingStateKeys } = require("./table.js");
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");
const orderBy = require("lodash.orderby");

module.exports = async (spinner, table, states, sortBy, reverse) => {
	if (states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/states`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allStates = response.data;

		// Sort.
		if ( reverse !== undefined ) {
			allStates = orderBy(allStates, [sortingStateKeys[sortBy]], ["asc"]);
		} else {
			allStates = orderBy(allStates, [sortingStateKeys[sortBy]], ["desc"]);
		}

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
		spinner.info(`${chalk.cyan(`Sorted by:`)} ${sortBy}`);
		if ( reverse !== undefined ) {
			spinner.info(`${chalk.cyan(`Order:`)} reverse`);
		}
		console.log(table.toString());
	}
};
