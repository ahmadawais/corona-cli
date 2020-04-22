const chalk = require('chalk');
const axios = require('axios');
const sym = require('log-symbols');
const comma = require('comma-number');
const red = chalk.red;
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, compareCountries, { compare }) => {
	if (compareCountries && compare) {
		const tableArr = [];
		for (let index = 0; index < compareCountries.length; index++) {
			const [err, response] = await to(
				axios.get(
					`https://corona.lmao.ninja/countries/${compareCountries[index]}`
				)
			);
			const thisCountry = response.data;
			handleError(`API is down, try again later.`, err, false);
			if (response.data === 'Country not found') {
				spinner.stopAndPersist();
				console.log(
					`${red(
						`${sym.error} Nops. A country named "${compareCountries[index]}" does not exist… Could not compare`
					)}\n`
				);
				process.exit(0);
			}

			tableArr.push([
				`—`,
				thisCountry.country,
				thisCountry.cases,
				thisCountry.todayCases,
				thisCountry.deaths,
				thisCountry.todayDeaths,
				thisCountry.recovered,
				thisCountry.active,
				thisCountry.critical,
				thisCountry.casesPerOneMillion
			]);
		}

		// Comparing the country values to highlight the highest count
		for (let index = 2; index < 10; index++) {
			let highestValueIndex = 0;
			for (
				let innerIndex = 1;
				innerIndex < tableArr.length;
				innerIndex++
			) {
				if (
					tableArr[highestValueIndex][index] <
					tableArr[innerIndex][index]
				) {
					highestValueIndex = innerIndex;
				}
				tableArr[innerIndex][index] = tableArr[innerIndex][index];
			}
			if (tableArr[highestValueIndex][index]) {
				tableArr[highestValueIndex][index] = red(
					comma(tableArr[highestValueIndex][index])
				);
			}

			tableArr.forEach((row) => {
				row[index] = comma(row[index]);
			});
		}

		table.push(...tableArr);
		spinner.stopAndPersist();
		console.log(table.toString());
	}
};
