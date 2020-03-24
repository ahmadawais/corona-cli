const axios = require("axios");
const chalk = require("chalk");
const comma = require("comma-number");
const { sortStateKeys, sortStateOrders } = require("./table.js");
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");

module.exports = async (spinner, table, states, options) => {
	if (states) {
		const [err, api] = await to(axios.get(`https://corona.lmao.ninja/states`));
		handleError(`API is down, try again later.`, err, false);

		let allStates = api.data.map(one => Object.values(one));
		const sortIndex = sortStateKeys.indexOf(options.sort);

		if (sortIndex != -1) {
			const dir = sortStateOrders[sortIndex];
			allStates = allStates.sort((a, b) =>
				a[sortIndex] > b[sortIndex] ? dir : -dir
			);
		}

		allStates.map((oneState, count) => {
			oneState = oneState.map(d => comma(d));
			return table.push([count + 1, ...oneState]);
		});

		spinner.stopAndPersist();
		spinner.info(`${chalk.cyan(`Sorted by:`)} ${options.sort}`);
		console.log(table.toString());
	}
};
