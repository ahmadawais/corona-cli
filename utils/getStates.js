const axios = require('axios');
const { cyan, dim } = require('chalk');
const numberFormat = require('./numberFormat');
const { sortingStateKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');
const sortStatesValidation = require('./sortStatesValidation.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = async (
	spinner,
	output,
	states,
	{ sortBy, limit, reverse, json, bar }
) => {
	if (states && !bar) {
		sortStatesValidation(sortBy, spinner);
		const [err, response] = await to(
			axios.get(`https://disease.sh/v3/covid-19/states`)
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

		const csvWriter = createCsvWriter({
			path: 'output/chart.csv',
			header: [
			  {id: 'state', title: 'State'},
			  {id: 'cases', title: 'Cases'},
			  {id: 'todayCases', title: 'Cases (today)'},
			  {id: 'deaths', title: 'Deaths'},
			  {id: 'todayDeaths', title: 'Deaths (today)'},
			  {id: 'active', title: 'Active'},
			]
		});

		csvWriter.writeRecords(allStates);

		console.log(output.toString());
	}
};
