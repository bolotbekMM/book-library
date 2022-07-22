import { detailsOfBook } from "./modules/detailsOfBook.js";
import { getAllBooks } from "./modules/getAllBooksRequest.js";
import { modal } from "./modules/modal.js";
import { uploadInputValue } from "./modules/uploadInputValue.js";
import { noTokenFunc, user } from "./modules/user.js";
import { validation } from "./modules/validation.js";

modal();
validation();
getAllBooks();
detailsOfBook();
uploadInputValue();
user();
noTokenFunc();
