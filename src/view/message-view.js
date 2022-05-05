import {
  createElement
} from '../render.js';


// const Message = {
//   LOADING: 'Loading...',
//   EVERYTHING: 'Click New Event to create your first point',
//   PAST: 'There are no past events now',
//   FUTURE: 'There no future events now',
// };

const createMessageTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class MessageView {
  getTemplate() {
    return createMessageTemplate();
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
