/**
 * Note tracking system with activation delay to prevent accidental deletions
 * Supports both desktop (hover) and mobile (click) interactions
 */

// Delay before a note becomes active to prevent accidental deletions
const ACTIVATE_DELAY = 10; // milliseconds

/**
 * Sets up note tracking with activation delay for both desktop and mobile
 */
export const setupNoteTracking = ({ container, onDelete }) => {
  // State variables
  let activeNote = null;
  let documentClickListener = null;
  let activationTimer = null;

  // Validate container
  if (!container) {
    console.error("Container not provided");
    return () => {};
  }

  // --- Event Handlers ---

  /**
   * Handles clicks outside of notes to deactivate the active note
   */
  const handleOutsideClick = (event) => {
    if (
      activeNote &&
      !activeNote.contains(event.target) &&
      !event.target.closest(".note-wrapper")
    ) {
      deactivateNote();
    }
  };

  /**
   * Handles delete button clicks
   */
  const handleDeleteClick = (event) => {
    event.stopPropagation();

    if (activeNote) {
      const noteId = activeNote.dataset.id;

      if (onDelete) {
        onDelete(noteId);
      }

      handleUiDeleteAnimation();

      deactivateNote();
    }
  };

  const handleUiDeleteAnimation = () => {
    const note = activeNote.querySelector(".note");
    // const pin = activeNote.querySelector(".pin");
    // pin.classList.add("fall-dnd-delete");
    note.classList.add("fall-dnd-delete");
    setTimeout(() => {
      note.remove();
    }, 1000);
  };

  /**
   * Handles mouse leaving a note
   */
  const handleMouseLeave = (event) => {
    if (activeNote && !activeNote.contains(event.relatedTarget)) {
      deactivateNote();
    }
  };

  // --- Core Functions ---

  /**
   * Adds document click listener if not already added
   */
  const addOutsideClickListener = () => {
    if (!documentClickListener) {
      documentClickListener = handleOutsideClick;
      document.addEventListener("click", documentClickListener);
    }
  };

  /**
   * Removes document click listener if exists
   */
  const removeOutsideClickListener = () => {
    if (documentClickListener) {
      document.removeEventListener("click", documentClickListener);
      documentClickListener = null;
    }
  };

  /**
   * Cancels any pending activation
   */
  const cancelActivation = () => {
    if (activationTimer) {
      clearTimeout(activationTimer);
      activationTimer = null;
    }
  };

  /**
   * Deactivates the currently active note
   */
  const deactivateNote = () => {
    // Cancel any pending activation
    cancelActivation();

    if (!activeNote) return;

    const noteElement = activeNote.querySelector(".note");
    const deleteButton = activeNote.querySelector(".delete-button");

    if (noteElement && deleteButton) {
      noteElement.classList.remove("active");
      deleteButton.classList.add("hidden");
      deleteButton.removeEventListener("click", handleDeleteClick);
      activeNote.removeEventListener("mouseleave", handleMouseLeave);
    }

    activeNote = null;
    removeOutsideClickListener();
  };

  /**
   * Activates a note with delay to prevent accidental interactions
   */
  const activateNote = (noteWrapper) => {
    // Don't reactivate the same note
    if (activeNote === noteWrapper) return;

    // Cancel any pending activation
    cancelActivation();

    // Deactivate any currently active note
    deactivateNote();

    // Set activation timer with delay
    activationTimer = setTimeout(() => {
      const noteElement = noteWrapper.querySelector(".note");
      const deleteButton = noteWrapper.querySelector(".delete-button");

      if (noteElement && deleteButton) {
        activeNote = noteWrapper;
        noteElement.classList.add("active");
        deleteButton.classList.remove("hidden");
        deleteButton.addEventListener("click", handleDeleteClick);
        noteWrapper.addEventListener("mouseleave", handleMouseLeave);
        addOutsideClickListener();
      }

      activationTimer = null;
    }, ACTIVATE_DELAY);
  };

  /**
   * Main event handler for both mouseenter and click events
   */
  const handleNoteEvent = (event) => {
    // Ignore clicks on delete buttons
    if (event.type === "click" && event.target.closest(".delete-button")) {
      return;
    }

    const noteWrapper = event.target.closest(".note-wrapper");
    if (noteWrapper) {
      activateNote(noteWrapper);
    }
  };

  // --- Event Listeners Setup ---

  // Desktop hover behavior
  container.addEventListener("mouseenter", handleNoteEvent, true);

  // Mobile click behavior
  container.addEventListener("click", handleNoteEvent);

  // --- Cleanup Function ---

  return () => {
    cancelActivation();
    container.removeEventListener("mouseenter", handleNoteEvent, true);
    container.removeEventListener("click", handleNoteEvent);
    removeOutsideClickListener();
    deactivateNote();
  };
};
