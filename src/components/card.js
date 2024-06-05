// переменные
const cardTemplate = document.querySelector('#card-template').content;

// отправка на сервер состояния лайка
function changeLikeStatus (cardData, button, putLike, deleteLike, likeButton, likeValue) {
  if (button.classList.contains('card__like-button_is-active')) {
    deleteLike(cardData.id)
      .then(() => {
        likeButton.classList.remove('card__like-button_is-active');
        likeValue.textContent = cardData.likesData.length -= 1;
      })
      .catch((err) => console.log(err))
  } else if (!button.classList.contains('card__like-button_is-active')) {
    putLike(cardData.id)
      .then(() => {
        likeButton.classList.add('card__like-button_is-active');
        likeValue.textContent = cardData.likesData.length += 1;
      })
      .catch((err) => console.log(err))
  }
};

// функция обновления массива карточек
function refreshCards (button) {
  button.closest('.card').remove();
};

//функция удаления карточки 
function deleteThisCard (cardID, deleteCardFunc, button) {
  deleteCardFunc(cardID)
    .then(() => {
      refreshCards(button);
    })
    .catch((err) => console.log(err))
}

// функция создания новой карточки
export function createCard (cardData, userId, openFunc, deleteCard, putLike, deleteLike) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const deleteButton = cardTemplateClone.querySelector('.card__delete-button');
  const likeButton = cardTemplateClone.querySelector('.card__like-button');
  const imageToOpen = cardTemplateClone.querySelector('.card__image');
  const likeValue = cardTemplateClone.querySelector('.like-button-value')
  const imageTitle = cardTemplateClone.querySelector('.card__title').textContent = cardData.name;
  imageToOpen.src = cardData.link;
  imageToOpen.alt = cardData.name;
    likeValue.textContent = cardData.likesData.length;
    cardData.likesData.forEach(likeId => {
      if (userId !== likeId['_id']) {
        likeButton.classList.remove('card__like-button_is-active');
      } else {
        likeButton.classList.add('card__like-button_is-active');
      }
    })

  if (cardData.ownerID !== userId) {
    deleteButton.classList.add('card__delete-button-hidden')
  } else {
    deleteButton.classList.remove('card__delete-button-hidden')
    deleteButton.addEventListener('click', () => deleteThisCard(cardData.id, deleteCard, deleteButton))
  }
  
  likeButton.addEventListener('click', () => { changeLikeStatus(cardData, likeButton, putLike, deleteLike, likeButton, likeValue) });
  imageToOpen.addEventListener('click', () => { openFunc(cardData) });

  return cardTemplateClone;
};
