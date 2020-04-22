const comma = require('comma-number');
const handleError = require('cli-handle-error');
const axios = require('axios');
const to = require('await-to-js').default;
const moment = require('moment');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const { sortingKeys } = require('./table.js');
const orderBy = require('lodash.orderby');

module.exports = async (spinner, countryName, states, { bar, log, sortBy, limit, reverse }) => {
	if (!countryName && !states && bar) {
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
        limit = limit>12 ? 12: limit;
		allCountries = allCountries.slice(0, limit);


        let logScale = x => x;
		if (log) {
			logScale = x => (x === 0 ? undefined : Math.log(x));
		}
        // Format Stack Data
        barCountries = {};
        allCountries.map((country, count)=>{
            barCountries[country.country]=[
                logScale(country.cases),
                logScale(country.deaths),
                logScale(country.recovered)
            ];
        });

        const names = Object.keys(barCountries);
        const data = Object.values(barCountries);

        const screen = blessed.screen();

        const stack = contrib.stackedBar(
           { label: 'Total Case Comparison'
           , barWidth: 10
           , barSpacing: 10
           , xOffset: 0
           //, maxValue: 15
           , height: "100%"
           , width: "100%"
           , barBgColor: [ 'cyan', 'red', 'green' ]})

        screen.append(stack);
        spinner.stop();
        stack.setData(
           { barCategory: names
           , stackedCategory: ['CASES', 'DEATHS', 'RECOVERED']
           , data:
              data
          });
		screen.render();
		await new Promise((resolve, _) => {
			screen.key(['escape', 'q', 'C-c', 'enter', 'space'], (ch, key) => {
				return process.exit(0);
			});
		});
	}
};
