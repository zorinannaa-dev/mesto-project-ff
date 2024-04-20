// переменные
export const cardTemplate = document.querySelector('#card-template').content;
export const cardList = document.querySelector('.places__list');

// функция удаления карточки
export function deleteCard (evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.card').remove();
};

// функция лайка
export function likeButtonFunction (evt) {
  const buttonTarget = evt.target;
  buttonTarget.classList.toggle('card__like-button_is-active');
};

// функция создания новой карточки
export function createCard (cardData, openFunc) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const deleteButton = cardTemplateClone.querySelector('.card__delete-button');
  const likeButton = cardTemplateClone.querySelector('.card__like-button');
  const imageToOpen = cardTemplateClone.querySelector('.card__image');
  const imageTitle = cardTemplateClone.querySelector('.card__title').textContent = cardData.name;
  imageToOpen.src = cardData.link;
  imageToOpen.alt = cardData.name;
  
  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeButtonFunction);
  imageToOpen.addEventListener('click', () => {openFunc(cardData)});
  
  return cardTemplateClone;
};
