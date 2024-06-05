//импорты
import './pages/index.css';
import './api.js';

import { enableValidation, clearValidation } from './validation.js';
import { promises, addCard, newUserData, deleteCard, putLike, deleteLike, changeAvatar } from './api.js';

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
const avatarForm = document.forms["edit-avatar"]
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const cardName = cardForm.querySelector('.popup__input_type_card-name');
const cardLink = cardForm.querySelector('.popup__input_type_url');
const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.places__list');
const profileImg = document.querySelector('.profile__image');
const profileImgContainer = document.querySelector('.edit-logo');
const popUpNewAvatar = document.querySelector('.popup_profile__image');
const avatarLink = avatarForm.querySelector('.popup__input_type_avatar')

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
// функция уведомления об отправке данных
function loadingActive (form){
  const submitButton = form.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...'
}

function loadingDisabled (form){
  const submitButton = form.querySelector('.popup__button');
  submitButton.textContent = 'Сохранить'
}

// функции сабмита
function handleProfileFormSubmit(evt, form) {
  evt.preventDefault();
  loadingActive(form);
  
  newUserData({name: nameInput.value, about: jobInput.value})
    .then(userInfo => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(popUpEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => loadingDisabled(form))
}

function handleFormSubmitCard(evt, form) {
  evt.preventDefault();
  loadingActive(form);

  const newcardData = {
    name: cardName.value,
    link: cardLink.value,
    alt: cardName.value,
  };

  addCard(newcardData)
    .then((res) => {
      const cardData = {
        name: res.name,
        link: res.link,
        alt: res.name,
        id: res._id,
        ownerID: res.owner._id,
        likesData: res.likes,
      }
      const cardElement = createCard(cardData, cardData.ownerID, openImageFunction, deleteCard, putLike, deleteLike);
      cardList.prepend(cardElement);
      cardForm.reset();
  })
    .finally(() => loadingDisabled(form));

  closeModal(popUpNewCard);
}

function handleFormSubmitAvatar(evt, form) {
  evt.preventDefault();
  loadingActive(form)

  const newAvatarLink = avatarLink.value;

  changeAvatar(newAvatarLink)
    .then(() => {
      profileImg.src = newAvatarLink;
      closeModal(popUpNewAvatar);
    })
    .finally(() => loadingDisabled(form))
    form.reset();
}

// функция открытия попапа для обновления аватара
function openAvatarPopUp () {
  openModal(popUpNewAvatar);
  clearValidation(popUpNewAvatar, validationSettings);
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
cardForm.addEventListener('submit', (evt) => handleFormSubmitCard(evt, cardForm)); 
profileForm.addEventListener('submit', (evt) => handleProfileFormSubmit(evt, profileForm));
avatarForm.addEventListener('submit', (evt) => handleFormSubmitAvatar(evt, avatarForm));


// функции-обработчики событий открытия
profileAddButton.addEventListener('click', openAddPopUp);
profileEditButton.addEventListener('click', openEditPopUp);
profileImgContainer.addEventListener('click', openAvatarPopUp);

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
        avatar: user.avatar,
      }
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImg.src = userData.avatar;

      cards.forEach((card) => {
        const data = {
          name: card.name,
          link: card.link,
          alt: card.name,
          id: card._id,
          ownerID: card.owner._id,
          likesData: card.likes,
        }

        const cardElement = createCard(data, userData.id, openImageFunction, deleteCard, putLike, deleteLike);
        cardList.append(cardElement);
      })
    })
    .catch((err) => console.log(err))