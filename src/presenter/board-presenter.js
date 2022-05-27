import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import InfoView from '../view/info-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortPointDateDown, sortPointPriceDown} from '../utils/point.js';


export default class BoardPresenter {
  #pointsContainer = null;
  #headerContainer = null;
  #sortComponent = null;
  #pointsListComponent = null;
  #noPointsComponent = null;
  #pointModel = null;

  #points = [];
  #allOffers = [];
  #sourcedPoints =[];

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;


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
    this.#sourcedPoints = [...this.#pointModel.points];
    this.#renderPointsBoard();
  };

  #handleSortTypeChange =(sortType) =>{
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort = () =>{
    render(this.#sortComponent, this.#pointsContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#pointsContainer);
  };

  #renderInfo = () => {
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
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#allOffers);
  };

  #sortPoints = (sortType) =>{
    switch (sortType) {
      case SortType.TIME_DOWN:
        this.#points.sort(sortPointDateDown);
        break;
      case SortType.PRICE_DOWN:
        this.#points.sort(sortPointPriceDown);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  };


}
