import PointEditFormView from '../view/point-edit-form-view';
import {render, remove, RenderPosition}  from '../framework/render';
import { UserAction, UpdateType } from '../const.js';
import {nanoid} from 'nanoid';
import { defaultPoint } from '../const.js';


export default class NewPointPresenter {
  #pointEditFormComponent = null;
  #pointsListContainer = null;
  #changeData = null;
  #allOffers  = null;
  #allPoints = null;//

  #destroyCallback = null;
  #isCancelButton = null;
  #destinations = null; //


  constructor (pointsListContainer, changeData) {
    this.#pointsListContainer =pointsListContainer;
    this.#changeData = changeData;
  }

  init =(callback, allOffers, isCancelButton, destinations) =>{ //
    this.#destroyCallback = callback;
    this.#allOffers = allOffers;
    this.#isCancelButton = isCancelButton;
    this.#destinations = destinations; //


    if (this.#pointEditFormComponent !== null) {
      return;
    }


    this.#pointEditFormComponent = new PointEditFormView(defaultPoint, this.#allOffers, this.#isCancelButton, this.#destinations);//

    this.#pointEditFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditFormComponent.setCancelClickHandler(this.#handleCancelClick);


    render(this.#pointEditFormComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN );

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditFormComponent === null) {
      return;
    }

    this.#destroyCallback();

    remove(this.#pointEditFormComponent);
    this.#pointEditFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc' ){
      evt.preventDefault();
      this.destroy();

    }
  };

  #handleFormSubmit = (point) =>{

    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleCancelClick =() => {
    this.destroy();
  };
}
