export {
  apiConfig,
  getUserInfo,
  getCards,
  updateProfile,
  postNewCard,
  updateAvatar,
};

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "4fd1c26f-4164-41c7-8432-aa02590be211",
    "Content-Type": "application/json",
  },
};

function getUserInfo() {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function getCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function updateProfile(name, about) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function postNewCard(name, link) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function updateAvatar(avatarUrl) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
