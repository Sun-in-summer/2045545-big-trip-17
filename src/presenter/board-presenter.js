import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import InfoView from '../view/info-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';


export default class BoardPresenter {
  #pointsContainer = null;
  #headerContainer = null;
  #sortComponent = null;
  #pointsListComponent = null;
  #noPointsComponent = null;
  #pointModel = null;

  #points = [];
  #allOffers = [];

  #pointPresenter = new Map();


  constructor(pointsContainer, headerContainer, pointModel) {
    this.#pointModel = pointModel;
    this.#pointsContainer = pointsContainer;
    this.#headerContainer = headerContainer;
    this.#sortComponent = new SortView();
    this.#pointsListComponent = new PointsListView();
    this.#points = [...this.#pointModel.points];
    this.#allOffers = [...this.#pointModel.allOffers];
    this.#noPointsComponent = new NoPointsView();
  }


  init = () => {
    this.#renderPointsBoard();
  };

  #renderSort =()=>{
    render(this.#sortComponent, this.#pointsContainer);
  };

  #renderNoPoints =() => {
    render(this.#noPointsComponent, this.#pointsContainer);
  };

  #renderInfo =() => {
    render(new InfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  };

  #handleModeChange =() => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint =(point, offers) => {
    const pointPresenter =new PointPresenter(this.#pointsListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, offers);
    this.#pointPresenter.set(point.id, pointPresenter);

  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter)=> presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#pointsContainer);
    for (let i =0 ; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#allOffers);
    }
  };

  #renderPointsBoard =() => {
    if (this.#points.length === 0) {
      this.#renderNoPoints();
    }
    else {
      this.#renderSort();
      this.#renderPointsList();
      this.#renderInfo();
    }
  };


  #handlePointChange = (updatedPoint) =>{
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#allOffers);
  };
}
