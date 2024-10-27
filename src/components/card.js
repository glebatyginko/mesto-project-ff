import { apiConfig } from "../components/api";
export { createCard, likeCard, deleteCard, cardTemplate };

const cardTemplate = document.querySelector("#card-template").content;

function createCard(addCard, deleteCard, likeCard, openImagePopup, userId) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = addCard.link;
  cardImage.alt = addCard.name;
  cardTitle.textContent = addCard.name;
  cardLikeCount.textContent = addCard.likes.length;

  if (addCard.owner._id !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(cardElement, addCard._id);
    });
  }

  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton, cardLikeCount, addCard._id);
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(addCard.link, addCard.name);
  });

  return cardElement;
}

function likeCard(button, likeCountElement, cardId) {
  const isLiked = button.classList.contains("card__like-button_is-active");
  fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cardData) => {
      likeCountElement.textContent = cardData.likes.length;
      button.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCard(card, cardId) {
  fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        card.remove();
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
