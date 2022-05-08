import {
  createElement
} from '../render.js';
import { OFFERS } from '../mock/offers.js';
import { getAvailableOffers } from '../mock/point.js';

const createPointOffersTemplate = (point={}) => {
  const {type, offers =[]} =point;

  const availableOffers = getAvailableOffers(type, OFFERS);


  const createOffersItems = (someOffers) =>someOffers.map((item) =>`<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.id}-1" type="checkbox" name="event-offer-${item.id}" checked=''>
                <label class="event__offer-label" for="event-offer-${item.id}-1">
                  <span class="event__offer-title">${item.title}</span>
                  +€&nbsp;
                  <span class="event__offer-price">${item.price}</span>
                </label>
              </div>`).join(' ');


  let offersItems = '';
  if (availableOffers.length > 0) {
    offersItems = createOffersItems(availableOffers);
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
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointOffersTemplate(this.point);
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

