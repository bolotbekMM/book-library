import { clearAllFunc } from "./validation.js";

const openModalBtn = document.getElementById("home__open-modal");
const addModal = document.querySelector(".add__modal");
const closeModalBtn = document.querySelector(".modal-close");
const openConfirmModal = document.getElementsByClassName("confirm-to-delete");
const confirmModal = document.querySelector(".confirm__delete-modal");
const confirmModalContainer = document.querySelector(".confirm__container");
const noConfirmBtn = document.querySelector(".confirm__no-btn");
const yesConfirmBtn = document.querySelector(".confirm__yes-btn");

export function modal() {
  openModalBtn?.addEventListener("click", () => {
    addModal.classList.add("open__modal");
  });
  closeModalBtn?.addEventListener("click", () => {
    closeModalFunc();
  });

  for (const el of openConfirmModal) {
    el.addEventListener("click", (e) => {
      console.log("ishtedi");
      e.preventDefault();
      confirmModal.classList.add("open__modal");
    });
  }

  noConfirmBtn?.addEventListener("click", () => {
    confirmModal?.classList.remove("open__modal");
  });
  yesConfirmBtn?.addEventListener("click", () => {
    confirmModalContainer.innerHTML = "";
    confirmModalContainer.innerHTML = `<img class="loadingData" src="./assets/loading.svg" alt="loading"></img>`;
    clearAllFunc();
    setTimeout(() => {
      confirmModalContainer.innerHTML = "";
      confirmModalContainer.innerHTML = `<h4>Успешно удалено</h4>
      <img src="./assets/success.svg" alt="successfuly deleted" />
      <a href="./home.html" class="confirm__delete-btns">
        <button id="confirm__ok-btn" class="confirm__ok-btn">OK</button>
      </a>`;
    }, 1000);
  });

  // if (okConfirmBtn) {
  //   okConfirmBtn.addEventListener("click", () => {
  //     window.location.href = "../../home.html";
  //   });
  // }
}
export function closeModalFunc() {
  addModal.classList.remove("open__modal");
  if (!window.location.href.includes("bookDetail.html")) {
    clearAllFunc();
  }
}
