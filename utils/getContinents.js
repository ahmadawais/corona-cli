const axios = require('axios');
const { cyan, dim } = require('chalk');
const numberFormat = require('./numberFormat');
const { sortingKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');
const sortValidation = require('./sortValidation.js');



module.exports = async (
	spinner,
	table,
	states,
	continents,
{ sortBy, reverse, bar, json }
) => {
	if(continents && !states && !bar){
		sortValidation(sortBy, spinner);
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/continents`)
		);

		//exitContinent()
		handleError(`API is down, try again later.`, err, false);
		let allContinents = response.data;
		const format = numberFormat(json);

		const direction = reverse ? 'asc' : 'desc';
		allContinents = orderBy(
			allContinents,
			[sortingKeys[sortBy]],
			[direction]
		)

		allContinents.map((thisContinent, count) => {
			table.push([
				count + 1,
				thisContinent.continent,
				format(thisContinent.cases),
				format(thisContinent.todayCases),
				format(thisContinent.deaths),
				format(thisContinent.todayDeaths),
				format(thisContinent.recovered),
				format(thisContinent.active),
				format(thisContinent.critical),
			])
		})
		spinner.stopAndPersist();
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		if (!json) {
			spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		}

		console.log(table.toString());
	}
};
