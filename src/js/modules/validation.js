import { apiRequest } from "./api.js";
import { detailsOfBook } from "./detailsOfBook.js";
import { getAllBooks } from "./getAllBooksRequest.js";
import { closeModalFunc } from "./modal.js";

const form = document.querySelector(".reusable__container");
const inputs = document.querySelectorAll(".reusable__input");
const confirmModalContainer = document.querySelector(".confirm__delete-modal");
const incorectLogin = document.querySelector(".errorTextForSignIn");
const errorForPassword = document.querySelectorAll(
  ".reusable__input-errorPassword"
);
const idOfProduct = JSON.parse(localStorage.getItem("idOfproduct"));

let dataToServer = null;

function inputValidationFunc() {
  const flag = [];
  inputs.forEach((input) => {
    if (input.value.trim().length == 0) {
      input.nextElementSibling.classList.add("reusable__input-error");
      flag.push(false);
    } else {
      input.nextElementSibling.classList.remove("reusable__input-error");
      flag.push(true);
    }
  });
  return flag.every((bool) => bool);
}

function getInputValueFunc() {
  Array.from(inputs).reduce((acc, item) => {
    if (item.name == "pagesNumber" || item.name == "publishYear") {
      acc[item.name] = +item.value;
    } else if (item.name == "genres") {
      acc[item.name] = [item.value];
    } else {
      acc[item.name] = item.value;
    }
    return (dataToServer = acc);
  }, {});
}

export function validation() {
  form &&
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      inputValidationFunc();

      let flag = false;
      if (window.location.href.includes("login.html")) {
        if (checkPassword()) {
          flag = true;
        } else {
          flag = false;
        }
      } else {
        flag = true;
      }

      if (inputValidationFunc() && flag) {
        // confirmModalContainer.classList.add("open__modal");
        getInputValueFunc();
        inputsRequest(dataToServer);

        // setTimeout(() => {
        // confirmModalContainer.classList.remove("open__modal");

        // }, 500);
      }
    });
}
async function inputsRequest(params) {
  let url = "login";
  let method = "POST";

  if (window.location.href.includes("login.html")) {
    url = "signin";
  }
  if (window.location.href.includes("home.html")) {
    url = "books/create";
  }
  if (window.location.href.includes("bookDetail.html")) {
    url = `books/update/${idOfProduct}`;
    method = "PUT";
  }

  const res = await apiRequest(url, method, params);

  if (typeof res == "string") {
    incorectLogin.classList.add("showErrorText");
  } else {
    incorectLogin?.classList.remove("showErrorText");
  }

  if (res) {
    if (
      window.location.href.includes("index.html") ||
      window.location.href.includes("login.html")
    ) {
      if (typeof res == "object") {
        localStorage.setItem("token", JSON.stringify(res.token));
        window.location.href = "./home.html";
      }
    } else if (window.location.href.includes("bookDetail.html")) {
      detailsOfBook();
      closeModalFunc();
    } else {
      closeModalFunc();
      getAllBooks();
    }
  }
}

function checkPassword() {
  if (inputValidationFunc()) {
    const tttt = Array.from(inputs)?.filter((item) => {
      if (item.type == "password") {
        return item;
      }
    });

    if (tttt[0].value === tttt[1].value) {
      errorForPassword.forEach((item) => {
        item.classList.remove("reusable__input-error");
      });
      return true;
    } else {
      tttt.forEach(() => {
        errorForPassword.forEach((item) => {
          item.classList.add("reusable__input-error");
        });
      });
      return false;
    }
  }
}

function clearInputFunc() {
  for (const el of inputs) {
    el.value = null;
  }
}

export function clearAllFunc() {
  clearInputFunc();
  inputs.forEach((input) => {
    input.nextElementSibling.classList.remove("reusable__input-error");
  });
}

const quitButton = document.querySelector(".quit__button");

quitButton?.addEventListener("click", () => {
  localStorage.removeItem("idOfproduct");
  localStorage.removeItem("token");
});

// function startLoading() {
// confirmModalContainer?.classList.add("open__modal");
// confirmModalContainer.innerHTML = "";
// confirmModalContainer?.innerHTML = `<img class="loadingData" src="./assets/loading.svg" alt="loading"></img>`;
// setTimeout(() => {
// confirmModalContainer?.classList.remove("open__modal");
// confirmModalContainer?.innerHTML = "";
// }, 1000);
// }
