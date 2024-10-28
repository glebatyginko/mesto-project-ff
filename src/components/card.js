import { toggleLikeCard, deleteCardRequest } from "../components/api";
import { cardTemplate } from "../pages";

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

  if (addCard.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", (evt) => {
    likeCard(evt, cardLikeCount, addCard._id);
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(addCard.link, addCard.name);
  });

  return cardElement;
}

function likeCard(evt, likeCountElement, cardId) {
  toggleLikeCard(
    cardId,
    evt.target.classList.contains("card__like-button_is-active")
  )
    .then((cardData) => {
      likeCountElement.textContent = cardData.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCard(card, cardId) {
  deleteCardRequest(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, likeCard, deleteCard, cardTemplate };
