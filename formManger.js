import { createNewNote } from "./createNote.js";
import { createDefaultNotes } from "./defaultNote.js";
import { setupNoteTracking } from "./trackingActiveNote.js";

export class FormManger {
  constructor() {
    this.storageKey = "notes";
    this.dataBase = this.getExistingRecords();
    this.init();
  }

  init() {
    this.DomElement();
    this.addEventListener();
    this.loadNotes();
    this.setEventListeners();
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
    const records = JSON.parse(localStorage.getItem(this.storageKey));
    if (records === null) {
      // If no records exist, create default notes
      const defaultNotes = createDefaultNotes();
      localStorage.setItem(this.storageKey, JSON.stringify(defaultNotes));
      return defaultNotes;
    }
    return records;
  }

  loadNotes() {
    if (!this.dataBase) return;

    this.dataBase.forEach((noteObj) => {
      const noteElement = createNewNote(noteObj);
      this.element.noteContainer.appendChild(noteElement);
    });
  }

  setEventListeners() {
    const setEventListener = setupNoteTracking(this.element.noteContainer.id);
    const notes = this.element.noteContainer.querySelectorAll(".note-warper");
    // notes.forEach((note) => {
    //   const delBtn = note.querySelector(".delete-button");
    //   setEventListener(note, delBtn);
    // });
  }
}
