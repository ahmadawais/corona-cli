const comma = require('comma-number');
const handleError = require('cli-handle-error');
const axios = require('axios');
const to = require('await-to-js').default;
const moment = require('moment');
const blessed = require('blessed');
const contrib = require('blessed-contrib');

module.exports = async (spinner, countryName, { chart, log }) => {
    console.log("CHART: " + log)
	if (countryName && chart) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/historical/${countryName}`)
		);
		handleError(`API is down, try again later.`, err, false);
		if (response.status === 404) {
			spinner.stopAndPersist();
			console.log(
				`${red(
					`${sym.error} Nops. A country named "${countryName}" does not exist…`
				)}\n`
			);
			process.exit(0);
		}
		let logScale = x => x;
		if (log) {
			logScale = x => (x === 0 ? undefined : Math.log(x));
		}
		const shortDate = x => moment(x, 'MM/DD/YY').format('D MMM');
		const cumulative = (a, b) => (a = a + b);
		const screen = blessed.screen();
		const line = contrib.line({
			style: {
				text: 'white',
				baseline: 'white'
			},
			xLabelPadding: 10,
			xPadding: 3,
			abbreviate: true,
			showLegend: true,
			legend: { width: 20 },
			wholeNumbersOnly: false,
			label: countryName.toUpperCase()
		});
		const dates = Object.keys(response.data.timeline.cases).map(shortDate);
		const cases = Object.values(response.data.timeline.cases);
		const deaths = Object.values(response.data.timeline.deaths);
		const recovered = Object.values(response.data.timeline.recovered);

		const casesSeries = {
			title: `CASES: ${comma(cases[cases.length - 1])}`,
			x: dates,
			y: cases.map(logScale),
			style: {
				line: 'cyan'
			}
		};
		const deathsSeries = {
			title: `DEATHS: ${comma(deaths[deaths.length - 1])}`,
			x: dates,
			y: deaths.map(logScale),
			style: {
				line: 'red'
			}
		};
		const recoveredSeries = {
			title: `RECOVERED: ${comma(recovered[deaths.length - 1])}`,
			x: dates,
			y: recovered.map(logScale),
			style: {
				line: 'green'
			}
		};

		screen.append(line);
		spinner.stop();
		line.setData([casesSeries, deathsSeries, recoveredSeries]);
		screen.render();
		await new Promise((resolve, _) => {
			screen.key(['escape', 'q', 'C-c', 'enter', 'space'], (ch, key) => {
				return process.exit(0);
			});
		});
	}
};
