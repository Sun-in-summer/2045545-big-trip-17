import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
// import {generatePoints} from './mock/point.js';
import {OFFERS} from './mock/offers.js';
import PointsApiService from './api-services/points-api-service.js';
import DestinationsApiService from './api-services/destinations-api-service.js'; //
import OffersApiService from './api-services/offers-api-services.js';

const AUTHORIZATION = 'Basic foi34430hg4r8';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderMainElement = document.querySelector('.trip-main');
const sitePointsElement = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const siteTripControlsFilters = siteHeaderElement.querySelector('.trip-controls__filters');
const newPointButton = document.querySelector('.trip-main__event-add-btn');


// const allOffers = OFFERS.slice();


const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));


const filterModel = new FilterModel();


const filterPresenter = new FilterPresenter(siteTripControlsFilters, filterModel, pointModel);
const boardPresenter = new  BoardPresenter(sitePointsElement, siteHeaderMainElement, pointModel, offersModel, filterModel, destinationsModel);
const infoPresenter = new InfoPresenter(siteHeaderMainElement, filterModel, pointModel, allOffers);

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
infoPresenter.init();
pointModel.init();
destinationsModel.init();//
offersModel.init();



