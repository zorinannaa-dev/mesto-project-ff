// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function deleteCard (evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.card').remove();
};

function createCard (cardData, deleteFunc) {
    const cardTemplateClone = cardTemplate.cloneNode(true);
    cardTemplateClone.querySelector('.card__image').src = cardData.link;
    cardTemplateClone.querySelector('.card__title').textContent = cardData.name;
    const deleteButton = cardTemplateClone.querySelector('.card__delete-button');
  
    deleteButton.addEventListener('click', deleteCard);
  
    return cardTemplateClone;
};

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardList.append(cardElement);
});