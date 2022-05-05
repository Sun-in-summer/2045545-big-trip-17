import {
  getRandomInteger, generateDateTime, generateNextDate, getOffers
} from '../utils.js';
import { OFFERS } from '../const.js';

const RANDOM_POINTS_QUANTITY = 10;
const MIN_PRICE = 10;
const MAX_PRICE = 3000;
const SOME_NUMBER =300;
const DESTINATION_PHOTO_QUANTITY=5;

const POINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];


// const PointType = {
//   Taxi: 'taxi',
//   Bus: 'bus',
//   Train: 'train',
//   Ship: 'ship',
//   Drive: 'drive',
//   Flight: 'flight',
//   Checkin: 'check-in',
//   Sightseeing:'sightseeing',
//   Restaurant: 'restaurant'
// };

const generateDestination = () => {
  const destinations = [
    'Moscow',
    'Geneva',
    'Beijing',
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPE.length - 1);
  return POINT_TYPE[randomIndex];
};

const createRandomUrl = () => {
  const randomUrl =`http://picsum.photos/248/152?r${getRandomInteger(0, SOME_NUMBER)}`;
  return randomUrl;
};

const DestinationPhotos =[
  {
    destination: 'Moscow',
    photos:  Array.from({length: DESTINATION_PHOTO_QUANTITY}, createRandomUrl),
  },
  {
    destination: 'Beijing',
    photos:  Array.from({length: DESTINATION_PHOTO_QUANTITY}, createRandomUrl),
  },
  {
    destination: 'Geneva',
    photos:  Array.from({length: DESTINATION_PHOTO_QUANTITY}, createRandomUrl),
  },
  {
    destination: 'Amsterdam',
    photos:  Array.from({length: DESTINATION_PHOTO_QUANTITY}, createRandomUrl),
  }
];


export const generatePoint = () => {
  const startDate =generateDateTime();
  const settedType=generatePointType();
  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: startDate,
    dateTo: generateNextDate(startDate),
    destination: generateDestination(),
    id: getRandomInteger(0, RANDOM_POINTS_QUANTITY),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getOffers(settedType, OFFERS),
    type: settedType,
  };
};

export {DestinationPhotos};

