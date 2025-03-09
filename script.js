const init = () => {
  const allNotes = document.querySelectorAll("li a");

  // Add event listeners for content changes
  allNotes.forEach((note, index) => {
    note.addEventListener("input", () => {
      const noteTitle = note.querySelector("h2").textContent;
      const noteContent = note.querySelector("p").textContent;
      const itemKey = `list_${index}`;

      const data = {
        title: noteTitle,
        content: noteContent,
      };

      localStorage.setItem(itemKey, JSON.stringify(data));
    });

    // Load saved content
    const itemKey = `list_${index}`;
    const savedData = localStorage.getItem(itemKey);

    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        note.querySelector("h2").textContent = data.title;
        note.querySelector("p").textContent = data.content;
      } catch (e) {
        console.error(`Error loading note ${index}:`, e);
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", init);
