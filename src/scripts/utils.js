import { elementsList } from "./constants";

//Функция добавления карточек на сайт
export function addElements(el) {
    elementsList.prepend(el);
  }

//Функция загрузки
export function loadingProcess(button, text) {
  button.textContent = text;
}
