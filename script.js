const elementsList = document.querySelector(".elements-grid__container");
const templateElement = document.querySelector(".template-element");
const element = templateElement.content.querySelector(".element");

const profileName = document.querySelector(".profile__name");
const profileAboutU = document.querySelector(".profile__about-you");
const buttonEditProfile = document.querySelector(".profile__button-edit");
const popupEditProfile = document.querySelector(".popup__edit-profile");
const formPopupProfile = popupEditProfile.querySelector(".popup__form");
const nameInput = formPopupProfile.querySelector("#popupNameProfile");
const aboutUInput = formPopupProfile.querySelector("#popupAboutUProfile");
const buttonCloseEditProfile = popupEditProfile.querySelector(
  ".popup__button-close"
);

const buttonAddPlace = document.querySelector(".profile__button-add");
const popupAddPlace = document.querySelector(".popup__add-place");
const formPopupAddPlace = popupAddPlace.querySelector(".popup__form");
const namePicInput = formPopupAddPlace.querySelector("#popupNamePic");
const urlPicInput = formPopupAddPlace.querySelector("#popupUrlPic");
const buttonCloseAddPlace = popupAddPlace.querySelector(".popup__button-close");

const popupImage = document.querySelector(".popup__open-image");
const buttonCloseImage = popupImage.querySelector(".popup__button-close");
const imageLink = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");

function openPopup(el) {
  el.classList.add("popup_opened");
}

function closePopup(el) {
  el.classList.remove("popup_opened");
}

function addProfileInfo(name, about) {
  profileName.textContent = name;
  profileAboutU.textContent = about;
}

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

function addElements(el) {
  elementsList.prepend(el);
}

initialCards.forEach((el) => {
  addElements(createElements(el.name, el.link));
});

function handleProfileForm(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = aboutUInput.value;
  addProfileInfo(name, about);
  closePopup(popupEditProfile);
}

function handleAddPlaceForm(evt) {
  evt.preventDefault();
  const name = namePicInput.value;
  const link = urlPicInput.value;
  addElements(createElements(name, link));
  namePicInput.value = "";
  urlPicInput.value = "";
  closePopup(popupAddPlace);
}

buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutUInput.value = profileAboutU.textContent;
});

formPopupProfile.addEventListener("submit", handleProfileForm);

buttonCloseEditProfile.addEventListener("click", () =>
  closePopup(popupEditProfile)
);

buttonAddPlace.addEventListener("click", () => openPopup(popupAddPlace));

formPopupAddPlace.addEventListener("submit", handleAddPlaceForm);

buttonCloseAddPlace.addEventListener("click", () => closePopup(popupAddPlace));

buttonCloseImage.addEventListener("click", () => closePopup(popupImage));
