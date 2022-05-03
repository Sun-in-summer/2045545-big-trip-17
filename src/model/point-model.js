import {
  generatePoint
} from '../mock/point.js';
const FIRST_POINTS_QUANTITY = 25;


export default class PointsModel {


  points = Array.from({
    length: FIRST_POINTS_QUANTITY
  }, generatePoint);

  getPoints = () => this.points;
}
