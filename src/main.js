import FilterView from './view/filter-view.js';
import {
  render
} from './render.js';
import {
  RenderPosition
} from './render.js';

import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripMessagesPresenter from './presenter/trip-message-presenter.js';


const siteMainElement = document.querySelector('.page-main');
const siteHeaderMainElement = document.querySelector('.trip-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const siteHeaderElement = document.querySelector('.page-header');
const siteTripControlsFilters = siteHeaderElement.querySelector('.trip-controls__filters');


render(new FilterView(), siteTripControlsFilters, RenderPosition.BEFOREEND);


const tripEventsPresenter = new TripEventsPresenter();
const tripMessagesPresenter = new TripMessagesPresenter();

tripEventsPresenter.init(siteTripEventsElement, siteHeaderMainElement);
tripMessagesPresenter.init(siteTripEventsElement);
