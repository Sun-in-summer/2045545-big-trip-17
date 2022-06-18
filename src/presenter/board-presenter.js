import {remove, render, RenderPosition} from '../framework/render.js';
import { filter } from '../utils/filter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortPointDateDown, sortPointPriceDown} from '../utils/point.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';


export default class BoardPresenter {
  #pointsContainer = null;
  #headerContainer = null;
  #sortComponent = null;
  #pointsListComponent = null;
  #loadingComponent = new LoadingView();
  #noPointsComponent = null;
  #pointModel = null;
  #offersModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isCancelButton = null ;
  #destinations = null;
  #isLoading = true;


  constructor(pointsContainer, headerContainer, pointModel, offersModel, filterModel, destinationsModel) {
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel; //
    this.#pointsContainer = pointsContainer;
    this.#headerContainer = headerContainer;
    this.#pointsListComponent = new PointsListView();
    this.#destinations = [...this.#destinationsModel.destinations];//
    this.#isCancelButton = false;//

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#newPointPresenter = new NewPointPresenter(this.#pointsListComponent.element, this.#handleViewAction);
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

  get destinations () {
    const destinations = this.#destinationsModel.destinations;
    return destinations;
  }

  get offers () {
    const offers = this.#offersModel.offers;
    return offers;
  }

  init = () => {
    this.#renderBoard();
  };

  createPoint = (callback) => {
    // const destinationsNames = this.destinations.map((destination) =>destination.name);
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#isCancelButton = true;
    this.#newPointPresenter.init(callback, this.offers, this.#isCancelButton, this.destinations);
    this.#isCancelButton = false;
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
    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderLoading =() =>{
    render(this.#loadingComponent, this.#pointsContainer);
  };

  #renderNoPoints = () => {
    this.#noPointsComponent =  new NoPointsView(this.#filterType);
    render(this.#noPointsComponent, this.#pointsContainer);
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
        this.#pointPresenter.get(data.id).init(data, this.offers, this.#isCancelButton, this.#destinations);
        break;
      case UpdateType.MINOR:

        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:

        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderPoint =(point, offers, isCancelButton, destinations) => {
    const pointPresenter =new PointPresenter(this.#pointsListComponent.element, this.#handleViewAction, this.#handleModeChange, this.#pointModel);
    pointPresenter.init(point, offers, isCancelButton, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);

  };


  #clearBoard = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };


  #renderBoard =() => {
    render(this.#pointsListComponent, this.#pointsContainer);


    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;


    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.points.forEach((point) => this.#renderPoint(point, this.offers, this.#isCancelButton, this.destinations));

  };

}
