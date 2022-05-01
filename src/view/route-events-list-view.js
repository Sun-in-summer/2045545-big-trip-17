import {
  createElement
} from '../render.js';

const createRouteEventsListTemplate = () => ('<ul class="trip-events__list"></ul>');

export default class RouteEventsListView {
  getTemplate() {
    return createRouteEventsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
