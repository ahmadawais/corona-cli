const commaNumber = require('comma-number');
const plain = num => num;

module.exports = json => (json ? plain : commaNumber);
