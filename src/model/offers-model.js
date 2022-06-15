// import Observable from '../framework/observable.js';

export default class OffersModel {
  #offersApiService = null;
  #offers = [];

  constructor(offersApiService) {
    this.#offersApiService = offersApiService;
  }


  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      this.#offers = await this.#offersApiService.offers;
      console.log(offers);
    } catch(err) {
      this.#offers = [];
    }
  };

}
