/**
 * Calculates the recovery rate and puts it in a nice looking string format.
 * 
 * @param  {int}     numDeaths     The number of deaths for a unit
 * @param  {int}     numRecoveries The number of recoveries for a unit
 * @return {String}  A parsed string percentage string of recoveries rounded to one decimal place.
 */
function calcRecoveryRate(numDeaths, numRecoveries) {
    return ((numRecoveries / (numDeaths + numRecoveries)) * 100).toFixed(1) + '%';
}

/**
 * Calculates the recovery rate from an array of data and splices the recovery rate
 * into the middle of the array for table formatting.
 * 
 * @param  {Array} one data about the element we are processing. (e.g. state, country, etc.)
 * @return {Array} A spliced array almost as it was before but now with a string formatted recovery rate.
 */
function spliceRecoveryRate(one) {
    let oneRecovery = ((one[5] / (one[5] + one[3])) * 100);
    var oneRecoveryStr = oneRecovery.toFixed(1) + '%';
    if(isNaN(oneRecovery) || oneRecovery === 0){
        oneRecoveryStr = '—';
    }
    one.splice(6, 0, oneRecoveryStr);
    return one;
}

module.exports = {
    /**
     * 
     * @param  {String} deaths A comma delineated number for number of deaths.
     * @param  {String} recoveries A comma delineated number for number of recoveries.
     * @return {String} A parsed string percentage string of recoveries rounded to one decimal place.
     */
    calculateWorldwideRecoveryRate: function(deaths, recoveries) {
        let numDeaths = parseInt(deaths.replace(/,/g,''));
		let numRecoveries = parseInt(recoveries.replace(/,/g,''));
		return calcRecoveryRate(numDeaths, numRecoveries);
    },

    /**
     * Calculates the recovery rate for a set of objects.
     * 
     * @param  {Array} data The objects to calculate the recovery rate on.
     * @return {Array} The data almost as it was before, but now has the recovery rate included.
     */
    calculateMultipleRecoveryRate: function(data) {
        return data.map(one => {
            return spliceRecoveryRate(one)
        });
    },

    /**
     * Calculates the recovery rate for a single object. (e.g. China)
     * 
     * @param {Array} data A single object of data for a unit. 
     */
    calculateSingleRecoveryRate: function(data) {
        return spliceRecoveryRate(data);
    }
};