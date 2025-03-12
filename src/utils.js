const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const pastelColors = [
  "#ffc", // Pastel Yellow
  "#ccf", // Pastel Mint
  "#cfc", // Pastel Green
  "#cff", // Pastel Cyan
  "#fcc", // Pastel Pink
  "#fcf", // Pastel Lavender
  "#ffc", // Pastel Peach
];

const degrees = [
  "-rotate-7deg",
  "-rotate-5deg",
  "-rotate-2deg",
  "rotate-2deg",
  "rotate-5deg",
  "rotate-7deg",
];

const positions = ["-top-1", "top-0", "top-1"];

const pinPosition = ["", "transform: scaleX(-1)"];

// Exporting all in one line
export { getRandomElement, pastelColors, degrees, positions, pinPosition };
