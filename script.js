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

// gsap.from(".note", {
//   y: 3, // Start 30px below final position (reduced from 50px)
//   opacity: 0, // Start fully transparent
//   duration: 1.8, // Slightly faster animation
//   stagger: 0.5, // Slightly quicker stagger for smoother sequence
//   ease: "back.out(1.2)", // Using back.out for a slight overshoot that settles into place
//   clearProps: "y", // This clears the y transform after animation completes
// });
