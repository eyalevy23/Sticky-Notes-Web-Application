import { FormManger } from "./src/formManger.js";

const init = () => {
  localStorage.clear();
  new FormManger();
};

document.addEventListener("DOMContentLoaded", init);
