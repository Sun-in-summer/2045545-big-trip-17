import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
dayjs.extend(Duration);
const SOME_NUMBER =300;


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointDate = (date) => dayjs(date).format('MMM D');

const pickHoursMinutesFromDate = (date) => dayjs(date).format('HH:mm');

const countDuration = (dateTo, dateFrom) => {
  const date1 = dayjs(dateTo);
  const date2 = dayjs(dateFrom);
  const durationInDays = dayjs.duration(date1.diff(date2)).days();
  const durationInHours = dayjs.duration(date1.diff(date2)).hours();
  const durationInMinutes = dayjs.duration(date1.diff(date2)).minutes();
  let durationTotal = '';
  if (durationInDays) {
    durationTotal = dayjs.duration(date1.diff(date2)).format('DD[D] HH[H] mm[M]');
  } else if (durationInHours) {
    durationTotal = dayjs.duration(date1.diff(date2)).format('HH[H] mm[M]');
  } else if (durationInMinutes) {
    durationTotal = dayjs.duration(date1.diff(date2)).format('mm[M]');
  } else {
    durationTotal = '';
  }
  return durationTotal;
};

const formatToDateAndTime = (date) => dayjs(date).format('YY[/]MM[/]DD HH:mm');

const pickPhotos = (DestinationPhotos ,destionationForPhoto) => {
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


const createRandomUrl = () => {
  const randomUrl =`http://picsum.photos/248/152?r${getRandomInteger(0, SOME_NUMBER)}`;
  return randomUrl;
};

const generateNextDate =(date) =>{
  const maxMinutsGap = 7*24*60;
  const minutesGap = getRandomInteger(0, maxMinutsGap);
  return date.add(minutesGap, 'minutes');
};

const generateDateTime = () => {
  const date = dayjs();
  return generateNextDate(date);
};

const convertToDatetimeFormat =(date) => dayjs(date).format('YYYY-MM-DD');


export {
  getRandomInteger,
  humanizePointDate,
  pickHoursMinutesFromDate,
  countDuration,
  formatToDateAndTime,
  pickPhotos,
  createRandomUrl,
  generateDateTime,
  generateNextDate,
  convertToDatetimeFormat
};

