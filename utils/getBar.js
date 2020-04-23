const handleError = require('cli-handle-error');
const axios = require('axios');
const to = require('await-to-js').default;
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const { sortingKeys } = require('./table.js');
const orderBy = require('lodash.orderby');
const { cyan, dim } = require('chalk');
const sortValidation = require('./sortValidation.js');

module.exports = async (
	spinner,
	countryName,
	states,
	{ bar, log, sortBy, limit, reverse }
) => {
	if (!countryName && !states && bar) {
		// Handle custom sorting and validate it.
		const customSort = sortValidation(sortBy, spinner);

		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/countries`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allCountries = response.data;

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allCountries = orderBy(
			allCountries,
			[sortingKeys[sortBy]],
			[direction]
		);

		// Limit.
		limit = limit > 12 ? 12 : limit;
		allCountries = allCountries.slice(0, limit);

		let logScale = x => x;
		if (log) {
			logScale = x => (x === 0 ? undefined : Math.log(x));
		}

		// Format Stack Data.
		barCountries = {};

		allCountries.map(country => {
			if (customSort) {
				barCountries[country.country] = [
					logScale(country[sortingKeys[sortBy]])
				];
			} else {
				barCountries[country.country] = [
					logScale(country.cases),
					logScale(country.deaths),
					logScale(country.recovered)
				];
			}
		});

		const names = Object.keys(barCountries);
		const data = Object.values(barCountries);
		const screen = blessed.screen();

		// Better colors.
		const getColors = {
			cases: 'cyan',
			'cases-today': 'cyan',
			deaths: 'red',
			'deaths-today': 'red',
			recovered: 'green',
			active: 'yellow',
			critical: 'red',
			'per-million': 'cyan'
		};
		const firstColor = customSort ? getColors[sortBy] : 'cyan';

		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		const label = `${cyan(`Sorted by:`)} ${sortBy}${isRev}`;
		const stack = contrib.stackedBar({
			label,
			barWidth: 10,
			barSpacing: 10,
			xOffset: 2,
			height: '100%',
			width: '100%',
			barBgColor: [firstColor, 'red', 'green'],
			barFgColor: 'black',
			labelColor: 'white',
			legend: { width: 20, padding: 5 }
		});

		screen.append(stack);
		spinner.stop();
		stack.setData({
			barCategory: names,
			stackedCategory:
				sortBy !== 'cases'
					? [`${sortBy.toUpperCase()}`]
					: ['CASES', 'DEATHS', 'RECOVERED'],
			data: data
		});
		screen.render();

		await new Promise((resolve, _) => {
			screen.key(['escape', 'q', 'C-c', 'enter', 'space'], (ch, key) => {
				return process.exit(0);
			});
		});
	}
};
