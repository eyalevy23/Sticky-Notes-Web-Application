import { FormManager } from "./src/formManger.js";

const init = () => {
  // localStorage.clear();
  new FormManager();

  setTimeout(() => {
    animateNotes();
  }, 10);

  const animateNotes = () => {
    gsap.from(".note", {
      y: 500,
      opacity: 0,
      duration: 0.2,
      stagger: 0.2, // Each circle animates with a slight delay
      ease: "power2.out",
      clearProps: "y",
    });
  };
};

document.addEventListener("DOMContentLoaded", init);
