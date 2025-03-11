// Track the currently active note element
let activeNote = null;
// Reference to the document click handler for adding/removing
let documentClickHandler = null;

export const setupNoteTracking = (notesContainerId = "notes-container") => {
  const notesContainer = document.getElementById(notesContainerId);

  if (!notesContainer) {
    console.error(`Container with ID "${notesContainerId}" not found`);
    return () => {}; // Return empty function if container not found
  }

  // Function to deactivate the current active note
  const deactivateCurrentNote = () => {
    if (activeNote) {
      const note = activeNote.querySelector(".note");
      const deleteBtn = activeNote.querySelector(".delete-button");

      note.classList.remove("active");
      deleteBtn.classList.add("hidden");
      activeNote = null;

      // Remove the document click listener since no notes are active
      document.removeEventListener("click", documentClickHandler);
      documentClickHandler = null;
    }
  };

  // Define the document click handler
  documentClickHandler = (e) => {
    // If there's an active note and the click is outside it
    if (
      activeNote &&
      !activeNote.contains(e.target) &&
      !notesContainer.contains(e.target)
    ) {
      deactivateCurrentNote();
    }
  };

  // Use event delegation for all notes
  notesContainer.addEventListener(
    "mouseenter",
    (e) => {
      // Find the closest note container element
      const noteDiv = e.target.closest(".relative");
      if (!noteDiv) return;

      // Don't do anything if this note is already active
      if (activeNote === noteDiv) return;

      // Deactivate any currently active note
      deactivateCurrentNote();

      // Activate this note
      const note = noteDiv.querySelector(".note");
      const deleteBtn = noteDiv.querySelector(".delete-button");

      if (note && deleteBtn) {
        activeNote = noteDiv;
        note.classList.add("active");
        deleteBtn.classList.remove("hidden");

        // Add document click listener only when a note becomes active
        document.addEventListener("click", documentClickHandler);
      }
    },
    true
  ); // Use capture phase to ensure this runs before other handlers

  notesContainer.addEventListener("click", (e) => {
    // Find the closest note container element
    const noteDiv = e.target.closest(".relative");
    if (!noteDiv) return;

    // If clicking on an already active note, just let the click pass through
    if (activeNote === noteDiv) {
      return;
    }

    // Prevent propagation if this is activating a new note
    e.stopPropagation();

    // Deactivate any currently active note
    deactivateCurrentNote();

    // Activate this note
    const note = noteDiv.querySelector(".note");
    const deleteBtn = noteDiv.querySelector(".delete-button");

    if (note && deleteBtn) {
      activeNote = noteDiv;
      note.classList.add("active");
      deleteBtn.classList.remove("hidden");

      // Add document click listener only when a note becomes active
      document.addEventListener("click", documentClickHandler);
    }
  });

  // Return a function that just handles the delete button click for each note
  return function setEventListener(div, delBtn) {
    // Example delete button action
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click from triggering the note's click event
      alert(1);
      // You may want to deactivate the note here after deletion
    });
  };
};
