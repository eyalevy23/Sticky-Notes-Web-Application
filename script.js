import { createNewNote } from "./createNote.js";
import { createDefaultNotes } from "./defaultNote.js";
import { FormManger } from "./formManger.js";

const init = () => {
  //   const container = document.getElementById("notes");
  //   const defaultNotes = createDefaultNotes().map(createNewNote);
  //   console.log(defaultNotes);
  //   container.append(...defaultNotes);

  new FormManger();
};

document.addEventListener("DOMContentLoaded", init);
