const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
}

// Magic ~~~~
const getDaysList = (year, month) => {
  let daysCnt = daysInMonth(year, month + 1);
  let firstDayOfWeek = new Date(year, month, 1).getDay();
  let lastDayOfWeek = new Date(year, month, daysCnt).getDay();
  let arrayOfWeeks = [];

  let tempWeek = []
  for (let i = 0 - firstDayOfWeek; i < daysCnt + (6 - lastDayOfWeek); i++) {
    if (i < 0) {
      tempWeek.push(-1);
    } else if (i > daysCnt) {
      tempWeek.push(-1);
    } else {
      tempWeek.push(i + 1);
    }

    if (tempWeek.length === 7) {
      arrayOfWeeks.push(tempWeek.slice());
      tempWeek = [];
    }
  }
  return arrayOfWeeks;
};

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes*60000);
}

const getTimeRange = (timeFrom, timeTo, deltaMin) => {
  let timeArr = [];
  for (let tempTime = timeFrom; tempTime <= timeTo; tempTime=addMinutes(tempTime, deltaMin)) {
    timeArr.push(tempTime);
  }
  return timeArr;
};

export { 
  getDaysList,
  getTimeRange
};
