import { elementsList } from "./index.js";

//Функция добавления карточек на сайт
export function addElements(el) {
    elementsList.prepend(el);
  }