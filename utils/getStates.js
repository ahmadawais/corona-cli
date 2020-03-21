const axios = require('axios');
const chalk = require('chalk');
const comma = require('comma-number');

module.exports = async (spinner, table) => {

  const api = await axios.get(`https://corona.lmao.ninja/states`);
  let all = api.data.map(one => Object.values(one));

  all.map(one => {
    one = one.map(d => comma(d));
    return table.push(one);
  });
  spinner.stopAndPersist();
  console.log(table.toString());
};
