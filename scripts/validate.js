//Функция появления ошибки после волидации
function addInputError(inputElement, errorMessage, settings) {
  const errorId = "error-" + inputElement.id;
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(settings.invalidInputClass);
}
//Функция удаления ошибки после волидации
function removeInputError(inputElement, settings) {
  const errorId = "error-" + inputElement.id;
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = "";
  inputElement.classList.remove(settings.invalidInputClass);
}
//Функция проверки инпута на валидность
function checkInput(inputElement, settings) {
  if (!inputElement.validity.valid) {
    addInputError(inputElement, inputElement.validationMessage, settings);
  } else {
    removeInputError(inputElement, settings);
  }
}
//Функция включения кнопки
function enableButton(buttonElement) {
  buttonElement.disabled = false;
}
//Функция отключения кнопки
function disableButton(buttonElement) {
  buttonElement.disabled = true;
}
//Функция проверка на наличие невалидных инпутов
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//Функция установки слушателей событий
function setEventListeners(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(settings.buttonSelector);
  inputList.forEach((inputElement) =>
    inputElement.addEventListener("input", () => {
      checkInput(inputElement, settings);
      checkButton(inputList, buttonElement);
    })
  );
}
//Функция включения валидации
export default function enableValidate(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, settings);
  });
}
//Функция переключения кнопки
function checkButton(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
}
