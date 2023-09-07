import "./../pages/index.css";

import { initialCards } from "./data.js";
import createElements from "./card.js";
import { addElements } from "./utils.js";
import { closePopup, openPopup } from "./modal.js";
import enableValidate from "./validate.js";

const validateSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSelector: ".popup__button-submit",
  invalidInputClass: "popup__input_invalid",
};

export const elementsList = document.querySelector(".elements-grid__container");
const templateElement = document.querySelector(".template-element");
export const element = templateElement.content.querySelector(".element");

const profileName = document.querySelector(".profile__name");
const profileAboutU = document.querySelector(".profile__about-you");
const buttonEditProfile = document.querySelector(".profile__button-edit");
export const popupEditProfile = document.querySelector(".popup__edit-profile");
const formPopupProfile = popupEditProfile.querySelector(".popup__form");
const nameInput = formPopupProfile.querySelector("#username");
const aboutUInput = formPopupProfile.querySelector("#aboutYou");
const submitEditProfile = formPopupProfile.querySelector(
  ".popup__button-submit"
);
const buttonCloseEditProfile = popupEditProfile.querySelector(
  ".popup__button-close"
);

const buttonAddPlace = document.querySelector(".profile__button-add");
export const popupAddPlace = document.querySelector(".popup__add-place");
const formPopupAddPlace = popupAddPlace.querySelector(".popup__form");
const namePicInput = formPopupAddPlace.querySelector("#titlePic");
const urlPicInput = formPopupAddPlace.querySelector("#urlPic");
const submitAddPlace = formPopupAddPlace.querySelector(".popup__button-submit");
const buttonCloseAddPlace = popupAddPlace.querySelector(".popup__button-close");

export const popupImage = document.querySelector(".popup__open-image");
const buttonCloseImage = popupImage.querySelector(".popup__button-close");
export const imageLink = popupImage.querySelector(".popup__image");
export const imageCaption = popupImage.querySelector(".popup__caption");
export const popupList = Array.from(document.querySelectorAll(".popup"));

const profileAvatar = document.querySelector(".profile__avatar");
const buttonEditAvatar = document.querySelector(".profile__img");
const popupAvatar = document.querySelector(".popup__edit-avatar");
const buttonCloseAvatar = popupAvatar.querySelector(".popup__button-close");
const formPopupAvatar = popupAvatar.querySelector(".popup__form");
const urlAvataInput = formPopupAvatar.querySelector("#urlAvatar");
const submitAvatar = formPopupAvatar.querySelector(".popup__button-submit");

const closeButtons = document.querySelectorAll(".popup__button-close");

const errorListEditProfile = Array.from(
  popupEditProfile.querySelectorAll(".error_input-text")
);

//Функция добавления измененной информации в профиль
function addProfileInfo(name, about) {
  profileName.textContent = name;
  profileAboutU.textContent = about;
}
//Функция изменеия автарки профиля
function addAvatar(link) {
  profileAvatar.src = link;
}
//Добавление стартовых карточек
initialCards.forEach((el) => {
  addElements(createElements(el.name, el.link));
});
//Функция обработки формы редактирования профиля
function handleProfileForm(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = aboutUInput.value;
  addProfileInfo(name, about);
  closePopup(popupEditProfile);
}
//Функция обработки формы добавления карточки
function handleAddPlaceForm(evt) {
  evt.preventDefault();
  const name = namePicInput.value;
  const link = urlPicInput.value;
  addElements(createElements(name, link));
  evt.target.reset();
  closePopup(popupAddPlace);
  submitAddPlace.disabled = true;
}
//Функция обработки формы добавления карточки
function handleAvatarForm(evt) {
  evt.preventDefault();
  const link = urlAvataInput.value;
  addAvatar(link);
  evt.target.reset();
  closePopup(popupAvatar);
  submitAvatar.disabled = true;
}
//Функция удаления еррора валидации
function hideErrors(errorList) {
  errorList.forEach((error) => (error.textContent = ""));
}
//Функция проверяет какое модальное окно открыто
export function checkClassPopup(popup) {
  if (popup === popupEditProfile) {
    closePopup(popupEditProfile);
  } else if (popup === popupAddPlace) {
    closePopup(popupAddPlace);
  } else if (popup === popupImage) {
    closePopup(popupImage);
  } else if (popup === popupAvatar) {
    closePopup(popupAvatar);
  }
}

// Отправка формы Модального окна(редактировние профиля)
formPopupProfile.addEventListener("submit", handleProfileForm);

// Открытие Модального окна(редактировние профиля) по кнопке добавления
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutUInput.value = profileAboutU.textContent;
  hideErrors(errorListEditProfile);
  nameInput.classList.remove(validateSettings.invalidInputClass);
  aboutUInput.classList.remove(validateSettings.invalidInputClass);
  submitEditProfile.disabled = false;
});

// Отправка формы Модального окна(добавление карточек)
formPopupAddPlace.addEventListener("submit", handleAddPlaceForm);

// Открытие Модального окна(добавление карточек) по кнопке добавления
buttonAddPlace.addEventListener("click", () => openPopup(popupAddPlace));

enableValidate(validateSettings);

// Отправка формы Модального окна(изменение аватарки)
formPopupAvatar.addEventListener("submit", handleAvatarForm);

// Открытие Модального окна(изменение аватарки) по нажаитю на аватарку
buttonEditAvatar.addEventListener("click", () => openPopup(popupAvatar));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
