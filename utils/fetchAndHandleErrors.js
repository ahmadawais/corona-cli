const to = require('await-to-js').default;
const axios = require('axios');
const isOnline = require('is-online');
const handleError = require('cli-handle-error');

/**
 * Handles errors and return Promise object with `error and `response`
 * @param {string} url URL to fetch from
 */

module.exports = async url => {
	const [[error, response], online] = await Promise.all([
		to(axios.get(url)),
		isOnline({ timeout: 3000 })
	]);

	//Handle offline error
	if (!online)
		handleError(
			` Looks like you're offline.`,
			new Error('offline'),
			false,
			true
		);

	//Handle every other error!
	if (online && error)
		handleError(`API is down, try again later.`, error, false, true);

	return { error, response };
};
