const moment = require('moment');

const getDates = (startDate, stopDate) => {
  const dateArray = [];
  let startDate1 = moment(startDate);
  const stopDate1 = moment(stopDate);
  while (startDate1 <= stopDate1) {
    dateArray.push(moment(startDate1).format('YYYY-MM-DD'));
    startDate1 = moment(startDate1).add(1, 'days');
  }
  return dateArray;
};

module.exports = {
  getDates,
};
