const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-12",
  headers: {
    authorization: "e85e6001-6fbf-4aaa-b4c1-c70dfc51e061",
    "Content-Type": "application/json",
  },
};

// const apiSettings = {
//   initialCards: {
//     url: `${config.baseUrl}/cards`,
//     options: {
//       headers: config.headers,
//     },
//   },
//   getUserProfile: {
//     url: `${config.baseUrl}/users/me`,
//     options: {
//       headers: config.headers,
//     },
//   },
//   newCard: {
//     url: `${config.baseUrl}/cards`,
//     options: {
//       headers: config.headers,
//       method: "POST",
//       body: JSON.stringify({
//         name: dataCard.name,
//         link: dataCard.link,
//       }),
//     },
//   },
//   updateUserProfile: {
//     url: `${config.baseUrl}/users/me`,
//     options: {
//       method: "PATCH",
//       headers: config.headers,
//       body: JSON.stringify({
//         name: data.name,
//         about: data.about,
//       }),
//     },
//   },
//   updateAvatar: {
//     url: `${config.baseUrl}/users/me/avatar`,
//     options: {
//       method: "PATCH",
//       headers: config.headers,
//       body: JSON.stringify({
//         avatar: link,
//       }),
//     },
//   },
//   deleteCard: {
//     url: `${config.baseUrl}/cards/${id}`,
//     options: {
//       headers: config.headers,
//       method: "DELETE",
//     },
//   },
//   putLike: {
//     url: `${config.baseUrl}/cards/likes/${id}`,
//     options: {
//       headers: config.headers,
//       method: "PUT",
//       body: JSON.stringify({
//         likes: likeList,
//       }),
//     },
//   },
//   deleteLike: {
//     url: `${config.baseUrl}/cards/likes/${id}`,
//     options: {
//       headers: config.headers,
//       method: "DELETE",
//       body: JSON.stringify({
//         likes: likeList,
//       }),
//     },
//   },
// };

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function configureFetch(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getInitialCards() {
  return configureFetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
}

export function getUserProfile() {
  return configureFetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
}

export function addNewCard(dataCard) {
  return configureFetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: dataCard.name,
      link: dataCard.link,
    }),
  });
}

export function updateUserProfile(data) {
  return configureFetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  });
}

export function updateAvatar(link) {
  return configureFetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  });
}

export function deleteCard(id) {
  return configureFetch(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,
    method: "DELETE",
  });
}

export function putLike(id, likeList) {
  return configureFetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "PUT",
    body: JSON.stringify({
      likes: likeList,
    }),
  });
}

export function deleteLike(id, likeList) {
  return configureFetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "DELETE",
    body: JSON.stringify({
      likes: likeList,
    }),
  });
}
