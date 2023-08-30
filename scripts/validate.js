function addInputError(inputElement, errorMessage, settings) {
  const errorId = "error-" + inputElement.id;
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(settings.invalidInputClass);
}

function removeInputError(inputElement, settings) {
  const errorId = "error-" + inputElement.id;
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = "";
  inputElement.classList.remove(settings.invalidInputClass);
}

function checkInput(inputElement, settings) {
  if (!inputElement.validity.valid) {
    addInputError(inputElement, inputElement.validationMessage, settings);
  } else {
    removeInputError(inputElement, settings);
  }
}

function enableButton(buttonElement) {
  buttonElement.disabled = false;
}

function disableButton(buttonElement) {
  buttonElement.disabled = true;
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

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

export default function enableValidate(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, settings);
  });
}

function checkButton(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
}
