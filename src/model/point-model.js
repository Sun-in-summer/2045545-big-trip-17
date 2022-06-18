import dayjs from 'dayjs';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
export default class PointModel extends Observable {
  #pointsApiService = null;
  #destinationsApiService = null;
  #offersApiService = null;
  #points = [];
  #destinations = [];
  #offers =[];


  constructor(pointsApiService, destinationsApiService, offersApiService) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationsApiService = destinationsApiService;
    this.#offersApiService = offersApiService;
  }


  get points() {
    return this.#points;
  }

  get destinations () {
    return this.#destinations;
  }

  get offers () {
    return this.#offers;
  }


  init = async () => {

    try {
      const destinations = await this.#destinationsApiService.destinations;
      const points = await this.#pointsApiService.points;
      this.#offers = await this.#offersApiService.offers;
      this.#destinations = destinations.map(this.#adaptDestinationsToClient);
      this.#points = points.map(this.#adaptPointToClient);
    } catch(err) {
      this.#offers = [];
      this.#destinations = [];
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptPointToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];


      this._notify(updateType, update);
    }
    catch (err) {
      throw new Error('Can\'t update Point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response  = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptPointToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error ('Can\'t add point');
    }
  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error ('Can\'t delete point');
    }
  };

  #adaptPointToClient = (point) => {
    const adaptedPoint = {
      ...point,
      dateFrom: point['date_from'] !== null? dayjs(point['date_from']): point['date_from'],
      dateTo: point['date_to'] !== null? dayjs(point['date_to']): point['date_to'],
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'] !== null? point['is_favorite'] : false,
      destination: {...point['destination'],
        photos: [...point['destination']['pictures']],
      }
    };
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['destination']['pictures'];

    return adaptedPoint;
  };

  #adaptDestinationsToClient = (destination) => {
    const adaptedDestination = {
      ...destination,
      photos: [...destination['pictures']],
    };

    delete adaptedDestination['pictures'];

    return adaptedDestination;
  };

}
