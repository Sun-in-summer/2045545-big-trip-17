
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  formatToDateAndTime, getAvailableOffers
} from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {defaultPoint} from '../const.js';
import dayjs from 'dayjs';
import he from 'he';


const createPointEditFormTemplate = (point = defaultPoint, allOffers, isCancelButton, destinations) => {

  const formattedDateFrom = formatToDateAndTime(point.dateFrom);
  const formattedDateTo = formatToDateAndTime(point.dateTo);
  const availableOffers = getAvailableOffers(point.type, allOffers);
  const destinationNames = destinations.map((destination) => destination.name);
  console.log(destinationNames);


  const createOffersSection = ( ) => {
    let offersItems = '';
    if (availableOffers.length > 0) {
      offersItems = availableOffers.map((item) =>{
        const checked = point.offers.includes(item.id) ? 'checked' : '';
        return `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.id}-1" type="checkbox" name="event-offer-${item.id}" data-offer-type="${item.id}" ${checked}>
                <label class="event__offer-label" for="event-offer-${item.id}-1">
                  <span class="event__offer-title">${item.title}</span>
                  +€&nbsp;
                  <span class="event__offer-price">${item.price}</span>
                </label>
              </div>`;
      }).join(' ');
    }

    let isVisible = false;
    if (availableOffers.length > 0) {
      isVisible = true;
    }
    return `<section class="event__section  event__section--offers" ${isVisible? '' : 'hidden'}>
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                    ${offersItems}
                     </div>
                  </section>`;
  };

  const offersSection = createOffersSection();


  const createDestinationSection = () => {
    const destinationDescription = (point['destination']['description'] !== null && point['destination']['description'] !== undefined) ? point['destination']['description'] : '' ;
    const photos = point['destination']['photos'] !== null ? point['destination']['photos'] : [] ;
    const createPhotoWaysTemplate =(destinationPhotos) => {
      let photoWays ='';
      if ( point['destination']['photos'] === undefined ||  Object.keys(point['destination']['photos']).length === 0 ) {
        return photoWays;
      }
      else {
        for (const photo of destinationPhotos){
          photoWays +=  `<img class="event__photo" src="${photo['src']}" alt="${photo['description']}">`;
        }
      }
      return photoWays;
    };

    const photosTemplate =createPhotoWaysTemplate(photos);


    const createDestionationPhotoTemplate = (pickedPhotos) => {
      if (pickedPhotos === undefined  || pickedPhotos.length === 0 ) {
        return '';
      }
      else  {
        return (`<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosTemplate}
                     </div>
    </div> `);
      }
    };


    const photosContainerTemplate =createDestionationPhotoTemplate(photos);

    if (destinationDescription === '' && photosTemplate === '') {
      return '';
    }

    return (`<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationDescription}</p>
                    ${photosContainerTemplate}
                  </section>`);
  };

  const destinationSection = createDestinationSection();


  const createDestinationsDatalist = () => (destinationNames.map((el) => (`<option value="${el}"></option>`)).join(''));


  const destinationsDatalist = createDestinationsDatalist();

  const checkCancelOrDeleteButtonName =(isCancel, isDeleting) => {
    let buttonName = 'Cancel';
    if ( isCancel&& !isDeleting ) {
      return buttonName;
    }
    else if (!isCancel && isDeleting) {
      buttonName = 'Deleting...';
    }
    else if (!isCancel && !isDeleting) {
      buttonName = 'Delete';
    }
    return buttonName;
  };

  const cancelOrDeleteButtonName = checkCancelOrDeleteButtonName(isCancelButton, point.isDeleting);


  return (`<li class="trip-events__item"><form class="event event--edit" action="#" method="post" disabled>
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" ${point.isDisabled? 'disabled' :''} type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group" ${point.isDisabled? 'disabled' :''} >
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${point.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(point.destination.name)}" list="destination-list-1" ${point.isDisabled? 'disabled' :''} required>
                    <datalist id="destination-list-1" >
                      ${destinationsDatalist}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class = "event__input  event__input--time "
                    ${point.isDisabled? 'disabled' :''}
                    id = "event-start-time-1"
                    type = "text"
                    name = "event-start-time"
                    value = "${formattedDateFrom}" required>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedDateTo}" required>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${point.basePrice}" ${point.isDisabled? 'disabled' :''} required min="1">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${point.isDisabled? 'disabled' :''}>${point.isSaving? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset" ${point.isDisabled? 'disabled' :''} >${cancelOrDeleteButtonName} </button>
                </header><section class="event__details">${offersSection} ${destinationSection}</section></form></li>` );

};

export default class PointEditFormView extends AbstractStatefulView {
  #allOffers  = null;
  #newAvailableOffers= null;
  #pointPrice = null;
  #datepickerFrom = null;
  #datepickerTo= null;
  #isCancelButton = false;
  #destinations =null;

  constructor(point = defaultPoint, allOffers, isCancelButton, destinations) {
    super();
    this.#allOffers = allOffers;
    this.#isCancelButton = isCancelButton;
    this.#destinations = destinations;
    this._state = PointEditFormView.convertPointToState(point);
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();

  }

  get template() {
    return createPointEditFormTemplate(this._state, this.#allOffers, this.#isCancelButton, this.#destinations);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };


  _restoreHandlers =() =>{
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setCancelClickHandler(this._callback.cancelClick);
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  };

  reset = (point) =>{
    this.updateElement(
      PointEditFormView.convertPointToState(point),
    );

  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  setCancelClickHandler = (callback) => {
    if (!this.#isCancelButton) {
      return;
    }
    this._callback.cancelClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
  };


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      offers: this._state.offers,
    });
    this._callback.formSubmit(PointEditFormView.convertStateToPoint(this._state));
  };


  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(PointEditFormView.convertStateToPoint(this._state));
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.cancelClick(this.element.querySelector('form').reset());
  };


  #dateFromPeriodChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: dayjs(userDate),
    });
  };

  #dateToPeriodChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: dayjs(userDate),
    });
  };

  #checkNegativeDuration = () => {
    const dateToLaterThenDateFrom =dayjs(this._state.dateFrom).isAfter(this._state.dateTo, 'd');
    if (dateToLaterThenDateFrom) {
      this.#datepickerTo.open();
    }
  };


  #setDatepickerFrom = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateFrom.$d,
        onClose: [this.#dateFromPeriodChangeHandler, this.#checkNegativeDuration],
      },
    );
  };


  #setDatepickerTo = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        minDate: this.#datepickerFrom.selectedDates[0],
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateTo.$d,
        onClose: this.#dateToPeriodChangeHandler,
      },
    );
  };

  #setInnerHandlers = () =>{
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceInputHandler);
    const availableOffers = this.element.querySelector('.event__available-offers');
    if (availableOffers !== null) {
      availableOffers.addEventListener('change', this.#offerChangeHandler);
    }
  };

  #offerChangeHandler =(evt) =>{
    evt.preventDefault();
    const offerName = +evt.target.dataset.offerType;
    const offerIndex = this._state.offers.indexOf(offerName);
    if (offerIndex !== -1) {
      this._state.offers.splice(offerIndex, 1);
    }
    else {
      this._state.offers.push(offerName);
    }
    this._setState({
      offers: this._state.offers,
    });

  };

  #priceInputHandler =(evt) =>{
    evt.preventDefault();
    const basePrice =+evt.target.value;
    if ( isNaN(basePrice) || basePrice <= 0 || evt.target.value % 1 !== 0 ) {
      this.updateElement({
        basePrice: '',
      });
    }
    else {
      this.#pointPrice = basePrice;
    }
    this._setState({
      basePrice: this.#pointPrice,
    });

  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationsNames = this.#destinations.map((destination) =>destination.name);
    const oldDestination = this._state.destination;
    evt.target.checked = true;
    const newDestination = this.#destinations.filter((destination) => destination.name === evt.target.value)[0];
    if (destinationsNames.includes(evt.target.value)) {
      this.updateElement({
        destination: {...this._state.destination,
          name: newDestination.name,
          description: newDestination.description,
          photos: newDestination.photos,

        },
      });
    }
    else {
      this.updateElement({
        destination: oldDestination,
      });


    }
  };

  #pointTypeChangeHandler = (evt) =>{
    evt.preventDefault();
    evt.target.checked = true;
    this.#newAvailableOffers = getAvailableOffers(evt.target.value, this.#allOffers);
    this.updateElement({
      availableOffers: this.#newAvailableOffers,
      offers: [],
      type: evt.target.value,
    });
  };


  static convertPointToState = (point = defaultPoint) =>({...point,
    offers: point.offers.slice(),
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });


  static convertStateToPoint =(state) =>{
    const point = {...state};
    delete point.availableOffers;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}

