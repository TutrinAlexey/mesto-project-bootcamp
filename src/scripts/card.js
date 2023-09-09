import { deleteCard, deleteLike, putLike } from "./api.js";
import {
  element,
  imageLink,
  imageCaption,
  popupImage,
  checkOwnerOfCard,
  userId,
} from "./index.js";
import { openPopup } from "./modal.js";

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

  //Слушатель на удаление карточки при клике
  elementButtonDelete.addEventListener("click", () => {
    deleteCard(el._id)
      .then(() => newElement.remove())
      .catch((err) => {
        console.log(err);
      });
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

  checkOwnerOfLike();
  checkOwnerOfCard(el, elementButtonDelete);
  elementName.textContent = el.name;
  elementImage.src = el.link;
  elementImage.alt = el.name;
  elementCountLikes.textContent = el.likes.length;
  return newElement;
}
