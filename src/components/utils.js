// функция уведомления об отправке данных
export function loadingActive (form){
  const submitButton = form.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...'
}

export function loadingDisabled (form){
  const submitButton = form.querySelector('.popup__button');
  submitButton.textContent = 'Сохранить'
}