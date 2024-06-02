// переменные
const cardTemplate = document.querySelector('#card-template').content;

// функция отображения количества лайков
function countLikes (value, data) {
  if (value !== null) {
    value.textContent = data.length
  }
}

// функция лайка
function likeButtonFunction (evt) {
  const buttonTarget = evt.target;
  buttonTarget.classList.toggle('card__like-button_is-active');
};

// функция создания новой карточки
export function createCard (cardData, userId, cardOwnerId, openFunc, deleteCard, likesData) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const deleteButton = cardTemplateClone.querySelector('.card__delete-button');
  const likeButton = cardTemplateClone.querySelector('.card__like-button');
  const imageToOpen = cardTemplateClone.querySelector('.card__image');
  const likeValue = cardTemplateClone.querySelector('.like-button-value')
  const imageTitle = cardTemplateClone.querySelector('.card__title').textContent = cardData.name;
  imageToOpen.src = cardData.link;
  imageToOpen.alt = cardData.name;

  if (cardOwnerId !== userId) {
    deleteButton.classList.add('card__delete-button-hidden')
  } else {
    deleteButton.classList.remove('card__delete-button-hidden')
    deleteButton.addEventListener('click', () => deleteCard(cardData.id))
  }
  
  likeButton.addEventListener('click', likeButtonFunction);
  imageToOpen.addEventListener('click', () => {openFunc(cardData)});


  
  countLikes(likeValue, likesData)
  return cardTemplateClone;
};
