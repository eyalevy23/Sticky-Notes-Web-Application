let activeNote = null;
let clickListenerAdded = false; // Track if click event is active

export const setupNoteTracking = (notesContainerId = "notes") => {
  const notesContainer = document.getElementById(notesContainerId);

  if (!notesContainer) {
    console.error(`Container with ID "${notesContainerId}" not found`);
    return () => {}; // Return empty function if container not found
  }

  const deactivateCurrentNote = () => {
    if (activeNote) {
      const note = activeNote.querySelector(".note");
      const deleteBtn = activeNote.querySelector(".delete-button");

      if (note && deleteBtn) {
        note.classList.remove("active");
        deleteBtn.classList.add("hidden");
      }

      activeNote = null;
      removeOutsideClickListener();
    }
  };

  const handleOutsideClick = (e) => {
    if (
      activeNote &&
      !activeNote.contains(e.target) &&
      !e.target.closest(".note-warper")
    ) {
      deactivateCurrentNote();
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

  // Handle mouse enter for desktop hover
  notesContainer.addEventListener(
    "mouseenter",
    (e) => {
      const noteDiv = e.target.closest(".note-warper");
      if (!noteDiv || activeNote === noteDiv) return;

      deactivateCurrentNote();

      const note = noteDiv.querySelector(".note");
      const deleteBtn = noteDiv.querySelector(".delete-button");

      if (note && deleteBtn) {
        activeNote = noteDiv;
        note.classList.add("active");
        deleteBtn.classList.remove("hidden");
        addOutsideClickListener();
      }
    },
    true
  );

  // Handle clicks on notes (for mobile)
  notesContainer.addEventListener("click", (e) => {
    const noteDiv = e.target.closest(".note-warper");

    if (noteDiv) {
      e.stopPropagation(); // Prevent document click handler from firing

      if (activeNote === noteDiv) return; // Do nothing if same note

      deactivateCurrentNote();

      const note = noteDiv.querySelector(".note");
      const deleteBtn = noteDiv.querySelector(".delete-button");

      if (note && deleteBtn) {
        activeNote = noteDiv;
        note.classList.add("active");
        deleteBtn.classList.remove("hidden");
        addOutsideClickListener();
      }
    }
  });

  // Handle mouse leave (deactivate when mouse leaves notes container)
  notesContainer.addEventListener("mouseleave", (e) => {
    if (!notesContainer.contains(e.relatedTarget)) {
      deactivateCurrentNote();
    }
  });

  return function setEventListener(div, delBtn) {
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      alert("Note deleted");
      // div.remove();
    });
  };
};
