import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
dayjs.extend(Duration);
import { getRandomInteger } from './common.js';


const humanizePointDate = (date) => dayjs(date).format('MMM D');

const pickHoursMinutesFromDate = (date) => {
  if (date === null) {
    return  dayjs().format('HH:mm');
  }
  else {
    return dayjs(date).format('HH:mm');
  }
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

const pickPhotos = (DestinationPhotos, destionationForPhoto) => {
  for (let i =0 ; i < DestinationPhotos.length; i++) {
    let chosenPhotos = [];
    if (DestinationPhotos[i].destination === destionationForPhoto){
      chosenPhotos  = DestinationPhotos[i].photos;
      return chosenPhotos;
    }
    else if ((i === DestinationPhotos.length - 1) && (chosenPhotos = [])) {
      return chosenPhotos;
    }
  }
};


const generateNextDate =(date, negativeMinutesGap) =>{
  const maxMinutesGap = 7*24*60;
  const minutesGap = getRandomInteger(negativeMinutesGap, maxMinutesGap);
  return date.add(minutesGap, 'minutes');
};

const generateDateTime = (negativeMinutesGap) => {
  const date = dayjs();
  return generateNextDate(date, negativeMinutesGap);
};

const convertToDatetimeFormat =(date) => dayjs(date).format('DD-MM-YY');

const getAvailableOffers =(chosenType, arr)=> {
  const offers = arr.find((offer)=> offer.type === chosenType);
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
  pickPhotos,
  generateDateTime,
  generateNextDate,
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

