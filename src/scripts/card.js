import { deleteCard, deleteLike, putLike } from "./api.js";
import {
  element,
  formPopupConfirm,
  imageCaption,
  imageLink,
  popupConfirm,
  popupImage,
} from "./constants.js";
import { userId } from "./index.js";

import { closePopup, openPopup } from "./modal.js";

let cardDelete;
let cardId;

//Функция проверки кто добавил карточку
function checkOwnerOfCard(el, button) {
  if (el.owner._id === userId) {
    button.classList.remove("delete-button_disable");
  }
}
//Функция создания карточки
export default function createElements(el) {
  const newElement = element.cloneNode(true);
  const elementName = newElement.querySelector(".element__header");
  const elementImage = newElement.querySelector(".element__img");
  const elementCountLikes = newElement.querySelector(".element__like-num");
  const elementButtonLike = newElement.querySelector(".element__like-button");
  const elementButtonDelete = newElement.querySelector(
    ".element__delete-button"
  );
  //Функция активирования лайка
  function addLike() {
    elementButtonLike.classList.add("element__like-button_active");
  }
  //Функция отключения лайка
  function removeLike() {
    elementButtonLike.classList.remove("element__like-button_active");
  }
  //Функция проверяет наличие вашего лайка
  function checkLike() {
    return el.likes.find((el) => el._id === userId);
  }
  //Функция активирует лайк если вы его ставили и отключает если вы его не ставили
  function checkOwnerOfLike() {
    if (checkLike()) {
      addLike();
    } else {
      removeLike();
    }
  }

  //Слушатель на открытие попапа с фото при клике
  elementImage.addEventListener("click", () => {
    openPopup(popupImage);
    imageLink.src = el.link;
    imageLink.alt = el.name;
    imageCaption.textContent = el.name;
  });

  elementButtonLike.addEventListener("click", () => {
    if (elementButtonLike.classList.contains("element__like-button_active")) {
      deleteLike(el._id, el.likes)
        .then((res) => {
          elementButtonLike.classList.remove("element__like-button_active");
          elementCountLikes.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putLike(el._id, el.likes)
        .then((res) => {
          elementButtonLike.classList.add("element__like-button_active");
          elementCountLikes.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  //Слушатель на удаление карточки при клике
  elementButtonDelete.addEventListener("click", () => {
    cardDelete = newElement;
    cardId = el._id;
    openPopup(popupConfirm);
    formPopupConfirm.addEventListener("submit", handleConfirmForm);
  });

  checkOwnerOfLike();
  checkOwnerOfCard(el, elementButtonDelete);
  elementName.textContent = el.name;
  elementImage.src = el.link;
  elementImage.alt = el.name;
  elementCountLikes.textContent = el.likes.length;
  return newElement;
}

//Функция обработки Попапа подтверждения
export function handleConfirmForm(evt) {
  evt.preventDefault();
  deleteCard(cardId)
    .then(() => {
      cardDelete.remove();
      closePopup(popupConfirm);
    })
    .catch((err) => {
      console.log(err);
    });
}
