import {
  getRandomElement,
  pastelColors,
  degrees,
  positions,
  pinPosition,
} from "./utils.js";
import { deleteActionBtn } from "./deleteBtn.js";

export const createNewNote = (noteObj) => {
  function createTimeStamp() {
    const details = document.createElement("div");
    details.className = "text-xl w-40";

    const timestamp = [
      { label: "Date:", value: noteObj.date },
      { label: "Time:", value: noteObj.time },
    ].map(({ label, value }) => {
      const item = document.createElement("div");
      item.className = "flex gap-3";

      const labelSpan = document.createElement("span");
      labelSpan.className = "label border-b-2 border-gray-300";
      labelSpan.textContent = label;

      const valueSpan = document.createElement("span");
      valueSpan.textContent = value;

      item.append(labelSpan, valueSpan);

      return item;
    });

    details.append(...timestamp);
    return details;
  }

  function createNoteContainer() {
    const rotation = getRandomElement(degrees);
    const position = getRandomElement(positions);

    const note = document.createElement("div");
    note.className = `note flex flex-col justify-between bg-[${noteObj.color}] ${rotation} ${position}`;

    const content = document.createElement("div");
    content.className = "overflow-y-auto";
    const paragraph = document.createElement("p");
    paragraph.textContent = `# ${noteObj.text}`;
    content.appendChild(paragraph);
    note.appendChild(content);
    return note;
  }

  function createImg() {
    const img = document.createElement("img");
    img.className = "pin";
    img.src = "/asset/image.svg";
    img.style = getRandomElement(pinPosition);
    return img;
  }

  function pickNoteColor() {
    if (noteObj.color === null) {
      noteObj.color = getRandomElement(pastelColors);
    }
  }

  function createNote() {
    pickNoteColor();

    const div = document.createElement("div");
    div.className = "note-wrapper relative";
    div.dataset.id = noteObj.id;

    const note = createNoteContainer();

    const timestamp = createTimeStamp();

    const img = createImg();

    const delBtn = createDeleteButton();

    const row = mergeTimestampAndDelBtnToOneRow(timestamp, delBtn);

    note.appendChild(row);
    div.append(img, note);

    return div;
  }

  function mergeTimestampAndDelBtnToOneRow(timestamp, btn) {
    const grid = document.createElement("div");
    grid.classList = "grid grid-cols-3";

    const span1 = document.createElement("div");
    span1.className = "col-span-2";
    span1.appendChild(timestamp);

    const span2 = document.createElement("div");
    span2.className = "col-span-1 flex justify-end items-end"; // Delete button will be bottom right corner
    span2.appendChild(btn);

    grid.append(span1, span2);
    return grid;
  }

  function createDeleteButton() {
    const delBtn = document.createElement("button");
    delBtn.classList = "delete-button hidden";
    delBtn.innerHTML = deleteActionBtn();

    return delBtn;
  }

  return createNote();
};
