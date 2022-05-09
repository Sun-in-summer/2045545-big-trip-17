export default class PointModel {
  constructor(points, allOffers) {
    this.points = points;
    this.allOffers=allOffers;
  }


  getPoints = () => this.points;
  getOffers =() =>this.allOffers;

}
