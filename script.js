import { FormManager } from "./src/formManger.js";

const getRandomPosition = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const animateNotes = () => {
  const notes = document.querySelectorAll(".note");

  notes.forEach((note) => {
    gsap.from(note, {
      x: getRandomPosition(-700, 700),
      y: getRandomPosition(-700, 700),
      opacity: 0,
      duration: 1.5,
      stagger: {
        amount: 0.8,
        from: "random",
      },
      ease: "power2.out",
      clearProps: "all",
    });
  });
};

const init = () => {
  new FormManager();

  setTimeout(() => {
    animateNotes();
  }, 10);
};

document.addEventListener("DOMContentLoaded", init);
