export default class PointModel {
  #points = null;
  #allOffers = null;

  constructor(points, allOffers) {
    this.#points = points;
    this.#allOffers=allOffers;
  }


  get points() {
    return this.#points;
  }

  get allOffers() {
    return this.#allOffers;
  }

}
