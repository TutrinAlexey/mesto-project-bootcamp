import "./../pages/index.css";

// import { initialCards } from "./data.js";
import createElements from "./card.js";
import { addElements } from "./utils.js";
import { closePopup, openPopup } from "./modal.js";
import enableValidate from "./validate.js";
import {
  getInitialCards,
  getUserProfile,
  addNewCard,
  updateUserProfile,
  updateAvatar,
} from "./api";

//Настройки валидации
const validateSettings = {
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

//Попап добавление карточек
const buttonAddPlace = document.querySelector(".profile__button-add");
export const popupAddPlace = document.querySelector(".popup__add-place");
const formPopupAddPlace = popupAddPlace.querySelector(".popup__form");
const namePicInput = formPopupAddPlace.querySelector("#titlePic");
const urlPicInput = formPopupAddPlace.querySelector("#urlPic");
const submitAddPlace = formPopupAddPlace.querySelector(".popup__button-submit");

//Попап картинки
export const popupImage = document.querySelector(".popup__open-image");
export const imageLink = popupImage.querySelector(".popup__image");
export const imageCaption = popupImage.querySelector(".popup__caption");
export const popupList = Array.from(document.querySelectorAll(".popup"));

//Попап добавлеия карточек
const profileAvatar = document.querySelector(".profile__avatar");
const buttonEditAvatar = document.querySelector(".profile__img");
const popupAvatar = document.querySelector(".popup__edit-avatar");
const formPopupAvatar = popupAvatar.querySelector(".popup__form");
const urlAvataInput = formPopupAvatar.querySelector("#urlAvatar");
const submitAvatar = formPopupAvatar.querySelector(".popup__button-submit");

//Сюда записывается id пользователя
export let userId = "";

//Список кнопок закрывающих попап
const closeButtons = document.querySelectorAll(".popup__button-close");

//Список ерроров для формы(изменения профиля)
const errorListEditProfile = Array.from(
  popupEditProfile.querySelectorAll(".error_input-text")
);

//Функция добавления измененной информации в профиль
function addProfileInfo(res) {
  profileName.textContent = res.name;
  profileAboutU.textContent = res.about;
}
//Функция изменеия автарки профиля
function addAvatar(link) {
  profileAvatar.src = link.avatar;
}

//Функция обработки формы редактирования профиля
function handleProfileForm(evt) {
  evt.preventDefault();
  const userInfo = {
    name: nameInput.value,
    about: aboutUInput.value,
  };
  updateUserProfile(userInfo)
    .then((res) => {
      addProfileInfo(res);
      loadingProcess(popupEditProfile, "Сохранение...");
      setTimeout(() => closePopup(popupEditProfile), 500);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      setTimeout(
        () =>
          (popupEditProfile.querySelector(".popup__button-submit").textContent =
            "Сохранить"),
        500
      )
    );
}

//Функция проверки кто добавил карточку
export function checkOwnerOfCard(el, button) {
  if (el.owner._id === userId) {
    button.classList.remove("delete-button_disable");
  }
}

//Функция загрузки
function loadingProcess(popup, text) {
  const button = popup.querySelector(".popup__button-submit");
  button.textContent = text;
}

//Функция обработки формы добавления карточки
function handleAddPlaceForm(evt) {
  evt.preventDefault();
  const name = namePicInput.value;
  const link = urlPicInput.value;
  addNewCard(name, link)
    .then((res) => {
      addElements(createElements(res));
      loadingProcess(popupAddPlace, "Создание...");
      setTimeout(() => {
        closePopup(popupAddPlace);
        evt.target.reset();
        submitAddPlace.disabled = true;
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      setTimeout(
        () =>
          (popupAddPlace.querySelector(".popup__button-submit").textContent =
            "Создать"),
        500
      )
    );
}
//Функция обработки формы добавления карточки
function handleAvatarForm(evt) {
  evt.preventDefault();
  const link = urlAvataInput.value;
  updateAvatar(link)
    .then((res) => {
      addAvatar(res);
      loadingProcess(popupAvatar, "Сохранение...");
      setTimeout(() => {
        closePopup(popupAvatar);
        evt.target.reset();
        submitAvatar.disabled = true;
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      setTimeout(
        () =>
          (popupAvatar.querySelector(".popup__button-submit").textContent =
            "Сохранить"),
        500
      )
    );
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

// Отправка формы Модального окна(изменение аватарки)
formPopupAvatar.addEventListener("submit", handleAvatarForm);

// Открытие Модального окна(изменение аватарки) по нажаитю на аватарку
buttonEditAvatar.addEventListener("click", () => openPopup(popupAvatar));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

enableValidate(validateSettings);

getUserProfile()
  .then((res) => {
    userId = res._id;
    addProfileInfo(res);
    addAvatar(res);
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
  .then((res) => {
    res.forEach((el) => {
      const newCard = createElements(el);
      addElements(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
