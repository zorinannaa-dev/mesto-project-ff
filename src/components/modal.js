// функции открытия, закрытия и обработчика клика по escape
function closePopUpByKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

export function openModal (popUp) {
  popUp.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopUpByKey );
}

export function closeModal (popUp) {
  popUp.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopUpByKey);
}

