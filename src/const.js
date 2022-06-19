import dayjs from 'dayjs';

const ALL_POINTS = 'EVERYTHING';
const ONLY_FUTURE_POINTS = 'FUTURE';
const ONLY_PAST_POINTS = 'PAST';


const FilterType = {
  EVERYTHING: ALL_POINTS,
  FUTURE: ONLY_FUTURE_POINTS,
  PAST: ONLY_PAST_POINTS,
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
  INIT: 'INIT',
};

const defaultPoint = {
  basePrice: 10,
  dateFrom: dayjs(),
  dateTo: dayjs().add(7, 'day'),
  destination:  {
    name:'',
    description: '',
    photos: []
  },
  type:'flight',
  offers : [],
};

export {FilterType, SortType, UserAction, UpdateType, defaultPoint};
