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
    details.className = "text-xl";

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

    note.appendChild(timestamp);
    div.append(img, note);

    return div;
  }

  return createNote();
};
