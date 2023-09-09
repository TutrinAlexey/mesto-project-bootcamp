//Настройки валидации
export const validateSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSelector: ".popup__button-submit",
  invalidInputClass: "popup__input_invalid",
};

//Шаблон карточки и контейнер куда её добавлять
export const elementsList = document.querySelector(".elements-grid__container");
const templateElement = document.querySelector(".template-element");
export const element = templateElement.content.querySelector(".element");

//Попап информация в профиле
export const profileName = document.querySelector(".profile__name");
export const profileAboutU = document.querySelector(".profile__about-you");
export const buttonEditProfile = document.querySelector(
  ".profile__button-edit"
);
export const popupEditProfile = document.querySelector(".popup__edit-profile");
export const formPopupProfile = document.forms["editprofile"];
export const nameInput = formPopupProfile.querySelector("#username");
export const aboutUInput = formPopupProfile.querySelector("#aboutYou");
export const submitEditProfile = formPopupProfile.querySelector(
  ".popup__button-submit"
);

//Попап добавление карточек
export const buttonAddPlace = document.querySelector(".profile__button-add");
export const popupAddPlace = document.querySelector(".popup__add-place");
export const formPopupAddPlace = document.forms["addplace"];
export const namePicInput = formPopupAddPlace.querySelector("#titlePic");
export const urlPicInput = formPopupAddPlace.querySelector("#urlPic");
export const submitAddPlace = formPopupAddPlace.querySelector(
  ".popup__button-submit"
);

//Попап картинки
export const popupImage = document.querySelector(".popup__open-image");
export const imageLink = popupImage.querySelector(".popup__image");
export const imageCaption = popupImage.querySelector(".popup__caption");
export const popupList = Array.from(document.querySelectorAll(".popup"));

//Попап добавлеия карточек
export const profileAvatar = document.querySelector(".profile__avatar");
export const buttonEditAvatar = document.querySelector(".profile__img");
export const popupAvatar = document.querySelector(".popup__edit-avatar");
export const formPopupAvatar = document.forms["editavatar"];
export const urlAvataInput = formPopupAvatar.querySelector("#urlAvatar");
export const submitAvatar = formPopupAvatar.querySelector(
  ".popup__button-submit"
);

//Список кнопок закрывающих попап
export const closeButtons = document.querySelectorAll(".popup__button-close");
