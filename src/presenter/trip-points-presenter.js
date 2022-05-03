import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointListItemView from '../view/point-list-item-view.js';
import PointCreationFormView from '../view/create-point-form-view.js';
import PointDetailsView from '../view/point-details-view.js';
import PointOffersView from '../view/point-offers-view.js';
import PointDestinationView from '../view/point-destination-view.js';
import TripInfoView from '../view/trip-info-view.js';
import {
  render
} from '../render.js';
import {
  RenderPosition
} from '../render.js';


export default class pointsPresenter {
  sortComponent = new SortView();
  pointsListComponent = new PointsListView();
  pointListItem = new PointListItemView();
  pointCreationFormComponent = new PointCreationFormView();
  pointDetailsComponent = new PointDetailsView();


  init = (pointsContainer, headerContainer, pointsModel) => {
    this.pointsContainer = pointsContainer;
    this.headerContainer = headerContainer;
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.getPoints()];
    this.firstPointCreationFormComponent = new PointCreationFormView(this.points[0]);
    render(this.sortComponent, this.pointsContainer);
    render(this.pointsListComponent, this.pointsContainer);
    render(this.pointListItem, this.pointsListComponent.getElement());
    render(this.firstPointCreationFormComponent, this.pointListItem.getElement());
    render(this.pointDetailsComponent, this.firstPointCreationFormComponent.getElement());
    render(new PointOffersView(this.points[0]), this.pointDetailsComponent.getElement());
    render(new PointDestinationView(this.points[0]), this.pointDetailsComponent.getElement());


    for (let i = 1; i < this.points.length; i++) {
      this.pointListPosition = new PointListItemView(this.points[i]);
      render(this.pointListPosition, this.pointsListComponent.getElement());
      render(new PointView(this.points[i]), this.pointListPosition.getElement());
    }

    render(new TripInfoView(), headerContainer, RenderPosition.AFTERBEGIN);
  };
}
