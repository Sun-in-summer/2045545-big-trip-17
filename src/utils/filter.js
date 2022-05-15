import { FilterType } from '../const.js';
import {isPastPoint,   isFuturePoint} from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point.dateFrom, point.dateTo)),
};

export {filter};
