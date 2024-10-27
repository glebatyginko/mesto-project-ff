import { openPopup, closePopup, handleOverlayClick } from "../components/modal";
import { enableValidation, clearValidation } from "../components/validation";
import { createCard, likeCard, deleteCard } from "../components/card";
import {
  getUserInfo,
  getCards,
  updateProfile,
  postNewCard,
  updateAvatar,
} from "../components/api";
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
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms["edit-avatar"];
const avatarInput = avatarForm.elements["avatar-url"];
const profileEditIcon = document.querySelector(".profile__edit-icon");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function addCards(cards, userId) {
  cards.forEach((card) => {
    const cardItem = createCard(
      card,
      deleteCard,
      likeCard,
      openImagePopup,
      userId
    );
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
  const submitButton = editForm.querySelector(".popup__button");
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  renderLoading(true, submitButton);
  updateProfile(nameValue, jobValue)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

function submitNewCard(evt) {
  evt.preventDefault();
  const submitButton = newPlaceForm.querySelector(".popup__button");
  renderLoading(true, submitButton);
  const nameValue = nameNewPlaceInput.value;
  const linkValue = linkNewPlaceInput.value;
  postNewCard(nameValue, linkValue)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        deleteCard,
        likeCard,
        openImagePopup
      );
      cardList.prepend(newCard);
      closePopup(popupTypeNewCard);
      newPlaceForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector(".popup__button");
  const avatarUrl = avatarInput.value;
  renderLoading(true, submitButton);
  updateAvatar(avatarUrl)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      avatarForm.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

buttonProfileEdit.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  clearValidation(editForm, validationConfig);
  openPopup(popupTypeEdit);
});

buttonProfileAdd.addEventListener("click", () => {
  clearValidation(newPlaceForm, validationConfig);
  openPopup(popupTypeNewCard);
});

editForm.addEventListener("submit", handleFormSubmit);

newPlaceForm.addEventListener("submit", submitNewCard);

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

profileEditIcon.addEventListener("click", () => {
  openPopup(popupAvatar);
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

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cards]) => {
    const userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    addCards(cards, userId);
  })
  .catch((err) => {
    console.log(err);
  });
