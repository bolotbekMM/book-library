import { apiRequest } from "./api.js";
const listOfAllBooks = document.querySelector(".home__books-list");
const confirmModal = document.querySelector(".confirm__delete-modal");
const deleteBtn = document.getElementsByClassName("confirm__yes-btn")[0];
const userName = document.querySelector(".header__username");

export function getAllBooks() {
  if (listOfAllBooks) {
    getAllBooksRequest().then((res) => addBooksToPageFunc(res));
  }
}
async function getAllBooksRequest() {
  const res = await apiRequest("books", "GET");
  return res;
}

function addBooksToPageFunc(data) {
  if (data.length == 0) {
    listOfAllBooks.innerHTML = `<p> в базе нет книг</p>`;
  } else {
    listOfAllBooks.innerHTML = "";
  }
  data.forEach((element) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");
    let favSvg = document.createElement("div");
    let deleteSvg = document.createElement("div");

    p.textContent = element?.author;
    h4.textContent = element?.name;

    listOfAllBooks.appendChild(li);
    li.appendChild(a);
    a.appendChild(div);
    div.appendChild(h4);
    div.appendChild(p);
    a.appendChild(div2);
    div2.appendChild(favSvg);
    div2.appendChild(deleteSvg);

    a.setAttribute("href", "./bookDetail.html");

    div.classList.add("home__book-describtion");
    div2.classList.add("home__book-controll");

    favSvg.innerHTML = `<svg
    class="home__favorite"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="12" fill="#EDEDED" />
    <path
      d="M29.3762 13.5401C28.5386 11.8252 26.1258 10.4221 23.3191 11.239C21.9779 11.6255 20.8078 12.4543 19.9999 13.59C19.1919 12.4543 18.0218 11.6255 16.6806 11.239C13.8677 10.4346 11.4611 11.8252 10.6235 13.5401C9.44831 15.9409 9.93588 18.6411 12.0737 21.5658C13.7489 23.8544 16.143 26.1742 19.6186 28.8681C19.7284 28.9536 19.8637 29 20.003 29C20.1423 29 20.2776 28.9536 20.3874 28.8681C23.8567 26.1804 26.257 23.8793 27.9323 21.5658C30.0638 18.6411 30.5514 15.9409 29.3762 13.5401Z"
      fill="currentColor"
    />
  </svg>`;
    deleteSvg.innerHTML = `<svg
    class="home__delete confirm-to-delete"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="12" fill="#EDEDED" />
    <path
      d="M29.1667 13.6H25.8333V11.6C25.8333 10.7175 25.0859 10 24.1667 10H15.8333C14.9141 10 14.1667 10.7175 14.1667 11.6V13.6H10.8333C10.3724 13.6 10 13.9575 10 14.4V15.2C10 15.31 10.0937 15.4 10.2083 15.4H11.7812L12.4245 28.475C12.4661 29.3275 13.2005 30 14.0885 30H25.9115C26.8021 30 27.5339 29.33 27.5755 28.475L28.2187 15.4H29.7917C29.9062 15.4 30 15.31 30 15.2V14.4C30 13.9575 29.6276 13.6 29.1667 13.6ZM23.9583 13.6H16.0417V11.8H23.9583V13.6Z"
      fill="currentColor"
    />
  </svg>`;

    a.addEventListener("click", () => {
      localStorage.setItem("idOfproduct", JSON.stringify(element.id));
    });

    favSvg.addEventListener("click", (e) => {
      e.preventDefault();
      apiRequest(`books/update/${element.id}`, "PUT", {
        isFavorite: !element.isFavorite,
      });
      getAllBooks();
    });

    deleteSvg.addEventListener("click", (e) => {
      e.preventDefault();
      confirmModal.classList.add("open__modal");

      deleteBtn.addEventListener("click", () => {
        apiRequest(`books/delete/${element.id}`, "DELETE");

        localStorage.removeItem("idOfproduct");

        getAllBooks();
      });
    });

    if (element.isFavorite) {
      favSvg.firstElementChild.classList.add("home__favoritAdded");
    }
  });
}
