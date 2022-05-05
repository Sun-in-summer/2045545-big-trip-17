import FilterView from './view/filter-view.js';
import {
  render
} from './render.js';
import {
  RenderPosition
} from './render.js';

import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/point-model.js';


const siteMainElement = document.querySelector('.page-main');
const siteHeaderMainElement = document.querySelector('.trip-main');
const sitePointsElement = siteMainElement.querySelector('.trip-events');

const siteHeaderElement = document.querySelector('.page-header');
const siteTripControlsFilters = siteHeaderElement.querySelector('.trip-controls__filters');


render(new FilterView(), siteTripControlsFilters, RenderPosition.BEFOREEND);


const pointsPresenter = new PointsPresenter();
// const tripMessagesPresenter = new TripMessagesPresenter();
const pointsModel = new PointsModel();

pointsPresenter.init(sitePointsElement, siteHeaderMainElement, pointsModel);
