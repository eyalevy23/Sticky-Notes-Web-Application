import { createNewNote } from "./createNote.js";
import { createDefaultNotes } from "./defaultNote.js";
import { setupNoteTracking } from "./trackingActiveNote.js";

export class FormManger {
  constructor() {
    this.storageKey = "notes";
    this.dataBase = this.getExistingRecords();
    this.cleanupNoteTracking = null;
    this.init();
  }

  init() {
    this.cacheDomElements();
    this.addEventListener();
    this.loadNotes();
    this.addNoteTracking();
  }

  cacheDomElements() {
    this.elements = {
      saveBtn: document.getElementById("save-btn"),
      resetBtn: document.getElementById("reset-btn"),
      noteContainer: document.getElementById("notes"),
    };
  }

  addEventListener() {
    this.elements.saveBtn.addEventListener("click", () => {});
    this.elements.resetBtn.addEventListener("click", () => {});
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
