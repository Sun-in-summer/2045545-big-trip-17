import FilterView from './view/filter-view.js';
import {
  render
} from './render.js';
import {
  RenderPosition
} from './render.js';

import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/point-model.js';
import { generatePoints } from './mock/point.js';


const siteMainElement = document.querySelector('.page-main');
const siteHeaderMainElement = document.querySelector('.trip-main');
const sitePointsElement = siteMainElement.querySelector('.trip-events');

const siteHeaderElement = document.querySelector('.page-header');
const siteTripControlsFilters = siteHeaderElement.querySelector('.trip-controls__filters');


render(new FilterView(), siteTripControlsFilters, RenderPosition.BEFOREEND);

const points = generatePoints();
const pointsModel = new PointsModel(points);
new PointsPresenter(sitePointsElement, siteHeaderMainElement).init(pointsModel);


