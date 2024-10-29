import { request } from "./utils/utils";
import { endpoint } from "./utils/constants";

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
  getUserInfo,
  getCards,
  updateProfile,
  postNewCard,
  updateAvatar,
  toggleLikeCard,
  deleteCardRequest,
};
