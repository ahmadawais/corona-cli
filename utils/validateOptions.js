const commonUtils = require('./commonUtils');

module.exports = function (options) {
	var validationResult = {
		status: false,
		type: '',
		error: []
	};
	if (!commonUtils.validateDateFormat(options.date)) {
		validationResult.status = true;
		(validationResult.type = 'OPTIONS_VALIDATION'),
			validationResult.error.push(
				'`date` option must be in format YYYYMMDD'
			);
	}
	return validationResult;
};
