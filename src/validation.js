// проверяет есть ли ошибка валидации хоть в одном инпуте
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// прячет сообщение об ошибке
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};

// показывает сообщения об ошибке
function showInputErrorMessage (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__error_visible');
  errorElement.textContent = errorMessage;
};

// регулирует активацию кнопки отправки формы
function toggleButtonFunc (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
    } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  };
};

// проверяет валидность формы
function isValid (formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  };

  if (!inputElement.validity.valid) {
    showInputErrorMessage(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement);
  };
};

// добавляет слушатель на инпут и вешает коллбэк на проверку валидности формы
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonFunc(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonFunc(inputList, buttonElement);
    });
  });
};

// настройки валидации 
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// функция активации валидации
export function enableValidation(settings){
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
    })
  };

// функция очистки форм валидации
export function clearValidation(form, settings){
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));

  inputList.forEach((input) => {
    hideInputError (form, input);
  });
};
