import request from 'request';

const settings = process.env.REQUEST_SETTINGS ? JSON.parse(process.env.REQUEST_SETTINGS) : {};

const get = (url, callback) => {
  request(
    Object.assign(
      {
        url: url,
        json: true,
      },
      settings
    ),
    (error, response, body) => {
      callback(error, body);
    }
  );
};

const post = (url, payload, callback) => {
  request(
    Object.assign(
      {
        url: url,
        json: true,
        method: 'POST',
        body: payload,
      },
      settings
    ),
    (error, response, body) => {
      callback(error, body);
    }
  );
};

const toTitleCase = string => {
  return string.replace(/\w\S*/g, function(text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  });
};

const requiredValueToTestValueType = (subType, testValue) => {
  const testDate = new Date(testValue); //Should check why no errors on other values
  const todaysDate = new Date();
  const testMonthAndDay = dateToMonthAndDay(testDate);

  if (typeof testValue == 'number') {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  const convertTable = {
    True: true,
    False: false,
    Inside: subType,
    Outside: subType == testValue ? 'inside' : testValue,
    'Day Before': testMonthAndDay == dateToMonthAndDay(todaysDate, -1) ? testValue : '',
    'Day of': testMonthAndDay == dateToMonthAndDay(todaysDate) ? testValue : '',
    'Day After': testMonthAndDay == dateToMonthAndDay(todaysDate, +1) ? testValue : '',
    Male: 'Male',
    Female: 'Female', //Where it is used?
    Completed: true,
    'Not Completed': false,
  };
  return convertTable;
};

const dateToMonthAndDay = (date, daysToAdd = 0) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysToAdd);
  const day = newDate.getDate();
  // getMonth() returns 0-11
  const month = newDate.getMonth() + 1;
  return month + '/' + day;
};

module.exports = {
  request: { get, post },
  toTitleCase,
  requiredValueToTestValueType,
};
