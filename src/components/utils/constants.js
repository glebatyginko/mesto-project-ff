const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

const profileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const avatarForm = document.forms["edit-avatar"];

const nameNewPlaceInput = newPlaceForm.elements["place-name"];
const linkNewPlaceInput = newPlaceForm.elements.link;
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const avatarInput = avatarForm.elements["avatar-url"];

const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar");

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const popupCloseButtons = document.querySelectorAll(".popup__close");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const profileFormSubmitButton = profileForm.querySelector(".popup__button");
const newPlaceFormSubmitButton = newPlaceForm.querySelector(".popup__button");
const avatarFormSubmitButton = avatarForm.querySelector(".popup__button");

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

export {
  cardTemplate,
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
  apiConfig,
  endpoint,
  profileFormSubmitButton,
  newPlaceFormSubmitButton,
  avatarFormSubmitButton
};
