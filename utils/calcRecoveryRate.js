/**
 * Calculates the recovery rate and puts it in a nice looking string format.
 * 
 * @param  {int}     numDeaths     The number of deaths for a unit
 * @param  {int}     numRecoveries The number of recoveries for a unit
 * @return {String}  A parsed string percentage string of recoveries rounded to one decimal place.
 */
function calcRecoveryRate(numDeaths, numRecoveries) {
    const factor = numRecoveries / (numDeaths + numRecoveries);
    const percentage = (factor * 100).toFixed(1) + '%';
    if(isNaN(factor) || factor === 0) {
        return '-';
    }else {
        return percentage;
    }
}

module.exports = {
    /**
     * 
     * @param  {String} deaths A comma delineated number for number of deaths.
     * @param  {String} recoveries A comma delineated number for number of recoveries.
     * @return {String} A parsed string percentage string of recoveries rounded to one decimal place.
     */
    calculateWorldwideRecoveryRate: function(deaths, recoveries) {
        const numDeaths = parseInt(deaths.replace(/,/g,''));
		const numRecoveries = parseInt(recoveries.replace(/,/g,''));
		return calcRecoveryRate(numDeaths, numRecoveries);
    },

    /**
     * Calculates the recovery rate and puts it in a nice looking string format.
     * 
     * @param  {int}     numDeaths     The number of deaths for a unit
     * @param  {int}     numRecoveries The number of recoveries for a unit
     * @return {String}  A parsed string percentage string of recoveries rounded to one decimal place.
     */
    calculateRecoveryRate: function(numDeaths, numRecoveries) {
        return calcRecoveryRate(numDeaths, numRecoveries);
    }
};