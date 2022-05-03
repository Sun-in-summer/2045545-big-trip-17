import {
  getRandomInteger, generateDateTime, generateNextDate
} from '../utils.js';

const RANDOM_POINTS_QUANTITY = 10;
const MIN_PRICE = 10;
const MAX_PRICE = 3000;

const POINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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

export const generatePoint = () => {
  const startDate =generateDateTime();
  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: startDate,
    dateTo: generateNextDate(startDate),
    destination: generateDestination(),
    id: getRandomInteger(0, RANDOM_POINTS_QUANTITY),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: Array.from({
      length: 3
    }, getRandomInteger),
    type: generatePointType(),
  };
};


const offer = {
  'type': 'taxi',
  'offers': [{
    'id': 1,
    'title': 'Upgrade to a business class',
    'price': 120
  }, {
    'id': 2,
    'title': 'Choose the radio station',
    'price': 60
  }]
};
