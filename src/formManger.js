import { createNewNote } from "./createNote.js";
import { createDefaultNotes } from "./defaultNote.js";
import { setupNoteTracking } from "./trackingActiveNote.js";
import { FormValidation } from "./formValidation.js";

export class FormManger {
  constructor() {
    this.storageKey = "notes";
    this.dataBase = this.getExistingRecords();
    this.cleanupNoteTracking = null;
    this.init();

    this.formValidation = new FormValidation(
      this.elements.textArea,
      this.elements.date,
      this.elements.time
    );
  }

  init() {
    this.cacheDomElements();
    this.initializeTimestamp();
    this.addEventListener();
    this.loadNotes();
    this.addNoteTracking();
  }

  cacheDomElements() {
    this.elements = {
      saveBtn: document.getElementById("save-btn"),
      resetBtn: document.getElementById("reset-btn"),
      noteContainer: document.getElementById("notes"),

      textArea: document.getElementById("text-area"),
      date: document.getElementById("date"),
      time: document.getElementById("time"),
    };
  }

  initializeTimestamp() {
    const now = new Date();

    // Format date as yyyy-mm-dd (required format for <input type="date">)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Get month and format
    const day = String(now.getDate()).padStart(2, "0"); // Get day and format
    const formattedDate = `${year}-${month}-${day}`; // Correct format for input[type="date"]

    this.elements.date.value = formattedDate;

    // Format time as HH:MM (input[type="time"] expects this format)
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    this.elements.time.value = formattedTime;
  }

  addEventListener() {
    this.elements.saveBtn.addEventListener("click", () => {
      this.handleSubmitClick();
    });
    this.elements.resetBtn.addEventListener("click", () => {
      this.handleResetClick();
    });
  }

  handleSubmitClick() {
    console.log("this is a test");
    const isValid = this.formValidation.isValidForm();
  }

  handleResetClick() {
    this.resetFormField();
    this.formValidation.resetFormFields();
  }

  resetFormField() {
    this.elements.textArea.value = "";
    this.initializeTimestamp();
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

    this.dataBase.forEach((note) => {
      this.elements.noteContainer.appendChild(createNewNote(note));
    });
  }

  commitToStorage(records) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(records));
    } catch (e) {
      console.log("Local Storage commit filed", e);
    }
  }

  deleteNote(noteId) {
    this.dataBase = this.dataBase.filter((note) => note.id !== noteId);
    this.commitToStorage(this.dataBase);
  }

  addNoteTracking() {
    setupNoteTracking({
      container: this.elements.noteContainer,
      onDelete: (noteId) => this.deleteNote(noteId),
    });
  }

  destroy() {
    // Call the cleanup function to remove event listeners
    if (this.cleanupNoteTracking) {
      this.cleanupNoteTracking();
      this.cleanupNoteTracking = null;
    }
  }
}
