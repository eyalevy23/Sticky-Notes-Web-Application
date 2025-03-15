import { FormManager } from "./src/formManger.js";

const init = () => {
  // localStorage.clear();
  new FormManager();
};

document.addEventListener("DOMContentLoaded", init);
