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
      overlay: document.getElementById("overlay"),
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

    // Use event delegation for delete buttons
    this.elements.noteContainer.addEventListener("click", (event) => {
      const deleteButton = event.target.closest(".delete-button");
      if (deleteButton) {
        event.stopPropagation();
        const noteId = deleteButton.closest(".note-wrapper").dataset.id;
        this.deleteNote(noteId);
      }
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
    this.elements.saveBtn.classList.add("pulse");
    setTimeout(() => {
      this.elements.saveBtn.classList.remove("pulse");
    }, 300);

    // Revalidate time before saving
    this.formValidation.validateTimeField();

    if (!this.formValidation.isValidForm()) return;

    const noteData = this.createNoteObject();
    const noteElement = createNewNote(noteData);

    // Save to database
    this.dataBase.push(noteData);
    this.updateStorage();

    // Update UI
    this.resetForm();
    this.addNoteToUI(noteElement);
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

  updateStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.dataBase));
    } catch (error) {
      console.error("Failed to update local storage:", error);
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
    setTimeout(() => {
      this.elements.noteContainer.classList.remove("hidden");
    }, 50);

    if (!this.dataBase || !this.dataBase.length) return;

    // Filter out expired notes
    this.removeExpiredNotes();

    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();

    // Render all remaining notes
    this.dataBase.forEach((noteData) => {
      const noteElement = createNewNote(noteData);
      fragment.appendChild(noteElement);
    });

    this.elements.noteContainer.appendChild(fragment);
  }

  removeExpiredNotes() {
    const initialCount = this.dataBase.length;
    this.dataBase = this.dataBase.filter(
      (note) => !this.formValidation.isNoteDuePassed(note)
    );

    // Only update storage if notes were actually removed
    if (initialCount !== this.dataBase.length) {
      this.updateStorage();
    }
  }

  deleteNote(noteId) {
    // Remove from database
    this.dataBase = this.dataBase.filter((note) => note.id !== noteId);
    this.updateStorage();

    // Remove from UI
    const noteElement = this.elements.noteContainer.querySelector(
      `.note-wrapper[data-id="${noteId}"]`
    );

    if (noteElement) {
      noteElement.classList.add("delete-animation");
      setTimeout(() => {
        noteElement.remove();
      }, 600);
      this.elements.overlay.classList.add("hidden");
    }
  }

  setupNoteTracking() {
    setupNoteTracking(this.elements.noteContainer, this.elements.overlay);
  }
}
