export default class DestinationsModel  {
  #destinationsApiService = null; //
  #destinations =[];

  constructor(destinationsApiService) {
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations.map((destination) =>destination.name);
    } catch(err) {
      this.#destinations = [];
    }
  };

}
