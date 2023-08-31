import { element, imageLink, imageCaption, popupImage } from "./index.js";
import { openPopup } from "./modal.js"

//Функция создания карточки
export default function createElements(name, link) {
    const newElement = element.cloneNode(true);
    const elementName = newElement.querySelector(".element__header");
    const elementImage = newElement.querySelector(".element__img");
    const elementButtonLike = newElement.querySelector(".element__like-button");
    const elementButtonDelete = newElement.querySelector(
      ".element__delete-button"
    );
    elementImage.addEventListener("click", () => {
      openPopup(popupImage);
      imageLink.src = link;
      imageLink.alt = name;
      imageCaption.textContent = name;
    });
    elementButtonDelete.addEventListener("click", () => newElement.remove());
    elementButtonLike.addEventListener("click", () =>
      elementButtonLike.classList.toggle("element__like-button_active")
    );
    elementName.textContent = name;
    elementImage.src = link;
    elementImage.alt = name;
    return newElement;
  }