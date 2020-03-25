const mapper = require('./columnsMapper');
const cli = require('./cli');

// returns indices of table rows which user wants to omit form output in descending order
const parseCli = (states, separator = '_') => {
	const input = cli.flags.omit;
	if(!input || typeof input !== 'string' || input === '') return [];
	return input
		.split(separator)
		.reduce((accumulator, current,) => {
			if(states) {
				 return mapper.singleStates[current] ? [...accumulator, mapper.singleStates[current]] : accumulator
			}
			return mapper.single[current] ? [...accumulator, mapper.single[current]] : accumulator
		}, [])
		.sort((a, b) =>  a > b ? -1 : 1)
};

const deleteColumns = (table, tableHead, input) => {
	input.forEach(key => {
		tableHead.splice(key, 1);
		table.forEach(row => {
			row.splice(key, 1)
		})
	})
};

module.exports = (table, states, tableHead) => {
	const input = parseCli(states);
	deleteColumns(table, tableHead, input)
};
