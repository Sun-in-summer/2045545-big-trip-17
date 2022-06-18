import {remove, render, replace, RenderPosition} from '../framework/render.js';
import {filter} from '../utils/filter.js';
import InfoView from '../view/info-view';


export default class InfoPresenter {
  #infoContainer = null;
  #filterModel = null;
  #pointModel = null;
  #infoComponent = null;
  #filterType = null;
  #offersModel = null;


  constructor(infoContainer, filterModel, pointModel, offersModel) {
    this.#infoContainer = infoContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filteredPoints() {
    this.#filterType =this.#filterModel.filter;
    const points =this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);
    return filteredPoints;
  }

  get offers() {
    const offers = this.#offersModel.offers;
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


