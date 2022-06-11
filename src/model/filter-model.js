import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

export default class PointModel extends Observable {
  #filter = FilterType.EVERYTHING;

  constructor () {
    super();
  }

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };

  // updateFilter = (updateType) => {

  //   this._notify(updateType);
  // };
}
