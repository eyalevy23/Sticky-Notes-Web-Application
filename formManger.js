import { createNewNote } from "./createNote.js";
import { createDefaultNotes } from "./defaultNote.js";

export class FormManger {
  constructor() {
    this.dataBase = this.getExistingRecords();
    this.storageKey = "notes";
    this.init();
  }

  init() {
    this.DomElement();
    this.addEventListener();
    this.loadNotes();
  }

  DomElement() {
    this.element = {
      saveBtn: document.getElementById("save-btn"),
      resetBtn: document.getElementById("reset-btn"),
      noteContainer: document.getElementById("notes"),
    };
  }

  addEventListener() {
    this.element.saveBtn.addEventListener("click", () => {});
    this.element.resetBtn.addEventListener("click", () => {});
  }

  saveToLocalStorage(newRecord) {
    try {
      const existingRecords = this.getExistingRecords();
      existingRecords.push(newRecord);
      localStorage.setItem(this.storageKey, JSON.stringify(existingRecords));
    } catch (error) {
      console.error("Failed to save new notes:", error);
      localStorage.clear();
    }
  }

  getExistingRecords() {
    return JSON.parse(localStorage.getItem(this.storageKey) || "false");
  }

  loadNotes() {
    if (!this.dataBase) {
    }
  }
}
