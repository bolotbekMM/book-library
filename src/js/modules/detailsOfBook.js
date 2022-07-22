import { apiRequest } from "./api.js";

const idOfProduct = JSON.parse(localStorage.getItem("idOfproduct"));

const nameOfBookElem = document.querySelector(".details__box-text-title h2");
const originalLanguageElem = document.querySelector(".originalLanguage");
const authorElem = document.querySelector(".details__box-text-title p");
const publishHouseElem = document.querySelector(".publishHouse");
const publishYearElem = document.querySelector(".publishYear");
const pagesNumberElem = document.querySelector(".pagesNumber");
const isFavor = document.querySelectorAll(".home__favorite");
const genresElem = document.querySelector(".genres");
const deleteBtn = document.querySelector(".confirm__yes-btn");

export function detailsOfBook() {
  if (idOfProduct) {
    getBookDetailRequest().then((res) => renderBookDetailsToPage(res));
  }
}

export async function getBookDetailRequest() {
  const res = await apiRequest(`books/${idOfProduct}`);
  return res;
}

function renderBookDetailsToPage(params) {
  if (nameOfBookElem) {
    nameOfBookElem.textContent = params.name;
    authorElem.textContent = params.author;
    publishHouseElem.textContent = params.publishHouse;
    pagesNumberElem.textContent = params.pagesNumber;
    originalLanguageElem.textContent = params.originalLanguage;
    genresElem.textContent = params.genres;
    publishYearElem.textContent = params.publishYear;

    if (params.isFavorite) {
      for (const item of isFavor) {
        item.classList.add("home__favoritAdded");
      }
    } else {
      for (const item of isFavor) {
        item.classList.remove("home__favoritAdded");
      }
    }

    for (const item of isFavor) {
      item.addEventListener("click", () => {
        apiRequest(`books/update/${params.id}`, "PUT", {
          isFavorite: !params.isFavorite,
        });
        detailsOfBook();
      });
    }

    deleteBtn.addEventListener("click", () => {
      apiRequest(`books/delete/${params.id}`, "DELETE");
      localStorage.removeItem("idOfproduct");
    });
  }
}
