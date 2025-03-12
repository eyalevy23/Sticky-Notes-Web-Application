import { FormManger } from "./src/formManger.js";

const init = () => {
  //   const container = document.getElementById("notes");
  //   const defaultNotes = createDefaultNotes().map(createNewNote);
  //   console.log(defaultNotes);
  //   container.append(...defaultNotes);
  new FormManger();
};

document.addEventListener("DOMContentLoaded", init);
