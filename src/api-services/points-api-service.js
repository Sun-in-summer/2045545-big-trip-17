import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }


  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (point) =>{
    console.log(point.dateFrom instanceof Date); // проверить тип дат
    const adaptedPoint = {...point,
      'date_from': point.dateFrom ,
      'date_to': point.dateTo,
      'base_price': point.basePrice,
      'is_favorite': point.isFavorite,
      'destination': {...point['destination'],
        pictures: point['destination']['photos'],
      }
    };
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint['destination']['photos'];
    return adaptedPoint;
  };
}

