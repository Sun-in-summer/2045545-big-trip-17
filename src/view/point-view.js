import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizePointDate,
  pickHoursMinutesFromDate,
  countDuration,
  convertToDatetimeFormat
} from '../utils/point.js';
import { getAvailableOffers } from '../mock/point.js';

const createPointTemplate = (point, allOffers) => {
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

  const convertedToDatetimeDateFrom = convertToDatetimeFormat(dateFrom);
  const convertedToDatetimeDateTo = convertToDatetimeFormat(dateTo);

  const duration = countDuration(dateTo, dateFrom);

  const favoriteClassName = isFavorite ?
    'event__favorite-btn--active' :
    '';

  const availableOffers =getAvailableOffers(type, allOffers);

  let offersList= '';
  if ((offers.length !== 0)&& (availableOffers.length !==0)) {
    offersList = offers.map((el)=> {
      const foundOffer = availableOffers.find((offer) => offer.id === el);
      const title =foundOffer.title;
      const price =foundOffer.price;
      return (`<li class="event__offer">
                    <span class="event__offer-title">${title}</span>
                    +€&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </li>`);}).join(' ');
  }


  return (`<li class="trip-events__item"><div class="event">
                <time class="event__date" datetime=${convertedToDatetimeDateFrom}>${startDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type}   ${destination.name}</h3>
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
                  ${offersList}
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
              </div></li>`);
};


export default class PointView extends AbstractView {

  #point  = null;
  #allOffers  = null;

  constructor(point, allOffers) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
  }

  get template() {
    return createPointTemplate(this.#point, this.#allOffers);
  }


  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFavoriteClickHandler = (callback) =>{
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) =>{
    evt.preventDefault();
    this._callback.favoriteClick();
  };

}
