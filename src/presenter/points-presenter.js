import {render, replace, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointEditFormView from '../view/point-edit-form-view.js';
import InfoView from '../view/info-view.js';
import NoPointsView from '../view/no-points-view.js';


export default class PointsPresenter {
  #pointsContainer = null;
  #headerContainer = null;
  #sortComponent = null;
  #pointsListComponent = null;

  #pointModel =null;

  #points =[];
  #allOffers =[];


  constructor(pointsContainer, headerContainer, pointModel) {
    this.#pointModel = pointModel;
    this.#pointsContainer = pointsContainer;
    this.#headerContainer = headerContainer;
    this.#sortComponent = new SortView();
    this.#pointsListComponent = new PointsListView();
    this.#points = [...this.#pointModel.points];
    this.#allOffers = [...this.#pointModel.allOffers];
  }


  init = () => {
    this.#renderPointsList();
  };


  #renderPoint =(point, offers) => {

    const pointComponent = new PointView(point, offers);
    const pointEditFormComponent = new PointEditFormView(point, offers);


    const replaceItemToForm = () => {
      replace(pointEditFormComponent, pointComponent);
    };

    const replaceFormToItem = () => {
      replace(pointComponent, pointEditFormComponent);
    };

    const onEscArrowUpKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc' || evt.key === 'ArrowUp' || evt.keyCode === 38){
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', onEscArrowUpKeyDown);
      }
    };


    pointComponent.setEditClickHandler(()=> {
      replaceItemToForm();
      document.addEventListener('keydown', onEscArrowUpKeyDown);
    });

    pointEditFormComponent.setFormSubmitHandler(() => {
      replaceFormToItem();
      document.removeEventListener('keydown', onEscArrowUpKeyDown);
    });

    render (pointComponent, this.#pointsListComponent.element);
  };

  #renderPointsList =() => {
    if (this.#points.length === 0) {
      render(new NoPointsView(), this.#pointsContainer);
    }
    else {
      render(this.#sortComponent, this.#pointsContainer);
      render(this.#pointsListComponent, this.#pointsContainer);
      for (let i =0 ; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i], this.#allOffers);
      }
      render(new InfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
    }
  };
}
