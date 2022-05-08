import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointListItemView from '../view/point-list-item-view.js';
import PointCreationFormView from '../view/create-point-form-view.js';
import PointDetailsView from '../view/point-details-view.js';
import PointOffersView from '../view/point-offers-view.js';
import PointDestinationView from '../view/point-destination-view.js';
import InfoView from '../view/info-view.js';
import {
  render
} from '../render.js';
import {
  RenderPosition
} from '../render.js';


export default class PointsPresenter {
  constructor(pointsContainer, headerContainer) {
    this.pointsContainer = pointsContainer;
    this.headerContainer = headerContainer;
    this.sortComponent = new SortView();
    this.pointsListComponent = new PointsListView();
    this.pointListItem = new PointListItemView();
    this.pointCreationFormComponent = new PointCreationFormView();
    this.pointDetailsComponent = new PointDetailsView();
  }


  init = (pointsModel) => {
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

    for (let i = 1 ; i <this.points.length; i++) {// здесь  for , а не for of  потому что иначе  снова отражается первый элемент из поинтов
      this.pointListPosition = new PointListItemView(this.points[i]);
      render(this.pointListPosition, this.pointsListComponent.getElement());
      render(new PointView(this.points[i]), this.pointListPosition.getElement());
    }

    render(new InfoView(), this.headerContainer, RenderPosition.AFTERBEGIN);
  };
}
