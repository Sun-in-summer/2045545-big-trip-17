import {
  createElement
} from '../render.js';
import {  pickPhotos } from '../utils.js';
import { DestinationDescriptions, DestinationPhotos } from '../const.js';


const createPointDestinationTemplate = (point = {}) => {
  const {
    destination
  } = point;

  const destinationDescription = DestinationDescriptions[destination];

  const photos =pickPhotos(DestinationPhotos, destination);

  const createPhotoWaysTemplate =(pickedPhotos) => {
    let photoWays ='';
    if (pickedPhotos.length === 0) {
      return photoWays;
    }
    else {
      for (let i =0 ; i< pickedPhotos.length; i++){
        photoWays +=  `<img class="event__photo" src=${pickedPhotos[i]} alt="Event photo">`;
      }
    }
    return photoWays;
  };

  const photosTemplate =createPhotoWaysTemplate(photos);


  const createDestionationPhotoTemplate = (pickedPhotos) => {
    if (pickedPhotos.length === 0) {
      return '';
    }
    else  {
      return (`<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosTemplate}
                     </div>
    </div> `);
    }
  };


  const photosContainerTemplate =createDestionationPhotoTemplate(photos);

  return (`<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationDescription}</p>
                    ${photosContainerTemplate}
                  </section>`);
};


export default class PointDestinationView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointDestinationTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
