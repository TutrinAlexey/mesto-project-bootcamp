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
    "Content-Type": "aplication.json",
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
  })
    .then(checkResponse)
}

export function getUserProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function saveUserProfile(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    }),
  }).then(checkResponse);
}
