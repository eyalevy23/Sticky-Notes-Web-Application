import { FormManager } from "./src/formManger.js";

const init = () => {
  // localStorage.clear();
  new FormManager();
  // Pre-calculate random positions upfront for better performance
  const notes = gsap.utils.toArray(".note");
  const randomX = notes.map(() => Math.random() * 4000 - 2000); // -200 to 200

  gsap.fromTo(
    notes,
    {
      opacity: 0,
      x: (i) => randomX[i], // Use pre-generated random values
    },
    {
      x: 0,
      opacity: 1,

      duration: 0.8, // Longer duration for smoother perception
      stagger: {
        each: 0.15,
        from: "center", // Better distribution
        ease: "power2.inOut",
      },
      clearProps: "all", // This clears the y transform after animation completes
    }
  );
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
