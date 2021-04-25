const axios = require('axios');
const numberFormat = require('./numberFormat');
const exitCountry = require('./exitCountry');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, states, countryName, options) => {
	if (countryName && !states && !options.chart) {

		const [err, response]  = await to(
			axios.get(`https://corona.lmao.ninja/v2/states/${countryName}`)
		);

		if (
			err &&
			err.response &&
			err.response.status &&
			err.response.status === 404
		) {
			console.log("hello")
			const [err, response] = await to(
				axios.get(`https://corona.lmao.ninja/v2/countries/${countryName}`)
			);
			exitCountry(err, spinner, countryName);
			err && spinner.stopAndPersist();
			handleError(`API is down, try again later.`, err, false);
			const thisCountry = response.data
			// Format.
			const format = numberFormat(options.json);

			table.push([
				`—`,
				thisCountry.country,
				format(thisCountry.cases),
				format(thisCountry.todayCases),
				format(thisCountry.deaths),
				format(thisCountry.todayDeaths),
				format(thisCountry.recovered),
				format(thisCountry.active),
				format(thisCountry.critical),
				format(thisCountry.casesPerOneMillion)
			]);
			spinner.stopAndPersist();
			console.log(table.toString());
		}

		// input is a state
		else {
			const thisState = response.data;
			const format = numberFormat(options.json);
			table.push([
				`—`,
				thisState.state,
				format(thisState.cases),
				format(thisState.todayCases),
				format(thisState.deaths),
				format(thisState.todayDeaths),
				format(thisState.recovered),
				format(thisState.active),
				"N/A",
				format(thisState.casesPerOneMillion)
			]);
			spinner.stopAndPersist();
			console.log(table.toString());

		}
	}
};
