const createNoteElement = () => {
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
  details.className = "details text-xl";

  const values = ["10/02/2025", "10:00"];

  // Assuming items is an array of elements you want to append
  const timestamp = ["Date:", "Time:"].map((label, index) => {
    const item = document.createElement("div");
    item.className = `flex gap-3`;

    const labelSpan = document.createElement("span");
    labelSpan.className = "label border-b-2 border-gray-300";
    labelSpan.textContent = label;

    const valueSpan = document.createElement("span");
    valueSpan.textContent = values[index];

    item.append(labelSpan, valueSpan);

    return item; // Return the created item
  });

  // Append all created items to the details container using the spread operator
  details.append(...timestamp);

  note.appendChild(content);
  note.appendChild(details);
  div.appendChild(note);

  return div;
};

const init = () => {
  const container = document.getElementById("notes");
  const noteElement = createNoteElement();
  container.appendChild(noteElement);
};

document.addEventListener("DOMContentLoaded", init);
