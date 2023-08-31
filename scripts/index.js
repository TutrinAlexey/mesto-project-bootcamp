import { initialCards } from "./data.js";
import enableValidate from "./validate.js";

const validateSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSelector: ".popup__button-submit",
  invalidInputClass: "popup__input_invalid",
};

const elementsList = document.querySelector(".elements-grid__container");
const templateElement = document.querySelector(".template-element");
const element = templateElement.content.querySelector(".element");

const profileName = document.querySelector(".profile__name");
const profileAboutU = document.querySelector(".profile__about-you");
const buttonEditProfile = document.querySelector(".profile__button-edit");
const popupEditProfile = document.querySelector(".popup__edit-profile");
const formPopupProfile = popupEditProfile.querySelector(".popup__form");
const nameInput = formPopupProfile.querySelector("#username");
const aboutUInput = formPopupProfile.querySelector("#aboutYou");
const buttonCloseEditProfile = popupEditProfile.querySelector(
  ".popup__button-close"
);

const buttonAddPlace = document.querySelector(".profile__button-add");
const popupAddPlace = document.querySelector(".popup__add-place");
const formPopupAddPlace = popupAddPlace.querySelector(".popup__form");
const namePicInput = formPopupAddPlace.querySelector("#titlePic");
const urlPicInput = formPopupAddPlace.querySelector("#urlPic");
const buttonCloseAddPlace = popupAddPlace.querySelector(".popup__button-close");

const popupImage = document.querySelector(".popup__open-image");
const buttonCloseImage = popupImage.querySelector(".popup__button-close");
const imageLink = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");

const popupList = Array.from(document.querySelectorAll(".popup"));

const errorListAddPlace = Array.from(
  popupAddPlace.querySelectorAll(".error_input-text")
);

const errorListEditProfile = Array.from(
  popupEditProfile.querySelectorAll(".error_input-text")
);
//Функция закрытия модального окна
function openPopup(el) {
  el.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
  document.addEventListener("mousedown", closeOnOverlay);
}
//Функция открытия модального окна
function closePopup(el) {
  el.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
  document.removeEventListener("mousedown", closeOnOverlay);
}
//Функция добавления измененной информации в профиль
function addProfileInfo(name, about) {
  profileName.textContent = name;
  profileAboutU.textContent = about;
}
//Функция создания карточки
function createElements(name, link) {
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
//Функция добавления карточек на сайт
function addElements(el) {
  elementsList.prepend(el);
}

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
  namePicInput.value = "";
  urlPicInput.value = "";
  closePopup(popupAddPlace);
}
//Функция удаления еррора валидации
function hideErrors(errorList) {
  errorList.forEach((error) => (error.textContent = ""));
}

//Функция проверяет какое модальное окно открыто
function checkClassPopup(popup) {
  if (popup === popupEditProfile) {
    closePopup(popupEditProfile);
    hideErrors(errorListEditProfile);
    nameInput.classList.remove(validateSettings.invalidInputClass);
    aboutUInput.classList.remove(validateSettings.invalidInputClass);
  } else if (popup === popupAddPlace) {
    closePopup(popupAddPlace);
    namePicInput.value = "";
    urlPicInput.value = "";
    namePicInput.classList.remove(validateSettings.invalidInputClass);
    urlPicInput.classList.remove(validateSettings.invalidInputClass);
    hideErrors(errorListAddPlace);
  } else if (popup === popupImage) {
    closePopup(popupImage);
  }
}

//Функция закрытия модального окна по клавише ESC
function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    popupList.forEach((popupElement) => {
      if (popupElement.classList.contains("popup_opened")) {
        checkClassPopup(popupElement);
      }
    });
  }
}

//Функция закрытия модального окна по нажатию вне формы
function closeOnOverlay(evt) {
  checkClassPopup(evt.target);
}

// Отправка формы Модального окна(редактировние профиля)
formPopupProfile.addEventListener("submit", handleProfileForm);

// Открытие Модального окна(редактировние профиля) по кнопке добавления
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutUInput.value = profileAboutU.textContent;
});

// Закрытие Модального окна(редактировние профиля) по крестику
buttonCloseEditProfile.addEventListener("click", () => {
  closePopup(popupEditProfile);
  hideErrors(errorListEditProfile);
  nameInput.classList.remove(validateSettings.invalidInputClass);
  aboutUInput.classList.remove(validateSettings.invalidInputClass);
});

// Отправка формы Модального окна(добавление карточек)
formPopupAddPlace.addEventListener("submit", handleAddPlaceForm);

// Открытие Модального окна(добавление карточек) по кнопке добавления
buttonAddPlace.addEventListener("click", () => openPopup(popupAddPlace));

// Закрытие Модального окна(добавление карточек) по крестику
buttonCloseAddPlace.addEventListener("click", () => {
  closePopup(popupAddPlace);
  namePicInput.value = "";
  urlPicInput.value = "";
  namePicInput.classList.remove(validateSettings.invalidInputClass);
  urlPicInput.classList.remove(validateSettings.invalidInputClass);
  hideErrors(errorListAddPlace);
});

// Закрытие Модального окна(Карточка на весь экран) по крестику
buttonCloseImage.addEventListener("click", () => closePopup(popupImage));

enableValidate(validateSettings);
