import { getBookDetailRequest } from "./detailsOfBook.js";

const idOfProduct = JSON.parse(localStorage.getItem("idOfproduct"));

const editInputValue = document.querySelectorAll(".edit__input");

export function uploadInputValue() {
  if (editInputValue && idOfProduct) {
    getBookDetailRequest().then((res) => {
      renderInputValueForEdit(res);
    });
  }
}

function renderInputValueForEdit(params) {
  for (let key in params) {
    editInputValue.forEach((el) => {
      if (el.name == key) {
        el.value = params[key];
      }
    });
  }
}
