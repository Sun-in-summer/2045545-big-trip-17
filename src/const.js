const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};


const SortType = {
  DEFAULT: 'default',
  TIME_DOWN: 'time_down',
  PRICE_DOWN: 'price_down'
};


const UserAction ={
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const defaultPoint = {
  basePrice: '987',
  dateFrom:'2022-07-10T10:55:56.845Z',
  dateTo: '2022-07-12T10:56:13.375Z',
  destination: 'Amsterdam',
  type:'flight',
  offers : [],
};

export {FilterType, SortType, UserAction, UpdateType, defaultPoint};
