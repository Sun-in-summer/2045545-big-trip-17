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
      // const destinations = await this.#destinationsApiService.destinations;
      // this.#destinations = destinations.map((destination) =>destination.name);
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations.map(this.#adaptToClient);
    } catch(err) {
      this.#destinations = [];
    }
  };

  #adaptToClient = (destination) => {
    const adaptedDestination = {
      ...destination,
      photos: [...destination['pictures']],
    };

    delete adaptedDestination['pictures'];

    return adaptedDestination;
  };

}


