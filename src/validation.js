// проверяет есть ли ошибка валидации хоть в одном инпуте
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
  });
};

// переключает класс ошибки в инпут
function inputErrorClassFunc (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    if (input.validity.valid) {
      hideInputError(formElement, input);
  } else {
      inputErrorMessage(formElement, input, input.validationMessage);
  }
  })
};

// прячет сообщение об ошибке
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error-messager`);

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("");
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.remove('popup__error_visible');
  } else if (inputElement.validity.valid){
    inputElement.setCustomValidity("");
    inputElement.classList.remove('popup__input_type_error');
  }
};

// показывает сообщения об ошибке
function inputErrorMessage (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement.textContent);
  
  if (!inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      inputElement.classList.add('popup__input_type_error');
      errorElement.classList.add('popup__error_visible');
    } else if (!inputElement.validity.valid) {
      inputElement.setCustomValidity("");
      inputElement.classList.add('popup__input_type_error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('popup__error_visible');
    }
};

// проверяет валидность формы
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    inputErrorClassFunc(formElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// регулирует активацию кнопки отправки формы
function inactiveButtonClassFunc (inputList, buttonElement, buttonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('enabled', '');
    buttonElement.classList.remove(buttonClass);
  } else {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(buttonClass);
  }
}

// добавляет слушатель на инпут и вешает коллбэк на проверку валидности формы
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      inactiveButtonClassFunc(inputList, buttonElement);
    });
  });
};

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export function enableValidation(){
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    }) 
    setEventListeners(formElement);
    })
  };

export function clearValidation(){};