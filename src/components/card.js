//импорты 
import { openModal } from '../components/modal.js'
import { popUpImage, popUpTypeImage, titleForImage } from '../index.js'

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

// функция открытия картинки
export function openImageFunction (link, title) {
  openModal(popUpTypeImage);
  popUpImage.src = link;
  popUpImage.alt = title;
  titleForImage.textContent = title;
};

// функция создания новой карточки
export function createCard (cardData, deleteFunc, likeFunc, openFunc) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const deleteButton = cardTemplateClone.querySelector('.card__delete-button');
  const likeButton = cardTemplateClone.querySelector('.card__like-button');
  const imageToOpen = cardTemplateClone.querySelector('.card__image');
  const imageLink = cardTemplateClone.querySelector('.card__image').src  = cardData.link;
  const imageTitle = cardTemplateClone.querySelector('.card__title').textContent = cardData.name;
  
  deleteButton.addEventListener('click', deleteFunc);
  likeButton.addEventListener('click', likeFunc);
  imageToOpen.addEventListener('click', () => {openFunc(imageLink, imageTitle)});
  
  return cardTemplateClone;
};
