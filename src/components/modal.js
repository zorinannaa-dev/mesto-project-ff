// функции открытия, закрытия и обработчика клика по escape
function closePopUpByKey (evt, popUp){
    if (evt.key === 'Escape') {
      closeModal(popUp);
    }  
}

export function openModal (popUp) {
  popUp.classList.add('popup_is-opened');
  document.addEventListener('keydown', function(evt){ closePopUpByKey(evt, popUp) })
}

export function closeModal (popUp) {
  popUp.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopUpByKey);
}

export function addEventListenerByClick (smth){
  smth.addEventListener('click', function(evt){
    if (
      (evt.target.classList.contains('popup__close')) || 
      (evt.target.classList.contains('popup_type_edit')) || 
      (evt.target.classList.contains('popup_type_new-card')) || 
      (evt.target.classList.contains('popup_type_image')) ) {
        closeModal(smth);
    }
})
}

