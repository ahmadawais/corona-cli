const axios = require("axios");
let asciichart = require("asciichart");

(async () => {
	const api = await axios.get(`https://corona.lmao.ninja/historical/germany`);
	const cases = Object.values(api.data.timeline.cases);
	console.log(asciichart.plot(cases));
})();
