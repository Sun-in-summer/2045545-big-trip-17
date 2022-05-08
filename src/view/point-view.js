import {
  createElement
} from '../render.js';
import {
  humanizePointDate,
  pickHoursMinutesFromDate,
  countDuration,
  convertToDatetimeFormat
} from '../utils.js';

const createPointTemplate = (point) => {
  const {
    destination,
    basePrice,
    isFavorite,
    type,
    dateFrom,
    dateTo,
    offers
  } = point;

  const startDate = dateFrom !== null ?
    humanizePointDate(dateFrom) :
    '';

  const startTime = pickHoursMinutesFromDate(dateFrom);
  const endTime = pickHoursMinutesFromDate(dateTo);

  const convertedToDatetimeDateFrom=convertToDatetimeFormat(dateFrom);
  const convertedToDatetimeDateTo=convertToDatetimeFormat(dateTo);

  const duration = countDuration(dateTo, dateFrom);

  const favoriteClassName = isFavorite ?
    'event__favorite-btn--active' :
    '';

  // const firstOfferTitle = offers.length !== 0 ? offers[0].title : '';
  // const firstOfferPrice = offers.length !== 0 ? offers[0].price : '';

  return (`<div class="event">
                <time class="event__date" datetime=${convertedToDatetimeDateFrom}>${startDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type}   ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${convertedToDatetimeDateFrom}>${startTime}</time>
                    —
                    <time class="event__end-time" datetime=${convertedToDatetimeDateTo}>${endTime}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">_____firstOfferTitle________</span>
                    +€&nbsp;
                    <span class="event__offer-price">_____firstOfferPrice______</span>
                  </li>
                </ul>
                <button class = "event__favorite-btn ${favoriteClassName}"
                type = "button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>`);
};

export default class PointView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
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
