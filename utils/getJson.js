const chalk = require('chalk');
const axios = require('axios');
const Path = require('path');
const Fs = require('fs');
const sym = require('log-symbols');
const comma = require('comma-number');
const red = chalk.red;
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, states, countryName) => {
	if (countryName && !states) {
		const [err, response] = await to(
            axios.get(`https://corona.lmao.ninja/countries/${countryName}\n`)
		);
        handleError(`API is down, try again later.`, err, false);
        
        // creating and writing data to json file
        Fs.writeFileSync("data.json", JSON.stringify(response.data));
        // printing out the JSON data to terminal
        console.log(response.data);

        // mapping data as object to get lastUpdated time for index.js
        let jsonData = Object.values(response.data);
        jsonData = jsonData.map((d) => comma(d));
        lastUpdated = Date(jsonData[0]["updated"]);

		if (response.data === 'Country not found') {
			spinner.stopAndPersist();
			console.log(
				`${red(
					`${sym.error} Nops. A country named "${countryName}" does not exist…`
				)}\n`
			);
			process.exit(0);
		}
        spinner.stopAndPersist();
    }
    return lastUpdated;
};
