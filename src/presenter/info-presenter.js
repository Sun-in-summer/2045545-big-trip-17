import {remove, render, replace, RenderPosition} from '../framework/render.js';
import {filter} from '../utils/filter.js';
import InfoView from '../view/info-view';
import {SortType} from '../const.js';
import {sortDaysUp, sortPointDateDown, sortPointPriceDown} from '../utils/point.js';


export default class InfoPresenter {
  #infoContainer = null;
  #filterModel = null;
  #pointModel = null;
  #infoComponent = null;
  #filterType = null;
  #currentSortType = SortType.DEFAULT;


  constructor(infoContainer, filterModel, pointModel) {
    this.#infoContainer = infoContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filteredPoints() {
    this.#filterType =this.#filterModel.filter;
    const points =this.#pointModel.getPointsAsync();
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.PRICE_DOWN:
        return filteredPoints.slice().sort(sortPointPriceDown);
      case SortType.TIME_DOWN:
        return filteredPoints.slice().sort(sortPointDateDown);
      case SortType.DEFAULT:
        return filteredPoints.slice().sort(sortDaysUp);
    }
    return filteredPoints;
  }

  get offers() {
    const offers = this.#pointModel.getOffersAsync();
    return offers;
  }


  init = () => {
    const filteredPoints = this.filteredPoints;
    const prevInfoComponent = this.#infoComponent;
    this.#infoComponent = new InfoView(filteredPoints, this.offers);
    if (prevInfoComponent === null ){
      render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    if (filteredPoints.length === 0){
      this.#infoComponent = new InfoView(null);
    }
    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  };


  #handleModelEvent = ( ) =>{
    this.init();
  };

}


