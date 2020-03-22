const axios = require("axios");
const comma = require("comma-number");
const { calculateWorldwideRecoveryRate } = require("./calcRecoveryRate");

module.exports = async (table, states) => {
	if (!states) {
		const all = await axios.get(`https://corona.lmao.ninja/all`);
		let data = Object.values(all.data);
		data = data.map(d => comma(d));
		table.push([
			`Worldwide`,
			data[0],
			`—`,
			data[1],
			`—`,
			data[2],
			calculateWorldwideRecoveryRate(data[1], data[2]),
			`—`,
			`—`,
			`—`
		]);
	}
};
