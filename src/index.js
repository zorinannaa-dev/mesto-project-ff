// в файле index.js описана инициализация приложения и основная логика страницы: 
// поиск DOM-элементов на странице и навешивание на них обработчиков событий; 
// обработчики отправки форм, 
// функция-обработчик события открытия модального окна для редактирования профиля; 
// функция открытия модального окна изображения карточки. 
// Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.

//импорты
import './pages/index.css';

import { cardList, deleteCard, createCard, likeButtonFunction, openImageFunction } from './components/card.js';
import { initialCards } from './cards.js'
import { addEventListenerByClick, openModal, closeModal } from './components/modal.js'

// переменные
export const popUpTypeImage = document.querySelector('.popup_type_image');
export const titleForImage = document.querySelector('.popup__caption');
export const popUpImage = document.querySelector('.popup__image');
const popUpEdit = document.querySelector('.popup_type_edit');
const allPopUps = document.querySelectorAll('.popup');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelectorAll('form');
const formElementEdit = formElement[0];
const formElementNewPlace = formElement[1];
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');
const cardName = formElementNewPlace.querySelector('.popup__input_type_card-name');
const cardLink = formElementNewPlace.querySelector('.popup__input_type_url');


// загрузка карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, likeButtonFunction, openImageFunction);
  cardList.append(cardElement);
});

// добавление плавности
allPopUps.forEach((item) => {
  item.classList.add('popup_is-animated');
});

// работа со всплывающими окнами
// функции сабмита
function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeModal(popUpEdit);
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const newcardData = {
    name: cardName.value,
    link: cardLink.value,
  };

  const cardElement = createCard(newcardData, deleteCard, likeButtonFunction, openImageFunction);
  cardList.prepend(cardElement);

  closeModal(popUpNewCard);
}

// функция открытия попапа для создания карточки
function openAddPopUp () {
  openModal(popUpNewCard);
  formElementNewPlace.reset();
}

// функция открытия попапа для редактирования профиля
function openEditPopUp (){
  openModal(popUpEdit);
  formElementEdit.addEventListener('submit', function(evt){ handleFormSubmit(evt) });

  if ((nameInput.value !== null) && (jobInput.value !== null)) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }

}

// глобальные слушатели
formElementNewPlace.addEventListener('submit', function(evt){ handleFormSubmitCard(evt) });

// функции-обработчики событий открытия
profileAddButton.addEventListener('click', function(){ openAddPopUp() });
profileEditButton.addEventListener('click', function(){ openEditPopUp() });

// функции-обработчики событий закрытия
popUpEdit.addEventListener('click', addEventListenerByClick(popUpEdit) );
popUpNewCard.addEventListener('click', addEventListenerByClick(popUpNewCard) );
popUpTypeImage.addEventListener('click', addEventListenerByClick(popUpTypeImage) );