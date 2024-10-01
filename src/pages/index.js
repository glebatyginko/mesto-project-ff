import { initialCards } from "../scripts/cards";
import {
  openPopup,
  closePopup,
  closeEsc,
  handleOverlayClick,
} from "../components/modal";
import { createCard, likeCard, deleteCard } from "../components/card";
import "./index.css";

const cardList = document.querySelector(".places__list");
const newPlaceForm = document.forms["new-place"];
const nameNewPlaceInput = newPlaceForm.elements["place-name"];
const linkNewPlaceInput = newPlaceForm.elements.link;
const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const buttonClose = document.querySelectorAll(".popup__close");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

function addCards(cards) {
  cards.forEach((card) => {
    const cardItem = createCard(card, deleteCard, likeCard, openImagePopup);
    cardList.append(cardItem);
  });
}

function openImagePopup(link, caption) {
  popupImage.src = link;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
  openPopup(popupTypeImage);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closePopup(popupTypeEdit);
}

function submitNewCard(evt) {
  evt.preventDefault();
  const nameValue = nameNewPlaceInput.value;
  const linkValue = linkNewPlaceInput.value;
  const newCard = createCard(
    { name: nameValue, link: linkValue },
    deleteCard,
    likeCard,
    openImagePopup
  );
  cardList.prepend(newCard);
  closePopup(popupTypeNewCard);
  newPlaceForm.reset();
}

buttonProfileEdit.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openPopup(popupTypeEdit);
});

buttonProfileAdd.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});

buttonClose.forEach((button) => {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});

editForm.addEventListener("submit", handleFormSubmit);

newPlaceForm.addEventListener("submit", submitNewCard);

addCards(initialCards);
