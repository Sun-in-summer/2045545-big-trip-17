import {remove, render, replace, RenderPosition} from '../framework/render.js';
import {filter} from '../utils/filter.js';
import InfoView from '../view/info-view';
import {sortDaysUp} from '../utils/point.js';


export default class InfoPresenter {
  #infoContainer = null;
  #filterModel = null;
  #pointModel = null;
  #infoComponent = null;
  #filterType = null;


  constructor(infoContainer, filterModel, pointModel) {
    this.#infoContainer = infoContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get sortedPoints() {
    this.#filterType =this.#filterModel.filter;
    const points =this.#pointModel.getPointsAsync();
    const filteredPoints = filter[this.#filterType](points);
    const sortedPoints = filteredPoints.slice().sort(sortDaysUp);
    return sortedPoints;
  }

  get offers() {
    const offers = this.#pointModel.getOffersAsync();
    return offers;
  }


  init = () => {
    const sortedPoints = this.sortedPoints;
    const prevInfoComponent = this.#infoComponent;
    this.#infoComponent = new InfoView(sortedPoints, this.offers);
    if (prevInfoComponent === null ){
      render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    if (sortedPoints.length === 0){
      this.#infoComponent = new InfoView(null);
    }
    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  };


  #handleModelEvent = ( ) =>{
    this.init();
  };

}


