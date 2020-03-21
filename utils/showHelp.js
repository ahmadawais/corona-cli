module.exports = async country => {
	if (country === "help") {
		await cli.showHelp(0);
	}
};
