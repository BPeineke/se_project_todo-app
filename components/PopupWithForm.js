import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, _handleFormSubmit }) {
    super({ popupSelector });
  }
}
export default PopupWithForm;
