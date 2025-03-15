import { FormManager } from "./src/formManger.js";

const init = () => {
  // localStorage.clear();
  new FormManager();

  gsap.from(".note", {
    opacity: 0.1, // Start fully transparent
    duration: 0.3, // Slightly faster animation
    stagger: 0.3, // Slightly quicker stagger for smoother sequence
    ease: "power2.out(1.2)", // Using back.out for a slight overshoot that settles into place
  });
};

document.addEventListener("DOMContentLoaded", init);
