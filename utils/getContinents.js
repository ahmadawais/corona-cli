const axios = require('axios');
const numberFormat = require('./numberFormat');

const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, continentName, options) => {
	if(continentName && !options.chart){
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/continents/${continentName}`)
		);

		//exitContinent()
		err && spinner.stopAndPersist();
		handleError(`API is down, try again later.`, err, false);

		const thisContinent = response.data;
		const format = numberFormat(options.json);


		table.push([
			`-`,
			thisContinent.continent,
			format(thisCountry.cases),
			format(thisCountry.todayCases),
			format(thisCountry.deaths),
			format(thisCountry.todayDeaths),
			format(thisCountry.recovered),
			format(thisCountry.active),
			format(thisCountry.critical),
		])
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
