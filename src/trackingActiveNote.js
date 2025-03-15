/**
 * Note tracking system with activation delay to prevent accidental deletions
 * Supports both desktop (hover) and mobile (click) interactions
 */

// Delay before a note becomes active to prevent accidental deletions

/**
 * Sets up note tracking with activation delay for both desktop and mobile
 */
export const setupNoteTracking = (container) => {
  // State variables
  let activeNote = null;
  const overlay = document.getElementById("overlay");
  overlay.addEventListener("click", () => {
    deactivateNote();
  });

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
    // if (
    //   activeNote &&
    //   !activeNote.contains(event.target) &&
    //   !event.target.closest(".note-wrapper")
    // ) {
    //   deactivateNote();
    // }
  };

  /**
   * Handles delete button clicks
   */

  const handleUiDeleteAnimation = () => {
    const note = activeNote.closest(".note-wrapper");
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
  const addOutsideClickListener = () => {};

  /**
   * Removes document click listener if exists
   */
  const removeOutsideClickListener = () => {};

  /**
   * Deactivates the currently active note
   */
  const deactivateNote = () => {
    if (activeNote) {
      activeNote.classList.remove("active");
      activeNote
        .closest(".note-wrapper")
        .querySelector(".delete-button")
        .classList.remove("translate-x-0");
      activeNote = null;
      overlay.classList.add("hidden");
    }
  };

  /**
   * Activates a note with delay to prevent accidental interactions
   */
  const activateNote = (noteWrapper) => {
    if (activeNote === noteWrapper) {
      return;
    } else if (activeNote === null) {
      const noteElement = noteWrapper.querySelector(".note");
      const deleteButton = noteWrapper.querySelector(".delete-button");
      activeNote = noteElement;
      activeNote.classList.add("active");
      deleteButton.classList.add("translate-x-0");
      overlay.classList.remove("hidden");
    } else {
    }
  };

  /**
   * Main event handler for both mouseenter and click events
   */
  const handleNoteEvent = (event) => {
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
};
