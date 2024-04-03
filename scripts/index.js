// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function deleteCard (card) {
  const cardItem = document.querySelector('.card');

  cardItem.remove();
};

function showCard (cards, deleteFunc) {
  cards.forEach(function (item) {
    const cardTemplateClone = cardTemplate.cloneNode(true);
    cardTemplateClone.querySelector('.card__image').src = item.link;
    cardTemplateClone.querySelector('.card__title').textContent = item.name;
    const deleteButton = cardTemplateClone.querySelector('.card__delete-button');
  
    deleteButton.addEventListener('click', deleteFunc);
  
    cardList.append(cardTemplateClone);
    return cardList
  });
};

showCard(initialCards, deleteCard);
