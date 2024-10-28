import { request } from "./utils/utils";

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "4fd1c26f-4164-41c7-8432-aa02590be211",
    "Content-Type": "application/json",
  },
};

const endpoint = {
  myUser: "/users/me",
  cards: "/cards",
  avatar: "/users/me/avatar",
  likes: "/cards/likes",
};

function getUserInfo() {
  return request(endpoint.myUser, "GET");
}

function getCards() {
  return request(endpoint.cards, "GET");
}

function updateProfile(name, about) {
  return request(endpoint.myUser, "PATCH", { name, about });
}

function postNewCard(name, link) {
  return request(endpoint.cards, "POST", { name, link });
}

function updateAvatar(avatarUrl) {
  return request(endpoint.avatar, "PATCH", { avatar: avatarUrl });
}

function likeCardRequest(id) {
  return request(`${endpoint.likes}/${id}`, "PUT");
}

function deleteLikeCardRequest(id) {
  return request(`${endpoint.likes}/${id}`, "DELETE");
}

function toggleLikeCard(id, isLiked) {
  return isLiked ? deleteLikeCardRequest(id) : likeCardRequest(id);
}

function deleteCardRequest(id) {
  return request(`${endpoint.cards}/${id}`, "DELETE");
}

export {
  apiConfig,
  getUserInfo,
  getCards,
  updateProfile,
  postNewCard,
  updateAvatar,
  toggleLikeCard,
  deleteCardRequest,
};
