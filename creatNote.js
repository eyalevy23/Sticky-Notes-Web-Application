export const createNewNote = (noteObj) => {
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const pastelColors = [
    "#FFEB8A",
    "#B2E0B2",
    "#A4C8E1",
    "#FFB3C1",
    "#E6B3E0",
    "#FFCCB3",
    "#B3FFF0",
  ];

  const degrees = ["-5deg", "-2deg", "1deg", "3deg", "6deg"];
  const positions = ["-top-1", "top-0", "top-1"];

  function createNote() {
    const div = document.createElement("div");
    div.className = "relative";

    const note = document.createElement("div");
    note.className = `note ${getRandomElement(positions)}`;
    note.style.backgroundColor = getRandomElement(pastelColors);
    note.style.transform = `rotate(${getRandomElement(degrees)})`;

    const title = document.createElement("h2");
    title.textContent = noteObj.title;

    const text = document.createElement("p");
    text.textContent = noteObj.text;

    note.append(title, text);

    const img = document.createElement("img");
    img.className = "pin";
    img.src = "/asset/image.svg";
    img.alt = "Pin";

    div.append(note, img);

    return div;
  }

  createNote();
};
