const chalk = require('chalk');
const axios = require('axios');
const comma = require('comma-number');

module.exports = async (table, country) => {
	if (!country) {
		const api = await axios.get(`https://corona.lmao.ninja/countries`);
		const all = api.data;
		all.map(one => {
			let data = Object.values(one);
			data = data.map(d => comma(d));
			return table.push(data);
		});
		console.log(table.toString());
	}
};
