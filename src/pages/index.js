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
import {
  cardList,
  profileForm,
  newPlaceForm,
  avatarForm,
  nameNewPlaceInput,
  linkNewPlaceInput,
  nameInput,
  jobInput,
  avatarInput,
  popups,
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
  popupAvatar,
  popupImage,
  popupCaption,
  popupCloseButtons,
  buttonProfileAdd,
  buttonProfileEdit,
  profileEditIcon,
  profileTitle,
  profileDescription,
  profileAvatar,
  validationConfig,
  profileFormSubmitButton,
  newPlaceFormSubmitButton,
  avatarFormSubmitButton
} from "../components/utils/constants.js";

let userId;

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  renderLoading(true, profileFormSubmitButton);
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
      renderLoading(false, profileFormSubmitButton);
    });
}

function submitNewCard(evt) {
  evt.preventDefault();
  renderLoading(true, newPlaceFormSubmitButton);
  const nameValue = nameNewPlaceInput.value;
  const linkValue = linkNewPlaceInput.value;
  postNewCard(nameValue, linkValue)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        deleteCard,
        likeCard,
        openImagePopup,
        userId
      );
      cardList.prepend(newCard);
      closePopup(popupTypeNewCard);
      newPlaceForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, newPlaceFormSubmitButton);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  renderLoading(true, avatarFormSubmitButton);
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
      renderLoading(false, avatarFormSubmitButton);
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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openPopup(popupTypeEdit);
});

buttonProfileAdd.addEventListener("click", () => {
  clearValidation(newPlaceForm, validationConfig);
  openPopup(popupTypeNewCard);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

newPlaceForm.addEventListener("submit", submitNewCard);

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

profileEditIcon.addEventListener("click", () => {
  openPopup(popupAvatar);
  clearValidation(avatarForm, validationConfig);
});

popupCloseButtons.forEach((button) => {
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
    userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    addCards(cards, userId);
  })
  .catch((err) => {
    console.log(err);
  });
