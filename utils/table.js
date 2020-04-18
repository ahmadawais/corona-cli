const chalk = require('chalk');

const { green } = chalk;
const { red } = chalk;
const { yellow } = chalk;
const { dim } = chalk;

module.exports = {
	single: [
		`#`,
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`Deaths`,
		`Deaths ${dim(`(today)`)}`,
		`Recovered`,
		`Active`,
		`Critical`,
		`Per Million`
	],
	colored: [
		`#`,
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`${red(`Deaths`)}`,
		`${red(`Deaths (today)`)}`,
		`${green(`Recovered`)}`,
		`${yellow(`Active`)}`,
		`${red(`Critical`)}`,
		`Per Million`
	],
	singleStates: [
		`#`,
		`State`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`Deaths`,
		`Deaths ${dim(`(today)`)}`,
		`Active`
	],
	coloredStates: [
		`#`,
		`State`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`${red(`Deaths`)}`,
		`${red(`Deaths (today)`)}`,
		`${yellow(`Active`)}`
	],
	style: { head: ['cyan'] },
	borderless: {
		top: '',
		'top-mid': '',
		'top-left': '',
		'top-right': '',
		bottom: '',
		'bottom-mid': '',
		'bottom-left': '',
		'bottom-right': '',
		left: '',
		'left-mid': '',
		mid: '',
		'mid-mid': '',
		right: '',
		'right-mid': '',
		middle: ' '
	},
	sortingKeys: {
		country: 'country',
		cases: 'cases',
		'cases-today': 'todayCases',
		deaths: 'deaths',
		'deaths-today': 'todayDeaths',
		recovered: 'recovered',
		active: 'active',
		critical: 'critical',
		'per-million': 'casesPerOneMillion'
	},
	sortingStateKeys: {
		state: 'state',
		cases: 'cases',
		'cases-today': 'todayCases',
		deaths: 'deaths',
		'deaths-today': 'todayDeaths',
		active: 'active'
	}
};
