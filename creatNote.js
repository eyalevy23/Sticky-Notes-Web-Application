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

export const createNewNote = (noteObj) => {
  function createNote() {
    const div = document.createElement("div");
    div.className = "relative";

    const note = document.createElement("div");
    note.className =
      "note flex flex-col justify-between bg-[#A4C8E1] rotate-[-7deg]";

    const content = document.createElement("div");
    content.className = "content max-h-30 overflow-y-auto";
    const paragraph = document.createElement("p");
    paragraph.textContent =
      "# Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut doloribus reprehenderit nobis consectetur debitis libero ea explicabo alias ratione nulla incidunt odio repellat necessitatibus deserunt, ab et modi, vero repudiandae?";
    content.appendChild(paragraph);

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

    note.appendChild(content);
    note.appendChild(details);
    div.appendChild(note);

    return div;
  }

  createNote();
};
