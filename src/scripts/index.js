import "./../pages/index.css";

// import { initialCards } from "./data.js";
import createElements from "./card.js";
import { addElements, handleSubmit } from "./utils.js";
import { closePopup, openPopup } from "./modal.js";
import {
  enableButton,
  enableValidate,
  removeInputError,
} from "./validate.js";
import {
  getInitialCards,
  getUserProfile,
  addNewCard,
  updateUserProfile,
  updateAvatar,
} from "./api";
import {
  aboutUInput,
  buttonAddPlace,
  buttonEditAvatar,
  buttonEditProfile,
  closeButtons,
  formPopupAddPlace,
  formPopupAvatar,
  formPopupProfile,
  nameInput,
  namePicInput,
  popupAddPlace,
  popupAvatar,
  popupEditProfile,
  profileAboutU,
  profileAvatar,
  profileName,
  submitEditProfile,
  urlAvataInput,
  urlPicInput,
  validateSettings,
} from "./constants";

//Сюда записывается id пользователя
export let userId = "";

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
  const userInfo = {
    name: nameInput.value,
    about: aboutUInput.value,
  };
  function makeRequest() {
    return updateUserProfile(userInfo).then((res) => {
      addProfileInfo(res);
      closePopup(popupEditProfile);
    });
  }
  handleSubmit(makeRequest, evt);
}

//Функция обработки формы добавления карточки
function handleAddPlaceForm(evt) {
  const dataCard = {
    name: namePicInput.value,
    link: urlPicInput.value,
  };
  function makeRequest() {
    return addNewCard(dataCard).then((res) => {
      addElements(createElements(res));
      closePopup(popupAddPlace);
    });
  }
  handleSubmit(makeRequest, evt, "Создание...");
}
//Функция обработки формы добавления карточки
function handleAvatarForm(evt) {
  const link = urlAvataInput.value;
  function makeRequest() {
    return updateAvatar(link).then((res) => {
      addAvatar(res);
      closePopup(popupAvatar);
    });
  }
  handleSubmit(makeRequest, evt);
}

// Отправка формы Модального окна(редактировние профиля)
formPopupProfile.addEventListener("submit", handleProfileForm);

// Открытие Модального окна(редактировние профиля) по кнопке редактирования
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutUInput.value = profileAboutU.textContent;
  removeInputError(nameInput, validateSettings);
  removeInputError(aboutUInput, validateSettings);
  enableButton(submitEditProfile);
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

Promise.all([getUserProfile(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    addProfileInfo(userData);
    addAvatar(userData);
    cards.forEach((el) => {
      const newCard = createElements(el);
      addElements(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
