const cardTemplate = document.querySelector("#card-template").content;

function createCard(addCard, deleteCard, likeCard, openImagePopup) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = addCard.link;
  cardImage.alt = addCard.name;
  cardTitle.textContent = addCard.name;

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton);
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(addCard.link, addCard.name);
  });

  return cardElement;
}

function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

function deleteCard(card) {
  card.remove();
}

export { createCard, likeCard, deleteCard, cardTemplate };
