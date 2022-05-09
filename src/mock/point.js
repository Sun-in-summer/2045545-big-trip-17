import {
  getRandomInteger, generateDateTime, generateNextDate, getAvailableOffers
} from '../utils.js';
import { OFFERS } from './offers.js';

const RANDOM_POINTS_QUANTITY = 10;
const MIN_PRICE = 10;
const MAX_PRICE = 3000;
const SOME_NUMBER =300;
const DESTINATION_PHOTO_QUANTITY=5;
const FIRST_POINTS_QUANTITY = 25;


const PointType = {
  Taxi: 'taxi',
  Bus: 'bus',
  Train: 'train',
  Ship: 'ship',
  Drive: 'drive',
  Flight: 'flight',
  Checkin: 'check-in',
  Sightseeing:'sightseeing',
  Restaurant: 'restaurant'
};


const DestinationDescriptions = {
  Amsterdam : ' Amsterdam is the capital and most populous city of the Netherlands; with a population of 905,234 within the city proper, 1,558,755 in the urban area and 2,480,394 in the metropolitan area. Found within the Dutch province of North Holland, Amsterdam is colloquially referred to as the "Venice of the North", due to the large number of canals which form a UNESCO World Heritage Site.[citation needed]',
  Geneva: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.' ,
  Beijing: 'Beijing is the capital of the People\'s Republic of China. It is the world\'s most populous national capital city, with over 21 million residents within an administrative area of 16,410.5 km2 (6336 sq. mi.). Nevertheless its built-up area, the third largest in China after Guangzhou and Shanghai, is slightly bigger, including 3 districts in Hebei (Sanhe, Dachang Hui and Zhuozhou) being conurbated but with Miyun and Pinggu Districts in Beijing not agglomerated yet. It is located in Northern China, and is governed as a municipality under the direct administration of the State Council with 16 urban, suburban, and rural districts. Beijing is mostly surrounded by Hebei Province with the exception of neighboring Tianjin to the southeast; together, the three divisions form the Jingjinji megalopolis and the national capital region of China.',
  Moscow: 'Moscow  is the capital and largest city of Russia. The city stands on the Moskva River in Central Russia, with a population estimated at 12.4 million residents within the city limits, over 17 million residents in the urban area, and over 20 million residents in the metropolitan area. The city covers an area of 2,511 square kilometers (970 sq mi), while the urban area covers 5,891 square kilometers (2,275 sq mi), and the metropolitan area covers over 26,000 square kilometers (10,000 sq mi). Moscow is among the world\'s largest cities; being the most populous city entirely in Europe, the largest urban and metropolitan area in Europe, and the largest city by land area on the European continent.'
};

const generateDestination = () => {
  const destinations = [
    'Moscow',
    'Geneva',
    'Beijing',
    'Amsterdam'
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const generatePointType = () => {
  const PointTypes = Object.values(PointType);
  const randomIndex = getRandomInteger(0, PointTypes.length - 1);
  return PointTypes[randomIndex];
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



const getPointOffers =(availableOffers)=>{
  const foundOffers =[];
  if (availableOffers.length > 0) {
    foundOffers.length = getRandomInteger(1, availableOffers.length);
    for (let i =0; i< foundOffers.length;  i++) {
      const randomNumber = getRandomInteger(1, foundOffers.length);
      foundOffers[i]=randomNumber;
    }
    return foundOffers.filter((item, index) => foundOffers.indexOf(item) ===index);
  }
  return foundOffers;
};


const generatePoint = () => {
  const startDate =generateDateTime();
  const settedType=generatePointType();
  const availableOffers =getAvailableOffers(settedType, OFFERS);


  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: startDate,
    dateTo: generateNextDate(startDate),
    destination: generateDestination(),
    id: getRandomInteger(0, RANDOM_POINTS_QUANTITY),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getPointOffers(availableOffers),
    type: settedType,
  };

};


export const generatePoints =()=> Array.from({length: FIRST_POINTS_QUANTITY}, generatePoint);


export {DestinationPhotos, DestinationDescriptions, getAvailableOffers};

