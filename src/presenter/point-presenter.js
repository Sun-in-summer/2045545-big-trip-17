import PointView from '../view/point-view';
import PointEditFormView from '../view/point-edit-form-view';
import {render, replace, remove}  from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};


export default class PointPresenter {
  #point = null;
  #offers = null;
  #pointComponent = null;
  #pointEditFormComponent = null;
  #pointsListContainer = null;
  #changeData = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;


  constructor (pointsListContainer, changeData, changeMode) {
    this.#pointsListContainer =pointsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

  }

  init =(point, offers) =>{
    this.#point = point;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditFormComponent = this.#pointEditFormComponent;
    this.#pointComponent = new PointView(point, offers);
    this.#pointEditFormComponent = new PointEditFormView(point, offers);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditFormComponent.setFormSubmitHandler(this.#handleFormSubmit);

    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevPointComponent === null || prevPointEditFormComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    // if (this.#pointsListContainer.contains(prevPointComponent.element)) {
    // }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditFormComponent, prevPointEditFormComponent);
    }

    // if (this.#pointsListContainer.contains(prevPointEditFormComponent.element)) {
    //   replace(this.#pointEditFormComponent, prevPointEditFormComponent);
    // }

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
    document.addEventListener('keydown', this.#EscArrowUpKeyDownHandler);
    this.#changeMode();
    this.#mode =Mode.EDITING;
  };

  #replaceFormToItem = () => {
    replace(this.#pointComponent, this.#pointEditFormComponent);
    document.removeEventListener('keydown', this.#EscArrowUpKeyDownHandler);
    this.#mode =Mode.DEFAULT;
  };

  #EscArrowUpKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.key === 'ArrowUp' || evt.keyCode === 38){
      evt.preventDefault();
      this.#replaceFormToItem();
    }
  };

  #handleEditClick =() => {
    this.#replaceItemToForm();
  };

  #handleFormSubmit = (point) =>{
    this.#changeData(point);
    this.#replaceFormToItem();
  };

  #handleFavoriteClick =() => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };


}
