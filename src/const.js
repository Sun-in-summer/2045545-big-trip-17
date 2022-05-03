import { createRandomUrl } from './utils';

const DESTINATION_PHOTO_QUANTITY=5;


const DestinationDescriptions = {
  Amsterdam : ' Amsterdam is the capital and most populous city of the Netherlands; with a population of 905,234 within the city proper, 1,558,755 in the urban area and 2,480,394 in the metropolitan area. Found within the Dutch province of North Holland, Amsterdam is colloquially referred to as the "Venice of the North", due to the large number of canals which form a UNESCO World Heritage Site.[citation needed]',
  Geneva: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.' ,
  Beijing: 'Beijing is the capital of the People\'s Republic of China. It is the world\'s most populous national capital city, with over 21 million residents within an administrative area of 16,410.5 km2 (6336 sq. mi.). Nevertheless its built-up area, the third largest in China after Guangzhou and Shanghai, is slightly bigger, including 3 districts in Hebei (Sanhe, Dachang Hui and Zhuozhou) being conurbated but with Miyun and Pinggu Districts in Beijing not agglomerated yet. It is located in Northern China, and is governed as a municipality under the direct administration of the State Council with 16 urban, suburban, and rural districts. Beijing is mostly surrounded by Hebei Province with the exception of neighboring Tianjin to the southeast; together, the three divisions form the Jingjinji megalopolis and the national capital region of China.',
  Moscow: 'Moscow  is the capital and largest city of Russia. The city stands on the Moskva River in Central Russia, with a population estimated at 12.4 million residents within the city limits, over 17 million residents in the urban area, and over 20 million residents in the metropolitan area. The city covers an area of 2,511 square kilometers (970 sq mi), while the urban area covers 5,891 square kilometers (2,275 sq mi), and the metropolitan area covers over 26,000 square kilometers (10,000 sq mi). Moscow is among the world\'s largest cities; being the most populous city entirely in Europe, the largest urban and metropolitan area in Europe, and the largest city by land area on the European continent.'
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

const OFFER_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFERS = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Switch to business class',
        'price': 120
      }, {
        'id': 2,
        'title': 'Choose the radio station',
        'price': 60
      }, {
        'id': 3,
        'title': 'Switch to comfort class',
        'price': 50
      },
      {
        'id': 4,
        'title': 'I\'m going with pet',
        'price': 80
      },
      {
        'id': 5,
        'title': 'Add kid\'s seat',
        'price': 20
      },
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 1,
        'title': 'Choose seats',
        'price': 10
      }, {
        'id': 2,
        'title': 'Add luggage',
        'price': 30
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 1,
        'title': 'Choose seats',
        'price': 20
      }, {
        'id': 2,
        'title': 'Add meal',
        'price': 30
      },
      {
        'id': 3,
        'title': 'Switch to comfort class',
        'price': 30
      },
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 1,
        'title': 'Choose seats',
        'price': 20
      }, {
        'id': 2,
        'title': 'Add meal',
        'price': 30
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [ ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'Switch to business class',
        'price': 240
      }, {
        'id': 2,
        'title': 'Get extra bonus miles',
        'price': 10
      }, {
        'id': 3,
        'title': 'Switch to comfort class',
        'price': 150
      },
      {
        'id': 4,
        'title': 'Online check-in',
        'price': 5
      },
    ]},
  {
    'type': 'check-in',
    'offers': [ ]
  },{
    'type': 'sightseeing',
    'offers': [ ]
  },
  {
    'type': 'restaurant',
    'offers': [ ]
  },
];

export {DestinationDescriptions, DestinationPhotos, OFFERS};
