import { STYLE_CONSTANTS, getRandomElement } from "./utils.js";
import { deleteActionBtn } from "./deleteBtn.js";

/**
 * Creates a new note element with the provided data
 */
export const createNewNote = (noteData) => {
  const createTimestamp = () => {
    const details = document.createElement("div");
    details.className = "text-xl w-40";

    const timestampFields = [
      { label: "Date:", value: noteData.dueDate },
      { label: "Time:", value: noteData.dueTime },
    ];

    const timestampElements = timestampFields.map(({ label, value }) => {
      const container = document.createElement("div");
      container.className = "flex gap-3";

      const labelElement = document.createElement("span");
      labelElement.className = "label border-b-2 border-gray-300";
      labelElement.textContent = label;

      const valueElement = document.createElement("span");
      valueElement.textContent = value;

      container.append(labelElement, valueElement);
      return container;
    });

    details.append(...timestampElements);
    return details;
  };

  const createNoteBody = () => {
    const note = document.createElement("div");
    note.className = `note flex flex-col justify-between bg-[${noteData.color}] 
      ${getRandomElement(STYLE_CONSTANTS.rotation)} 
      ${getRandomElement(STYLE_CONSTANTS.position)}`;

    const content = document.createElement("div");
    content.className = "content line-clamp-3";

    const text = document.createElement("p");
    text.style.fontSize = "2rem";
    text.textContent = `# ${noteData.text}`;

    content.appendChild(text);
    note.appendChild(content);
    return note;
  };

  const createPinElement = () => {
    const pin = document.createElement("img");
    pin.className = "pin";
    pin.src = "/asset/image.svg";
    pin.style = getRandomElement(STYLE_CONSTANTS.pin);
    return pin;
  };

  const createDeleteButton = () => {
    const button = document.createElement("button");
    button.className =
      "delete-button transform translate-x-[150%] transition-transform duration-300";
    button.innerHTML = deleteActionBtn();
    return button;
  };

  const createNoteFooter = (timestamp, deleteBtn) => {
    const footer = document.createElement("div");
    footer.className = "grid grid-cols-3";

    const timestampContainer = document.createElement("div");
    timestampContainer.className = "col-span-2";
    timestampContainer.appendChild(timestamp);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "col-span-1 flex justify-end items-end";
    buttonContainer.appendChild(deleteBtn);

    footer.append(timestampContainer, buttonContainer);
    return footer;
  };

  // Ensure note has a color
  if (!noteData.color) {
    noteData.color = getRandomElement(STYLE_CONSTANTS.colors.pastel);
  }

  // Assemble the note
  const noteWrapper = document.createElement("div");
  noteWrapper.className = "note-wrapper relative z-50";
  noteWrapper.dataset.id = noteData.id;

  const noteBody = createNoteBody();
  const timestamp = createTimestamp();
  const pin = createPinElement();
  const deleteBtn = createDeleteButton();
  const footer = createNoteFooter(timestamp, deleteBtn);

  noteBody.appendChild(footer);
  noteWrapper.append(pin, noteBody);

  return noteWrapper;
};
