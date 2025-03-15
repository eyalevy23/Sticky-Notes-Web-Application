import { createNewNote } from "./createNote.js";
import { createDefaultNotes } from "./defaultNote.js";
import { setupNoteTracking } from "./trackingActiveNote.js";
import { FormValidation } from "./formValidation.js";

export class FormManager {
  constructor() {
    this.storageKey = "notes";
    this.dataBase = this.getExistingRecords();
    this.init();
  }

  init() {
    this.cacheDomElements();
    this.initializeTimestamp();
    this.setupEventListeners();

    this.formValidation = new FormValidation(
      this.elements.textArea,
      this.elements.date,
      this.elements.time
    );

    this.loadNotes();
    this.setupNoteTracking();
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

    // Format date as yyyy-mm-dd
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    this.elements.date.value = `${year}-${month}-${day}`;

    // Format time as HH:MM
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    this.elements.time.value = `${hours}:${minutes}`;
  }

  setupEventListeners() {
    // Save button click handler
    this.elements.saveBtn.addEventListener("click", () => this.handleSave());

    // Reset button click handler with animation
    this.elements.resetBtn.addEventListener("click", () => {
      this.handleReset();
      this.animateResetButton();
    });
  }

  animateResetButton() {
    this.elements.resetBtn.classList.add("rotate-noDelay");
    setTimeout(() => {
      this.elements.resetBtn.classList.remove("rotate-noDelay");
      this.elements.resetBtn.classList.remove("rotateY");
    }, 600);
  }

  formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  createNoteObject() {
    return {
      id: String(Date.now() * Math.random()),
      text: this.elements.textArea.value,
      dueDate: this.formatDate(this.elements.date.value),
      dueTime: this.elements.time.value,
      color: null,
      createdAt: new Date().toISOString(),
    };
  }

  handleSave() {
    if (!this.formValidation.isValidForm()) return;

    const noteData = this.createNoteObject();
    const noteElement = createNewNote(noteData);

    // Save to database and storage
    this.dataBase.push(noteData);
    this.saveToLocalStorage(noteData);

    // Update UI
    this.resetForm();
    this.addNoteToUI(noteElement);

    // Attach delete event listener to the new note
    this.attachDeleteHandler(noteElement);
  }

  addNoteToUI(noteElement) {
    noteElement.style.opacity = 0;
    this.elements.noteContainer.appendChild(noteElement);
    noteElement.scrollIntoView({ behavior: "smooth" });

    // Animate the note appearing
    setTimeout(() => {
      noteElement.classList.add("new-note-animation");
    }, 400);
  }

  handleReset() {
    this.resetForm();
  }

  resetForm() {
    this.elements.textArea.value = "";
    this.formValidation.resetFormFields();
    this.initializeTimestamp();
  }

  saveToLocalStorage(newNote) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.dataBase));
    } catch (error) {
      console.error("Failed to save notes to local storage:", error);
    }
  }

  getExistingRecords() {
    try {
      const records = JSON.parse(localStorage.getItem(this.storageKey));
      if (records === null) {
        // Create default notes if none exist
        const defaultNotes = createDefaultNotes();
        localStorage.setItem(this.storageKey, JSON.stringify(defaultNotes));
        return defaultNotes;
      }
      return records;
    } catch (error) {
      console.error("Error retrieving notes from storage:", error);
      return [];
    }
  }

  loadNotes() {
    if (!this.dataBase || !this.dataBase.length) return;

    // Filter out expired notes
    this.removeExpiredNotes();

    // Render all remaining notes
    this.dataBase.forEach((noteData) => {
      const noteElement = createNewNote(noteData);
      this.elements.noteContainer.appendChild(noteElement);
    });

    // Add delete handlers to all notes
    this.setupDeleteHandlers();
  }

  removeExpiredNotes() {
    this.dataBase = this.dataBase.filter(
      (note) => !this.formValidation.isNoteDuePassed(note)
    );
    this.updateStorage();
  }

  updateStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.dataBase));
    } catch (error) {
      console.error("Failed to update local storage:", error);
    }
  }

  deleteNote(noteId) {
    // Remove from database
    this.dataBase = this.dataBase.filter((note) => note.id !== noteId);
    this.updateStorage();

    // Remove from UI
    const noteElement = document.querySelector(
      `.note-wrapper[data-id="${noteId}"]`
    );
    if (noteElement) {
      noteElement.remove();
    }
  }

  setupNoteTracking() {
    setupNoteTracking(this.elements.noteContainer);
    this.setupDeleteHandlers();
  }

  setupDeleteHandlers() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => this.attachDeleteHandler(button));
  }

  attachDeleteHandler(element) {
    // If passed a note element, find its delete button
    const button = element.classList.contains("delete-button")
      ? element
      : element.querySelector(".delete-button");

    if (!button) return;

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const noteId = event.target.closest(".note-wrapper").dataset.id;
      this.deleteNote(noteId);
    });
  }
}
