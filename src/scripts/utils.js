import { elementsList } from "./constants";

//Функция добавления карточек на сайт
export function addElements(el) {
    elementsList.prepend(el);
  }

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
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
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