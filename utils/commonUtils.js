const axios = require('axios');
const chalk = require('chalk');
const sym = require('log-symbols');
const handleError = require('cli-handle-error');

const dim = chalk.dim;
const red = chalk.red;
const DATE_CHAR = 8;

let validateDateFormat = function (inputDate) {
	var inputDateLength = inputDate.length;
	if (inputDateLength != DATE_CHAR) {
		return false;
	}
	for (index = 0; index < inputDateLength; index++) {
		if (inputDate[index] < '0' || inputDate[index] > '9') {
			return false;
		}
	}
	return true;
};

let getNinjaDateFormat = function (inputDate) {
	// convert YYYYMMDD to YYYY-MM--DD
	var formattedDate =
		inputDate.slice(0, 4) +
		'-' +
		inputDate.slice(4, 6) +
		'-' +
		inputDate.slice(6, 8);
	var newDate = new Date(formattedDate);
	var year = newDate.getFullYear().toString().substr(-2);
	var month = newDate.getMonth() + 1 + '';
	var day = newDate.getDate();
	var ninjaDate = month + '/' + day + '/' + year;
	return ninjaDate;
};

let throwError = function (error) {
	switch (error.type) {
		case 'OPTIONS_VALIDATION':
			console.log(
				`${red(
					`${sym.error} Options validation failed.${error.message}`
				)}\n`
			);
			break;
		default:
			console.log(`${sym.error} ${dim(`Error format is wrong`)}`);
	}
};

let isPastDate = function (inputDate) {
	var formatInputDate = new Date(
		inputDate.slice(0, 4) +
			'-' +
			inputDate.slice(4, 6) +
			'-' +
			inputDate.slice(6, 8)
	);
	var today = new Date();
	today.setHours(0, 0, 0, 0);
	return today > formatInputDate;
};

module.exports.validateDateFormat = validateDateFormat;
module.exports.throwError = throwError;
module.exports.getNinjaDateFormat = getNinjaDateFormat;
module.exports.isPastDate = isPastDate;
