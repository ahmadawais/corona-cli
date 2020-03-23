module.exports = async input => {
	if (input === "help") {
		await cli.showHelp(0);
	}
};
