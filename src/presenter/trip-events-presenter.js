import SortView from '../view/sort-view.js';
import RouteEventsListView from '../view/route-events-list-view.js';
import RouteEventView from '../view/route-event-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import EventCreationFormView from '../view/create-event-form-view.js';
import EventDetailsView from '../view/events-details.js';
import EventOffersView from '../view/event-offers-view.js';
import EventDestinationView from '../view/event-destination-view.js';
import TripInfoView from '../view/trip-info-view.js';
import {
  render
} from '../render.js';
import {
  RenderPosition
} from '../render.js';

const FIRST_EVENTS_QUANTITY = 3;

export default class TripEventsPresenter {
  sortComponent = new SortView();
  routeEventsListComponent = new RouteEventsListView();
  eventListItem = new EventListItemView();
  eventCreationFormComponent = new EventCreationFormView();
  eventDetailsComponent = new EventDetailsView();


  init = (tripEventsContainer, tripHeaderContainer) => {
    this.tripEventsContainer = tripEventsContainer;
    this.tripHeaderContainer = tripHeaderContainer;
    render(this.sortComponent, this.tripEventsContainer);
    render(this.routeEventsListComponent, this.tripEventsContainer);
    render(this.eventListItem, this.routeEventsListComponent.getElement());
    render(this.eventCreationFormComponent, this.eventListItem.getElement());
    render(this.eventDetailsComponent, this.eventCreationFormComponent.getElement());
    render(new EventOffersView(), this.eventDetailsComponent.getElement());
    render(new EventDestinationView(), this.eventDetailsComponent.getElement());

    for (let i = 0; i < FIRST_EVENTS_QUANTITY; i++) {
      render(this.eventListItem, this.routeEventsListComponent.getElement());
      render(new RouteEventView(), this.eventListItem.getElement());
    }

    render(new TripInfoView(), tripHeaderContainer, RenderPosition.AFTERBEGIN);
  };
}
