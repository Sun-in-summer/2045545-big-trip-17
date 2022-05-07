import MessageView from '../view/message-view.js';
import {
  render
} from '../render.js';


export default class MessagePresenter {

  messageComponent = new MessageView();


  init = (pointsContainer) => {
    this.pointsContainer = pointsContainer;

    render(this.messageComponent, this.pointsContainer);

  };
}
