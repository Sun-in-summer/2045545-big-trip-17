import {remove, render, replace} from '../framework/render.js';
import {FilterType, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointModel = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel, pointModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointModel.getPointsAsync();
    const filters = Object.values(FilterType);
    return filters.map((type) => ({type, name: type, count: filter[type](points).length}));
  }

  init = () => {
    const filters = this.filters;

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null ){
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);

  };


  #handleFilterTypeChange =(filterType) =>{
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MINOR, filterType);

  };


  #handleModelEvent = (updateType ) =>{
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        this.init();
        break;
      case UpdateType.INIT:
        this.init();
        break;
    }
  };
}


