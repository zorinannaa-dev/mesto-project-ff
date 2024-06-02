//импорты
import './pages/index.css';
import './api.js';

import { enableValidation, clearValidation } from './validation.js';
import { promises, addCard, newUserData, deleteCard } from './api.js';

import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// переменные
const popUpTypeImage = document.querySelector('.popup_type_image');
const titleForImage = document.querySelector('.popup__caption');
const popUpImage = document.querySelector('.popup__image');
const popUpEdit = document.querySelector('.popup_type_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const cardName = cardForm.querySelector('.popup__input_type_card-name');
const cardLink = cardForm.querySelector('.popup__input_type_url');
const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.places__list');

// настройки валидации 
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// вызов валидации форм
enableValidation(validationSettings); 

// добавление плавности
popups.forEach((item) => {
  item.classList.add('popup_is-animated');
});

// работа со всплывающими окнами
// функции сабмита
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  newUserData({name: nameInput.value, about: jobInput.value})
    .then(userInfo => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(popUpEdit);
    })
    .catch((err) => console.log(err))
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const newcardData = {
    name: cardName.value,
    link: cardLink.value,
    alt: cardName.value,
  };

  addCard(newcardData);
  const cardElement = createCard(newcardData, openImageFunction);
  cardList.prepend(cardElement);
  cardForm.reset();

  closeModal(popUpNewCard);
}

// функция открытия попапа для создания карточки
function openAddPopUp () {
  openModal(popUpNewCard);
  clearValidation(popUpNewCard, validationSettings);
}

// функция открытия попапа для редактирования профиля
function openEditPopUp (){
  openModal(popUpEdit);
  clearValidation(popUpEdit, validationSettings);

  if ((nameInput.value !== null) && (jobInput.value !== null)) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
}

// функция открытия картинки
function openImageFunction (cardData) {
  openModal(popUpTypeImage);
  popUpImage.src = cardData.link;
  popUpImage.alt = cardData.name;
  titleForImage.textContent = cardData.name;
};

// глобальные слушатели
cardForm.addEventListener('submit', function(evt){ handleFormSubmitCard(evt) });
profileForm.addEventListener('submit', function(evt){ handleProfileFormSubmit(evt) });

// функции-обработчики событий открытия
profileAddButton.addEventListener('click', openAddPopUp);
profileEditButton.addEventListener('click', openEditPopUp);

// функции-обработчики событий закрытия
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closeModal(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closeModal(popup)
        }
        if (evt.target.classList.contains('popup')) {
          closeModal(popup)
        }
    })
})

// Передаём массив с промисами методу Promise.all
Promise.all(promises)
    .then(([cards, user]) => {
      let userData = {
        name: user.name,
        about: user.about,
        id: user._id,
      }
      newUserData(userData.name, userData.about);
      cards.forEach((card) => {
        
        const likesData = card.likes

        const data = {
          name: card.name,
          link: card.link,
          alt: card.name,
          id: card._id,
          ownerID: card.owner._id,
        }

        const cardElement = createCard(data, userData.id, data.ownerID, openImageFunction, deleteCard, likesData);
        cardList.append(cardElement);
      })

    })
    .catch((err) => console.log(err))