import TripMessageView from '../view/trip-message-view.js';
import {
  render
} from '../render.js';


export default class TripMessagePresenter {

  tripMessageComponent = new TripMessageView();


  init = (tripEventsContainer) => {
    this.tripEventsContainer = tripEventsContainer;

    render(this.tripMessageComponent, this.tripEventsContainer);

  };
}
