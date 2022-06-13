import dayjs from 'dayjs';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
export default class PointModel extends Observable {
  #pointsApiService = null;
  #destinationsApiService = null; //
  #points = [];

  constructor(pointsApiService, destinationsApiService) { //delete destinationsApiService
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationsApiService = destinationsApiService;

    this.#destinationsApiService.destinations.then((destinations) => {
      const destinationsList= destinations.map((destination) =>destination.name);
      return destinationsList;
    });

  }


  get points() {
    return this.#points;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  };

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };

  #adaptToClient = (point) => {
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

}
