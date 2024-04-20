// в файле index.js описана инициализация приложения и основная логика страницы: 
// поиск DOM-элементов на странице и навешивание на них обработчиков событий; 
// обработчики отправки форм, 
// функция-обработчик события открытия модального окна для редактирования профиля; 
// функция открытия модального окна изображения карточки. 
// Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.

//импорты
import './pages/index.css';

import { cardList, deleteCard, createCard, likeButtonFunction } from './components/card.js';
import { initialCards } from './cards.js'
import { openModal, closeModal } from './components/modal.js'

// переменные
const popUpTypeImage = document.querySelector('.popup_type_image');
const titleForImage = document.querySelector('.popup__caption');
const popUpImage = document.querySelector('.popup__image');
const popUpEdit = document.querySelector('.popup_type_edit');
const allPopUps = document.querySelectorAll('.popup');
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

// загрузка карточек на страницу
function renderCard(method = "append") {
  initialCards.forEach((item) => {
  const cardElement = createCard(item, openImageFunction);
  cardList[ method ](cardElement);
  } )
}
renderCard();

// добавление плавности
allPopUps.forEach((item) => {
  item.classList.add('popup_is-animated');
});

// работа со всплывающими окнами
// функции сабмита
function handleProfileFormSubmit(evt) {
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
    alt: cardName.value,
  };

  const cardElement = createCard(newcardData, openImageFunction);
  cardList.prepend(cardElement);
  cardForm.reset();

  closeModal(popUpNewCard);
}

// функция открытия попапа для создания карточки
function openAddPopUp () {
  openModal(popUpNewCard);
}

// функция открытия попапа для редактирования профиля
function openEditPopUp (){
  openModal(popUpEdit);

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
profileAddButton.addEventListener('click', openAddPopUp );
profileEditButton.addEventListener('click', openEditPopUp );

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
