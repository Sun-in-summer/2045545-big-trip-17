export default class PointsModel {
  constructor(points, allOffers) {
    this.points = points;
    this.allOffers=allOffers;
  }


  getPoints = () => this.points;
  getOffers =() =>this.allOffers;

}
