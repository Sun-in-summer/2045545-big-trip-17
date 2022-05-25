import {render, RenderPosition} from './framework/render.js';
import FilterView from './view/filter-view.js';

import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import { generatePoints } from './mock/point.js';
import { OFFERS } from './mock/offers.js';
import { generateFilter } from './mock/filter.js';


const siteMainElement = document.querySelector('.page-main');
const siteHeaderMainElement = document.querySelector('.trip-main');
const sitePointsElement = siteMainElement.querySelector('.trip-events');

const siteHeaderElement = document.querySelector('.page-header');
const siteTripControlsFilters = siteHeaderElement.querySelector('.trip-controls__filters');


const points = generatePoints();
const allOffers =OFFERS.slice();

const pointModel = new PointModel(points, allOffers);
const boardPresenter = new  BoardPresenter(sitePointsElement, siteHeaderMainElement, pointModel);

const filters =generateFilter(pointModel.points);

render(new FilterView(filters), siteTripControlsFilters, RenderPosition.BEFOREEND);

boardPresenter.init();


