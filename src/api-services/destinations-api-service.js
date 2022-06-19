import ApiService from '../framework/api-service.js';


export default class DestinationsApiService extends ApiService {
  getDestinationsAsync() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }
}

