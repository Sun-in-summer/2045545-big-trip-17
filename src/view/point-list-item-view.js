import {
  createElement
} from '../render.js';

const createPointListItemTemplate = () => ('<li class="trip-events__item"> </li>');


export default class PointListItemView {
  getTemplate() {
    return createPointListItemTemplate();
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
