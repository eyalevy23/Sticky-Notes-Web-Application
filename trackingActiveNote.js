let activeNote = null;
let clickListenerAdded = false;
let justActivated = false;

export const setupNoteTracking = ({ container, onDelete }) => {
  const notesContainer = container;
  if (!notesContainer) {
    console.error(`Container with ID "${notesContainer.id}" not found`);
    return;
  }

  const handleDeleteClick = (e) => {
    if (justActivated) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    console.log(activeNote);
    const noteId = activeNote.dataset.id;

    // activeNote.remove();
    deactivateNote();

    console.log(noteId);

    if (onDelete) {
      onDelete(noteId);
    }
  };

  const handleOutsideClick = (e) => {
    if (
      activeNote &&
      !activeNote.contains(e.target) &&
      !e.target.closest(".note-warper")
    ) {
      deactivateNote();
    }
  };

  const addOutsideClickListener = () => {
    if (!clickListenerAdded) {
      document.addEventListener("click", handleOutsideClick);
      clickListenerAdded = true;
    }
  };

  const removeOutsideClickListener = () => {
    if (clickListenerAdded) {
      document.removeEventListener("click", handleOutsideClick);
      clickListenerAdded = false;
    }
  };

  const deactivateNote = () => {
    if (!activeNote) return;

    const note = activeNote.querySelector(".note");
    const deleteBtn = activeNote.querySelector(".delete-button");

    if (note && deleteBtn) {
      note.classList.remove("active");
      deleteBtn.classList.add("hidden");
      deleteBtn.removeEventListener("click", handleDeleteClick);
      activeNote.removeEventListener("mouseleave", handleMouseLeave);
    }

    activeNote = null;
    removeOutsideClickListener();
  };

  const handleMouseLeave = (e) => {
    if (activeNote && !activeNote.contains(e.relatedTarget)) {
      deactivateNote();
    }
  };

  const activateNote = (noteDiv) => {
    if (activeNote === noteDiv) return;

    deactivateNote();

    const note = noteDiv.querySelector(".note");
    const deleteBtn = noteDiv.querySelector(".delete-button");

    if (note && deleteBtn) {
      activeNote = noteDiv;
      note.classList.add("active");
      deleteBtn.classList.remove("hidden");

      justActivated = true;
      setTimeout(() => (justActivated = false), 300);

      deleteBtn.addEventListener("click", handleDeleteClick);
      noteDiv.addEventListener("mouseleave", handleMouseLeave);

      addOutsideClickListener();
    }
  };

  notesContainer.addEventListener(
    "mouseenter",
    (e) => {
      const noteDiv = e.target.closest(".note-warper");
      if (!noteDiv || activeNote === noteDiv) return;
      activateNote(noteDiv);
    },
    true
  );

  notesContainer.addEventListener("click", (e) => {
    const noteDiv = e.target.closest(".note-warper");
    if (noteDiv) {
      e.stopPropagation();

      const deleteBtn = noteDiv.querySelector(".delete-button");
      if (deleteBtn && e.target === deleteBtn) {
        if (activeNote !== noteDiv) {
          activateNote(noteDiv);
          return;
        }
      }

      activateNote(noteDiv);
    }
  });
};
