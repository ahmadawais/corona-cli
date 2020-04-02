const handleError = require('cli-handle-error');
var axios = require('axios');
const to = require('await-to-js').default;
const moment = require('moment');

module.exports = async (spinner, countryName, options) => {
	if (countryName && options.chart) {
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
		var logScale = x => x;
		if (options.log) {
			logScale = x => (x === 0 ? undefined : Math.log(x));
		}
		var shortDate = x => moment(x, 'MM/DD/YY').format('D MMM');
		var cumulative = (a, b) => (a = a + b);
		var blessed = require('blessed'),
			contrib = require('blessed-contrib'),
			screen = blessed.screen(),
			line = contrib.line({
				style: {
					text: 'white',
					baseline: 'white'
				},
				xLabelPadding: 10,
				abbreviate: true,
				xPadding: 1,
				showLegend: true,
				wholeNumbersOnly: false, //true=do not show fraction in y axis
				label: countryName
			});
		var dates = Object.keys(response.data.timeline.cases).map(shortDate);
		var cases = Object.values(response.data.timeline.cases);
		var deaths = Object.values(response.data.timeline.deaths);
		var recovered = Object.values(response.data.timeline.recovered);

		var casesSeries = {
			title: `cases__${cases[cases.length - 1]}`,
			x: dates,
			y: cases.map(logScale),
			style: {
				line: 'cyan'
			}
		};
		var deathsSeries = {
			title: `deaths__${deaths[deaths.length - 1]}`,
			x: dates,
			y: deaths.map(logScale),
			style: {
				line: 'red'
			}
		};
		var recoveredSeries = {
			title: `recovered__${recovered[deaths.length - 1]}`,
			x: dates,
			y: recovered.map(logScale),
			style: {
				line: 'green'
			}
		};

		screen.append(line);
		spinner.stop();
		line.setData([casesSeries, recoveredSeries, deathsSeries]);
		screen.render();
		await new Promise((resolve, _) => {
			screen.key(['escape', 'q', 'C-c', 'enter'], function (ch, key) {
				return process.exit(0);
			});
		});
	}
};
