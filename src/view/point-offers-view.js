import {
  createElement
} from '../render.js';
import { getAvailableOffers } from '../mock/point.js';

const createPointOffersTemplate = (point={}, allOffers ) => {
  const {type, offers =[]} =point;

  const availableOffers = getAvailableOffers(type, allOffers);


  let offersItems = '';
  if (availableOffers.length > 0) {
    offersItems = availableOffers.map((item) =>{
      const checked = offers.includes(item.id) ? 'checked' : '';
      return `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.id}-1" type="checkbox" name="event-offer-${item.id}" ${checked}>
                <label class="event__offer-label" for="event-offer-${item.id}-1">
                  <span class="event__offer-title">${item.title}</span>
                  +€&nbsp;
                  <span class="event__offer-price">${item.price}</span>
                </label>
              </div>`;
    }).join(' ');
  }

  let offersContainer ='<div></div>';

  if (offers.length === 0) {
    offersContainer ='<div></div>';
  }
  else {
    offersContainer =`<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                    ${offersItems}
                     </div>
                  </section>`;
  }
  return offersContainer;
};


export default class PointOffersView {
  constructor(point, allOffers) {
    this.point = point;
    this.allOffers =allOffers;
  }

  getTemplate() {
    return createPointOffersTemplate(this.point, this.allOffers);
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

