/**
 * Collection of constants and utility functions for note styling and positioning
 */

export const STYLE_CONSTANTS = {
  colors: {
    pastel: [
      "#ffc", // Yellow
      "#ccf", // Mint
      "#cfc", // Green
      "#cff", // Cyan
      "#fcc", // Pink
      "#fcf", // Lavender
      "#ffc", // Peach
    ],
  },
  rotation: [
    "-rotate-7deg",
    "-rotate-5deg",
    "-rotate-2deg",
    "rotate-2deg",
    "rotate-5deg",
    "rotate-7deg",
  ],
  position: ["-top-1", "top-0", "top-1"],
  pin: ["", "transform: scaleX(-1)"],
};

/**
 * Returns a random element from an array
 * @param {Array} arr - The array to select from
 * @returns {*} A random element from the array
 */
export const getRandomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];
