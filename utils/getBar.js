const handleError = require('cli-handle-error');
const axios = require('axios');
const to = require('await-to-js').default;
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const { sortingKeys } = require('./table.js');
const orderBy = require('lodash.orderby');
const { cyan, dim } = require('chalk');
const sortValidation = require('./sortValidation.js');
const sortStateValidation = require('./sortStateValidation.js');

module.exports = async (
	spinner,
	countryName,
	states,
	{ bar, log, sortBy, limit, reverse }
) => {
	if (bar) {
		// Handle custom sorting and validate it.
		const customSort = states
			? sortStateValidation(sortBy, spinner)
			: sortValidation(sortBy, spinner);
		let logScale = x => x;
		if (log) {
			logScale = x => (x === 0 ? undefined : Math.log(x));
		}

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
		const screen = blessed.screen();

		const statesURL = `https://corona.lmao.ninja/v2/states`;
		const countriesURL = `https://corona.lmao.ninja/v2/countries`;

		const [err, response] = await to(
			axios.get(states ? statesURL : countriesURL)
		);

		handleError(`API is down, try again later.`, err, false);
		let allRegions = response.data;
		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allRegions = orderBy(allRegions, [sortingKeys[sortBy]], [direction]);

		// Limit.
		limit = limit > 10 ? 10 : limit;
		allRegions = allRegions.slice(0, limit);

		// Format Stack Data.
		barRegions = {};
		allRegions.map(region => {
			if (customSort) {
				barRegions[region[states ? 'state' : 'country']] = [
					logScale(region[sortingKeys[sortBy]])
				];
			} else {
				barRegions[region[states ? 'state' : 'country']] = [
					logScale(region.cases),
					logScale(region.deaths),
					logScale(
						states
							? region.cases - region.active - region.deaths
							: region.recovered
					)
				];
			}
		});

		const names = Object.keys(barRegions);
		const data = Object.values(barRegions);

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
