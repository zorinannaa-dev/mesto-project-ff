const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: 'f0f442f2-481b-4d69-9a09-05e5858c3897',
    'Content-Type': 'application/json'
  }
}

// функция проверки статуса ответа сервера
function serverStatus (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// функция получения массива карточек
function getCardsList () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }) 
  .then(res => serverStatus(res))
};

// функция получения данных пользователя
function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }) 
  .then(res => serverStatus(res))
};

// Создаём массив с промисами
export const promises = [getCardsList(), getUserInfo()]

// запрос на редактирование профиля
export function newUserData ({name, about}) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
    })
    .then(res => serverStatus(res))
}

  // запрос на добавление новой карточки
export function addCard ({name, link}) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
      alt: name,
    })
  })
  .then(res => serverStatus(res))
}

// запрос на удаление карточки
export function deleteCard (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => serverStatus(res))
}

// запрос на постановку лайка 
export function putLike (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => serverStatus(res))
}

// запрос на удаления отметки лайка
export function deleteLike (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => serverStatus(res))
}

// запрос на обновленине аватарки
export function changeAvatar (link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
  .then(res => serverStatus(res))
}