import { createNewNote, getRandomElement, pastelColors } from "./createNote.js";

const init = () => {
  const container = document.getElementById("notes");

  for (let i = 0; i < 27; i++) {
    const newNote = {
      id: "8273823472834",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut doloribus reprehenderit nobis consectetur debitis libero ea explicabo alias ratione nulla incidunt odio repellat necessitatibus deserunt, ab et modi, vero repudiandae?",
      date: "10/12/2025",
      time: "10:30",
      color: getRandomElement(pastelColors),
    };
    const note = createNewNote(newNote);
    container.appendChild(note);
  }

  //   const div = document.createElement("div");
  //   div.className = "relative";
  //   div.innerHTML = `
  //         <div class="note flex flex-col justify-between -top-1 bg-[#A4C8E1] -rotate-7">
  //             <div class="max-h-30 overflow-y-auto">
  //                 <p># Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut doloribus reprehenderit nobis consectetur debitis libero ea explicabo alias ratione nulla incidunt odio repellat necessitatibus deserunt, ab et modi, vero repudiandae?</p>
  //             </div>
  //             <div class="text-xl">
  //                 <span class="flex gap-3"><span class="border-b-2 border-gray-300">Date:</span>10/02/2025</span>
  //                 <span class="flex gap-3"><span class="border-b-2 border-gray-300">Time:</span>12:30</span>
  //             </div>
  //         </div>
  //         <img class="pin" src="/asset/image.svg" alt="" />
  //   `;
  //   container.appendChild(div);
};

document.addEventListener("DOMContentLoaded", init);
