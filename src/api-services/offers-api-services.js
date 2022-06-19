import ApiService from '../framework/api-service.js';


export default class OffersApiService extends ApiService {
  getOffersAsync() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }
}


