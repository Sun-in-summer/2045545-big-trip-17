import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
dayjs.extend(Duration);


const humanizePointDate = (date) => dayjs(date).format('MMM D');

const pickHoursMinutesFromDate = (date) => {
  if (date === null) {
    return  dayjs().format('HH:mm');
  }
  return dayjs(date).format('HH:mm');
};

const countDuration = (dateTo, dateFrom) => {
  const durationInDays = dayjs.duration(dateTo.diff(dateFrom)).days();
  const durationInHours = dayjs.duration(dateTo.diff(dateFrom)).hours();
  const durationInMinutes = dayjs.duration(dateTo.diff(dateFrom)).minutes();
  let durationTotal = '';
  if (durationInDays) {
    durationTotal = dayjs.duration(dateTo.diff(dateFrom)).format('DD[D] HH[H] mm[M]');
  } else if (durationInHours) {
    durationTotal = dayjs.duration(dateTo.diff(dateFrom)).format('HH[H] mm[M]');
  } else if (durationInMinutes) {
    durationTotal = dayjs.duration(dateTo.diff(dateFrom)).format('mm[M]');
  } else {
    durationTotal = '';
  }
  return durationTotal;
};

const formatToDateAndTime = (date) => dayjs(date).format('DD[/]MM[/]YY HH:mm');


const convertToDatetimeFormat =(date) => dayjs(date).format('DD-MM-YY');

const getAvailableOffers =(chosenType, allOffers)=> {
  const offers = allOffers.find((offer)=> offer.type === chosenType);
  let availableOffers = null;
  if (offers) {
    availableOffers = Object.values(offers.offers);
  }
  else {
    availableOffers = [];
  }
  return  availableOffers;
};


const isPastPoint = (dateFrom, dateTo) => (dateFrom && dayjs().isAfter(dateFrom, 'D')) && (dateTo && dayjs().isAfter(dateTo, 'D'));
const isFuturePoint =(dateFrom, dateTo) => (dateFrom && dayjs().isBefore(dateFrom, 'D')) && (dateTo && dayjs().isBefore(dateTo, 'D')) ;


const sortPointDateDown = (pointA, pointB) => {
  const pointADuration= dayjs.duration(pointA.dateTo.diff(pointA.dateFrom));
  const pointBDuration= dayjs.duration(pointB.dateTo.diff(pointB.dateFrom));
  const durationDifference =  pointBDuration.subtract(pointADuration).$ms;
  return durationDifference;
};

const sortPointPriceDown = (pointA, pointB) => (pointB.basePrice-pointA.basePrice);

const sortDaysUp = (pointA, pointB) => {
  const isPointALaterPointB = pointA.dateFrom.subtract(pointB.dateFrom);
  return isPointALaterPointB;
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
const isMonthEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'M');


export {
  humanizePointDate,
  pickHoursMinutesFromDate,
  countDuration,
  formatToDateAndTime,
  convertToDatetimeFormat,
  getAvailableOffers,
  isPastPoint,
  isFuturePoint,
  sortPointDateDown,
  sortPointPriceDown,
  sortDaysUp,
  isDatesEqual,
  isMonthEqual
};

