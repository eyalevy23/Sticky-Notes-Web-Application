/**
 * Note tracking system with hover and click activation
 * Prevents accidental deletions and supports both desktop and mobile interactions
 */

export const setupNoteTracking = (container, overlay) => {
  let activeNote = null;

  if (!container) {
    console.error("Container not provided");
    return () => {};
  }

  /**
   * Activates a note
   */
  const activateNote = (noteWrapper) => {
    if (activeNote === noteWrapper.querySelector(".note")) return;

    deactivateNote(); // Deactivate current note if exists

    const noteElement = noteWrapper.querySelector(".note");
    const deleteButton = noteWrapper.querySelector(".delete-button");
    activeNote = noteElement;
    activeNote.classList.add("active");
    deleteButton.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
  };
  console.log("hey");

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
   * Handles hover activation
   */
  const handleMouseOver = (event) => {
    const noteWrapper = event.target.closest(".note-wrapper");
    if (noteWrapper) {
      activateNote(noteWrapper);
    }
  };

  /**
   * Handles hover deactivation
   */
  const handleMouseOut = (event) => {
    if (activeNote && !event.relatedTarget?.closest(".note-wrapper")) {
      deactivateNote();
    }
  };

  /**
   * Handles click activation for mobile
   * Bubble up to mouseover
   */
  const handleClick = (event) => {
    const noteWrapper = event.target.closest(".note-wrapper");

    if (!noteWrapper) {
      return;
    }
  };

  // Event Listeners
  container.addEventListener("mouseover", handleMouseOver);
  container.addEventListener("mouseout", handleMouseOut);
  container.addEventListener("click", handleClick);
  overlay.addEventListener("click", deactivateNote);
};
