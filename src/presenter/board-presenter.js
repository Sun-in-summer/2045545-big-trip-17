import {remove, render, RenderPosition} from '../framework/render.js';
import { filter } from '../utils/filter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortPointDateDown, sortPointPriceDown} from '../utils/point.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import InfoView from '../view/info-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import FilterPresenter from './filter-presenter.js';

export default class BoardPresenter {
  #pointsContainer = null;
  #headerContainer = null;
  #sortComponent = null;
  #pointsListComponent = null;
  #noPointsComponent = null;
  #pointModel = null;
  #infoComponent = null;
  #offersModel = null;
  #filterModel = null;

  #allOffers = null;

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #filterPresenter = null;

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isCancelButton = false ;


  constructor(pointsContainer, headerContainer, pointModel, offersModel, filterModel) {
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#pointsContainer = pointsContainer;
    this.#headerContainer = headerContainer;
    this.#pointsListComponent = new PointsListView();
    this.#allOffers = [...this.#offersModel.offers];

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#newPointPresenter = new NewPointPresenter(this.#pointsListComponent.element, this.#handleViewAction);
    this.#filterPresenter = new FilterPresenter(this.#headerContainer, this.#filterModel, this.#pointModel);
    this.#infoComponent = new InfoView();

  }

  get points () {
    this.#filterType =this.#filterModel.filter;
    const points =this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.PRICE_DOWN:
        return filteredPoints.slice().sort(sortPointPriceDown);
      case SortType.TIME_DOWN:
        return filteredPoints.slice().sort(sortPointDateDown);
    }
    return filteredPoints;
  }

  init = () => {
    this.#renderInfo();
    this.#renderBoard();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#isCancelButton = true;
    this.#newPointPresenter.init(callback, this.#allOffers, this.#isCancelButton);
  };

  #handleSortTypeChange =(sortType) =>{
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () =>{
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#pointsContainer);
  };

  #renderNoPoints = () => {
    this.#noPointsComponent =  new NoPointsView(this.#filterType);
    render(this.#noPointsComponent, this.#pointsContainer);
  };

  #renderInfo = () => {
    render(this.#infoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  };

  #handleModeChange =() => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) =>{
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data ) =>{
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#allOffers);
        break;
      case UpdateType.MINOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#filterPresenter.update();
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #renderPoint =(point, offers) => {
    const pointPresenter =new PointPresenter(this.#pointsListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offers);
    this.#pointPresenter.set(point.id, pointPresenter);

  };


  #clearBoard = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };


  #renderBoard =() => {
    if (this.points.length === 0) {
      remove(this.#infoComponent);
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderInfo();
    render(this.#pointsListComponent, this.#pointsContainer);
    this.points.forEach((point) => this.#renderPoint(point, this.#allOffers));
  };


  #handlePointChange = (updatedPoint) =>{
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#allOffers);
  };

}
