(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function o(e){e.target===e.currentTarget&&t(e.currentTarget)}function r(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.textContent="",o.classList.remove(n.errorClass)}function c(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function a(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){r(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);n.classList.add(t.inactiveButtonClass),n.disabled=!0}var i={baseUrl:"https://nomoreparties.co/v1/wff-cohort-24",headers:{authorization:"4fd1c26f-4164-41c7-8432-aa02590be211","Content-Type":"application/json"}},u=document.querySelector("#card-template").content;function l(e,t,n,o,r){var c=u.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),l=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-count");return a.src=e.link,a.alt=e.name,i.textContent=e.name,d.textContent=e.likes.length,e.owner._id!==r?l.remove():l.addEventListener("click",(function(){t(c,e._id)})),s.addEventListener("click",(function(){n(s,d,e._id)})),a.addEventListener("click",(function(){o(e.link,e.name)})),c}function s(e,t,n){var o=e.classList.contains("card__like-button_is-active");fetch("".concat(i.baseUrl,"/cards/likes/").concat(n),{method:o?"DELETE":"PUT",headers:i.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(n){t.textContent=n.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function d(e,t){fetch("".concat(i.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:i.headers}).then((function(t){return t.ok?(e.remove(),t.json()):Promise.reject("Ошибка: ".concat(t.status))})).catch((function(e){console.log(e)}))}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var p=document.querySelector(".places__list"),m=document.forms["new-place"],_=m.elements["place-name"],y=m.elements.link,v=document.querySelectorAll(".popup"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_image"),q=b.querySelector(".popup__image"),g=b.querySelector(".popup__caption"),k=document.querySelectorAll(".popup__close"),E=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__add-button"),L=document.forms["edit-profile"],j=L.elements.name,A=L.elements.description,x=document.querySelector(".popup_type_avatar"),P=document.forms["edit-avatar"],T=P.elements["avatar-url"],U=document.querySelector(".profile__edit-icon"),w=document.querySelector(".profile__title"),B=document.querySelector(".profile__description"),O=document.querySelector(".profile__image"),D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function I(t,n){q.src=t,q.alt=n,g.textContent=n,e(b)}function M(e,t){t.textContent=e?"Сохранение...":"Сохранить"}E.addEventListener("click",(function(){j.value=document.querySelector(".profile__title").textContent,A.value=document.querySelector(".profile__description").textContent,a(L,D),e(h)})),C.addEventListener("click",(function(){a(m,D),e(S)})),L.addEventListener("submit",(function(e){e.preventDefault();var n,o,r=L.querySelector(".popup__button"),c=j.value,a=A.value;M(!0,r),(n=c,o=a,fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:n,about:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){w.textContent=e.name,B.textContent=e.about,t(h)})).catch((function(e){console.log(e)})).finally((function(){M(!1,r)}))})),m.addEventListener("submit",(function(e){e.preventDefault();var n,o,r=m.querySelector(".popup__button");M(!0,r),(n=_.value,o=y.value,fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var n=l(e,d,s,I);p.prepend(n),t(S),m.reset()})).catch((function(e){console.log(e)})).finally((function(){M(!1,r)}))})),P.addEventListener("submit",(function(e){e.preventDefault();var n=P.querySelector(".popup__button"),o=T.value;M(!0,n),function(e){return fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(o).then((function(e){O.style.backgroundImage="url(".concat(e.avatar,")"),P.reset(),t(x)})).catch((function(e){console.log(e)})).finally((function(){M(!1,n)}))})),U.addEventListener("click",(function(){e(x)})),k.forEach((function(e){e.addEventListener("click",(function(){t(e.closest(".popup"))}))})),v.forEach((function(e){e.addEventListener("click",o)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);c(n,o,t),n.forEach((function(a){a.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?r(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,a,t),c(n,o,t)}))}))}(t,e)}))}(D),Promise.all([fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1],a=r._id;w.textContent=r.name,B.textContent=r.about,O.style.backgroundImage="url(".concat(r.avatar,")"),function(e,t){e.forEach((function(e){var n=l(e,d,s,I,t);p.append(n)}))}(c,a)})).catch((function(e){console.log(e)}))})();