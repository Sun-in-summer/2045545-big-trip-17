
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  formatToDateAndTime, getAvailableOffers, pickPhotos
} from '../utils/point.js';
import {DestinationPhotos, DestinationDescriptions} from '../mock/point.js';


const defaultPoint = {
  basePrice: '987',
  dateFrom:'2022-07-10T10:55:56.845Z',
  dateTo: '2022-07-12T10:56:13.375Z',
  destination: 'Amsterdam',
  type:'flight'
};

const createPointEditFormTemplate = (point = defaultPoint, allOffers) => {

  const formattedDateFrom = formatToDateAndTime(point.dateFrom);
  const formattedDateTo = formatToDateAndTime(point.dateTo);

  const availableOffers = getAvailableOffers(point.type, allOffers);


  const createOffersSection = ( ) => {
    let offersItems = '';
    if (availableOffers.length > 0) {
      offersItems = availableOffers.map((item) =>{
        const checked = point.offers.includes(item.id) ? 'checked' : '';
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

    let isVisible = true;
    if (availableOffers.length === 0) {
      isVisible = false;
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
    const destinationDescription = DestinationDescriptions[point.destination];
    const photos =pickPhotos(DestinationPhotos, point.destination);
    const createPhotoWaysTemplate =(pickedPhotos) => {
      let photoWays ='';
      if (pickedPhotos.length === 0) {
        return photoWays;
      }
      else {
        for (const pickedPhoto of pickedPhotos){
          photoWays +=  `<img class="event__photo" src=${pickedPhoto} alt="Event photo">`;
        }
      }
      return photoWays;
    };

    const photosTemplate =createPhotoWaysTemplate(photos);


    const createDestionationPhotoTemplate = (pickedPhotos) => {
      if (pickedPhotos.length === 0) {
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

    return (`<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationDescription}</p>
                    ${photosContainerTemplate}
                  </section>`);
  };

  const destinationSection = createDestinationSection();


  return (`<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination}" list="destination-list-1" required>
                    <datalist id="destination-list-1" >
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                      <option value="Moscow"></option>
                      <option value="Beijing"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class = "event__input  event__input--time"
                    id = "event-start-time-1"
                    type = "text"
                    name = "event-start-time"
                    value = "${formattedDateFrom}" >
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedDateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}" required>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header><section class="event__details">${offersSection} ${destinationSection}</section></form></li>` );

};

export default class PointEditFormView extends AbstractStatefulView {
  #point  = null;
  #allOffers  = null;
  #availableOffers = null;
  #newAvailableOffers= null;
  #pointPrice = null;
  #oldChosenOffers = null;


  constructor(point = defaultPoint, allOffers) {
    super();
    this.#allOffers = allOffers;
    this._state = PointEditFormView.convertPointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createPointEditFormTemplate(this._state, this.#allOffers);
  }


  _restoreHandlers =() =>{
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
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

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointEditFormView.convertStateToPoint(this._state));
  };

  #setInnerHandlers = () =>{
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceInputHandler);
    if (this.element.querySelector('.event__available-offers') !== null) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }
  };

  #offerChangeHandler =(evt) =>{
    evt.preventDefault();
    const offerName = parseInt(evt.target.name.slice(12), 10);
    if (this._state.offers.includes(offerName)) {
      this._state.offers.splice(this._state.offers.indexOf(offerName), 1);
    }
    else {
      this._state.offers.push(offerName);
    }
    this.updateElement({
      offers: this._state.offers,
    });

  };

  #priceInputHandler =(evt) =>{
    evt.preventDefault();
    if ( (evt.target.value % 1 !== 0) || (evt.target.value <= 0) ){
      this.updateElement({
        basePrice: '',
      });
    }
    else {
      this.#pointPrice = evt.target.value;
    }
    this._setState({
      basePrice: this.#pointPrice,
    });

  };


  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const oldDestination = this._state.destination;
    evt.target.checked = true;
    if (Object.keys(DestinationDescriptions).includes(evt.target.value)) {
      this.updateElement({
        destination: evt.target.value,
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

  static convertPointToState = (point) =>({...point});
  static convertStateToPoint =(state) =>{
    const point = {...state};
    delete point.availableOffers;
    return point;
  };
}
