import "./../pages/index.css";

// import { initialCards } from "./data.js";
import createElements from "./card.js";
import { addElements, loadingProcess } from "./utils.js";
import { closePopup, openPopup } from "./modal.js";
import enableValidate from "./validate.js";
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
  submitAddPlace,
  submitAvatar,
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
//Функция обработки текста кнопки submit при загрузке
function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}
//Универсальная функция по созданию обработчиков форм
function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const buttonText = submitButton.textContent;
  renderLoading(true, submitButton, buttonText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, submitButton, buttonText));
}
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
  function profileRequest() {
    return updateUserProfile(userInfo).then((res) => {
      addProfileInfo(res);
      closePopup(popupEditProfile);
    });
  }
  handleSubmit(profileRequest, evt);
}

//Функция обработки формы добавления карточки
function handleAddPlaceForm(evt) {
  const dataCard = {
    name: namePicInput.value,
    link: urlPicInput.value,
  };
  function cardRequest() {
    return addNewCard(dataCard).then((res) => {
      addElements(createElements(res));
      closePopup(popupAddPlace);
    });
  }
  handleSubmit(cardRequest, evt, "Создание...");
}
//Функция обработки формы добавления карточки
function handleAvatarForm(evt) {
  const link = urlAvataInput.value;
  function avatarRequest() {
    return updateAvatar(link).then((res) => {
      addAvatar(res);
      closePopup(popupAvatar);
    });
  }
  handleSubmit(avatarRequest, evt);
}
//Функция удаления еррора валидации
function hideErrors(errorList) {
  errorList.forEach((error) => (error.textContent = ""));
}
//Функция проверяет какое модальное окно открыто
export function checkClassPopup(popup) {
  if (popup.classList.contains("popup")) {
    closePopup(popup);
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

Promise.all([getUserProfile(), getInitialCards()])
  .then(([userData, cards]) => {
    console.log(userData);
    userId = userData._id;
    addProfileInfo(userData);
    addAvatar(userData);
    console.log(cards);
    cards.forEach((el) => {
      const newCard = createElements(el);
      addElements(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
