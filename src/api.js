const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: 'f0f442f2-481b-4d69-9a09-05e5858c3897',
    'Content-Type': 'application/json'
  }
}

// функция получения массива карточек
export function getCardsList () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }) 
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// функция получения данных пользователя
export function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }) 
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Создаём массив с промисами
export const promises = [getCardsList(), getUserInfo()]

// запрос на редактирование профиля
export function newUserData (name, job) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => console.log(res))
    .catch((err) => console.log(err))
}

  // запрос на добавление новой карточки
export function addCard ({name, link}) {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
      alt: name,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => console.log(err))
}
