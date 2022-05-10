import {
  createElement
} from '../render.js';

const createPointListItemTemplate = () => ('<li class="trip-events__item"> </li>');


export default class PointListItemView {
  #element =null;

  get template() {
    return createPointListItemTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
