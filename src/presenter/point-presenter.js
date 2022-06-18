import PointView from '../view/point-view';
import PointEditFormView from '../view/point-edit-form-view';
import {render, replace, remove}  from '../framework/render';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual, isPastPoint, isFuturePoint } from '../utils/point';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};


export default class PointPresenter {
  #point = null;
  #offers = null; // ?
  #pointComponent = null;
  #pointEditFormComponent = null;
  #pointsListContainer = null;
  #changeData = null;
  #changeMode = null;


  #mode = Mode.DEFAULT;

  #isCancelButton = false;  //
  #destinations = null; //


  constructor (pointsListContainer, changeData, changeMode) {
    this.#pointsListContainer =pointsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

  }

  init =(point, offers, isCancelButton, destinations) =>{ //
    this.#point = point;
    this.#offers = offers;
    this.#isCancelButton = isCancelButton;
    this.#destinations = destinations; //


    const prevPointComponent = this.#pointComponent;
    const prevPointEditFormComponent = this.#pointEditFormComponent;
    this.#pointComponent = new PointView(point, offers);
    this.#pointEditFormComponent = new PointEditFormView(point, offers, isCancelButton, this.#destinations );

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditFormComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevPointEditFormComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditFormComponent, prevPointEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditFormComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToItem();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditFormComponent);
  };


  #replaceItemToForm = () => {
    replace(this.#pointEditFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escArrowUpKeyDownHandler);
    this.#changeMode();
    this.#mode =Mode.EDITING;
  };

  #replaceFormToItem = () => {
    replace(this.#pointComponent, this.#pointEditFormComponent);
    document.removeEventListener('keydown', this.#escArrowUpKeyDownHandler);
    this.#mode =Mode.DEFAULT;
  };

  #escArrowUpKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.key === 'ArrowUp' || evt.keyCode === 38){
      evt.preventDefault();
      this.#pointEditFormComponent.reset(this.#point);
      this.#replaceFormToItem();
    }
  };

  #handleEditClick =() => {
    this.#replaceItemToForm();
  };


  #handleFormSubmit = (update) =>{
    let updateType = UpdateType.MAJOR;
    const isMajorUpdate = !( ( isPastPoint(this.#point.dateFrom, this.#point.dateTo) && isPastPoint(update.dateFrom, update.dateTo) ) || (isFuturePoint(this.#point.dateFrom, this.#point.dateTo) && isFuturePoint(update.dateFrom, update.dateTo)));


    if (!isMajorUpdate) {
      const isMinorUpdate = !(isDatesEqual(this.#point.dateFrom, update.dateFrom) && isDatesEqual(this.#point.dateTo, update.dateTo));
      if (isMinorUpdate) {

        updateType = UpdateType.MINOR;
      }
      else {

        updateType = UpdateType.PATCH;
      }
    }

    this.#changeData(
      UserAction.UPDATE_POINT,
      updateType,
      update
    );
    this.#replaceFormToItem();
  };


  #handleFavoriteClick =() => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleDeleteClick = (update) =>{

    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      update
    );
    this.destroy();

  };

}
