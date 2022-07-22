import { apiRequest } from "./api.js";
const token = JSON.parse(localStorage.getItem("token"));

const userName = document.querySelector(".header__username");

export function user() {
  if (userName) {
    getUserRequest().then((res) => (userName.textContent = res.firstName));
  }
}
async function getUserRequest() {
  const res = await apiRequest("me");
  return res;
}

export function noTokenFunc() {
  if (
    !token &&
    window.location.pathname !== "/src/index.html" &&
    window.location.pathname !== "/src/login.html" &&
    window.location.pathname != "/src"
  ) {
    location.href = "/src/index.html";
  }
}
