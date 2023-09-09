// fetch('https://nomoreparties.co/v1/wbf-cohort-12', {
//     headers: {
//        authorization: 'e85e6001-6fbf-4aaa-b4c1-c70dfc51e061'
//     }
// })
// .then((res) => res.json())
// .then((result) => console.log(result))

const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-12",
  headers: {
    authorization: "e85e6001-6fbf-4aaa-b4c1-c70dfc51e061",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

export function getUserProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function updateUserProfile(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(checkResponse);
}

export function updateAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(checkResponse);
}

export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(checkResponse);
}

export function putLike(id, likeList){
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "PUT",
    body: JSON.stringify({
      likes: likeList,
    }),
  }).then(checkResponse);
}

export function deleteLike(id, likeList){
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "DELETE",
    body: JSON.stringify({
      likes: likeList,
    }),
  }).then(checkResponse);
}