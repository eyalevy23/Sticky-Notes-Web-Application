import { deleteActionBtn } from "./deleteBtn.js";
import { setupNoteTracking } from "./trackingActiveNote.js";

export const getRandomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

export const pastelColors = [
  "#ffc", // Pastel Yellow
  "#ccf", // Pastel Mint
  "#cfc", // Pastel Green
  "#cff", // Pastel Cyan
  "#fcc", // Pastel Pink
  "#fcf", // Pastel Lavender
  "#ffc", // Pastel Peach
];

const degrees = [
  "-rotate-7deg",
  "-rotate-5deg",
  "-rotate-2deg",
  "rotate-2deg",
  "rotate-5deg",
  "rotate-7deg",
];
const positions = ["-top-1", "top-0", "top-1"];

const pinPosition = ["", "transform: scaleX(-1)"];

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
    // const bgColor = getRandomElement(pastelColors);
    const rotation = getRandomElement(degrees);
    const position = getRandomElement(positions);

    const note = document.createElement("div");
    note.className = `note flex flex-col justify-between bg-[${noteObj.color}] ${rotation} ${position}`;
    note.dataset.id = noteObj.id;

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
    noteObj.color = getRandomElement(pastelColors);
  }

  function createNote() {
    pickNoteColor();

    const div = document.createElement("div");
    div.className = "relative";

    const note = createNoteContainer();

    const timestamp = createTimeStamp();

    const img = createImg();

    const delBtn = createDeleteButton();

    const row = mergeTimestampAndDelBtnToOneRow(timestamp, delBtn);

    note.appendChild(row);
    div.append(img, note);

    setEventListener(div, delBtn);

    return div;
  }

  function mergeTimestampAndDelBtnToOneRow(timestamp, btn) {
    const grid = document.createElement("div");
    grid.classList = "grid grid-cols-3";

    const span1 = document.createElement("div");
    span1.className = "col-span-2";
    span1.appendChild(timestamp);

    const span2 = document.createElement("div");
    span2.className = "col-span-1 flex justify-end items-end";
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

  function setEventListener(div, delBtn) {
    const note = div.querySelector(".note");

    function handleTouchEvent() {
      note.classList.add("active");
      delBtn.classList.remove("hidden");

      // Listen for a click outside `div` to remove the active class
      document.addEventListener(
        "click",
        (e) => {
          if (!div.contains(e.target)) {
            note.classList.remove("active");
            delBtn.classList.add("hidden");
          }
        },
        { once: true } // Ensures this event runs only once
      );
    }

    // Click event to show the note and delete button
    div.addEventListener("click", handleTouchEvent, { once: true });

    // Example delete button action
    delBtn.addEventListener("click", () => alert(1));
  }

  return createNote();
};
