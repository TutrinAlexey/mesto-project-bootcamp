import { popupList } from "./constants.js";

//Функция закрытия модального окна
export function openPopup(el) {
  el.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
  document.addEventListener("mousedown", closeOnOverlay);
}
//Функция открытия модального окна
export function closePopup(el) {
  el.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
  document.removeEventListener("mousedown", closeOnOverlay);
}
//Функция закрытия модального окна по клавише ESC
function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    popupList.forEach((popupElement) => {
      if (popupElement.classList.contains("popup_opened")) {
        closePopup(popupElement)
      }
    });
  }
}
//Функция закрытия модального окна по нажатию вне формы
function closeOnOverlay(evt) {
  checkClassPopup(evt.target);
}

//Функция проверяет какое модальное окно открыто
function checkClassPopup(popup) {
  if (popup.classList.contains("popup")) {
    closePopup(popup);
  }
}