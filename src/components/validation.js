// проверяет есть ли ошибка валидации хоть в одном инпуте
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// прячет сообщение об ошибке
function hideInputError (formElement, inputElement, inputError, errorVisible) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputError);
    errorElement.classList.remove(errorVisible);
    errorElement.textContent = '';
};

// показывает сообщения об ошибке
function showInputErrorMessage (formElement, inputElement, inputError, errorVisible, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputError);
  errorElement.classList.add(errorVisible);
  errorElement.textContent = errorMessage;
};

// регулирует активацию кнопки отправки формы
function toggleButtonFunc (inputList, buttonElement, buttonDisabled) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(buttonDisabled);
    } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(buttonDisabled);
  };
};

// проверяет валидность формы
function isValid (formElement, inputElement, inputError, errorVisible) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  };

  if (!inputElement.validity.valid) {
    showInputErrorMessage(formElement, inputElement, inputError, errorVisible, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement, inputError, errorVisible);
  };
};

// добавляет слушатель на инпут и вешает коллбэк на проверку валидности формы
function setEventListeners (formElement, popUpInput, button, buttonDisabled, inputError, errorVisible) {
  toggleButtonFunc(popUpInput, button, buttonDisabled);

  popUpInput.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputError, errorVisible);
      toggleButtonFunc(popUpInput, button, buttonDisabled);
    });
  });
};

// функция активации валидации
export function enableValidation(settings){
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    setEventListeners(formElement, inputList, buttonElement, settings.inactiveButtonClass, settings.inputErrorClass, settings.errorClass);
    })
  };

// функция очистки форм валидации
export function clearValidation(form, settings){
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));

  inputList.forEach((input) => {
    hideInputError (form, input, settings.inputErrorClass, settings.errorClass);
  });
  enableValidation(settings)
};
