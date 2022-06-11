import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import {generatePoints} from './mock/point.js';
import {OFFERS} from './mock/offers.js';


const siteMainElement = document.querySelector('.page-main');
const siteHeaderMainElement = document.querySelector('.trip-main');
const sitePointsElement = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const siteTripControlsFilters = siteHeaderElement.querySelector('.trip-controls__filters');
const newPointButton = document.querySelector('.trip-main__event-add-btn');


const points = generatePoints();
const allOffers =OFFERS.slice();


const pointModel = new PointModel(points);
const offersModel =new OffersModel(allOffers);
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteTripControlsFilters, filterModel, pointModel);
const boardPresenter = new  BoardPresenter(sitePointsElement, siteHeaderMainElement, pointModel, offersModel, filterModel);

const handleNewPointFormClose = () => {
  newPointButton.disabled = false;
};

const handleNewPointButtonClick = () =>{
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButton.disabled = true;
};

document.querySelector('.trip-main__event-add-btn').addEventListener('click', handleNewPointButtonClick);


filterPresenter.init();
boardPresenter.init();


