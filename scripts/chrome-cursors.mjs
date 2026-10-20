// Usage: node scripts/chrome-cursors.mjs public/cursors [size]  (then: sips -s format png -z S S hand-X.svg --out hand-X.png)
// Writes hand-arrow/open/grab.svg in silver chrome. Each cursor is one smooth outline
// (drawn on a 32-unit grid) plus optional crease lines, so all three share one look.
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
const size = Number(process.argv[3] ?? 20);

const cursors = {
  // Classic pointer arrow, tip at (4, 2.5): the click point.
  arrow: {
    shape: "M4 2.5 L4 23.6 L9.1 18.7 L12.9 27.3 L16.7 25.7 L12.9 17.2 L20.1 16.9 Z",
    creases: [],
  },
  // Open hand, palm facing out: four slightly spread fingers, thumb out left. The fingers
  // meet in narrow notches, which the dark edge fills in as separations.
  open: {
    shape: `M9.6 6.6 C9.6 5.6 10.4 4.9 11.3 4.9 C12.2 4.9 13 5.6 13 6.6 L13.2 12.4
      C13.3 9 13.4 6 13.5 4.6 C13.5 3.6 14.3 2.9 15.2 2.9 C16.1 2.9 16.9 3.6 16.9 4.6 L17.1 12.2
      C17.2 9.4 17.3 7 17.4 5.6 C17.4 4.6 18.2 3.9 19.1 3.9 C20 3.9 20.8 4.6 20.8 5.6 L20.8 12.6
      C21 10.6 21.1 9.4 21.2 8.8 C21.3 7.9 22 7.3 22.8 7.4 C23.7 7.5 24.3 8.2 24.3 9.1 L24.3 18.8
      C24.3 24 21.4 27.8 17 27.8 L15.4 27.8 C12.8 27.8 11.2 26.8 10 25.2
      L6.4 20.4 C5.7 19.4 5.9 18 6.9 17.4 C7.8 16.9 8.8 17.2 9.4 18 L9.6 18.6 C9.6 14 9.6 10 9.6 6.6 Z`,
    creases: [
      "M9.4 18 C10 19.4 10.6 20.8 10.8 22",
    ],
  },
  // Scrunched fist: four rounded knuckles along the top, fingertips folded under, thumb out left.
  grab: {
    shape: `M8.6 13.6 C8.4 11.8 9.6 10.6 11 10.6 C12 10.6 12.6 11 13 11.6
      C13.3 10.4 14.2 9.7 15.3 9.7 C16.4 9.7 17.2 10.4 17.5 11.4
      C17.9 10.5 18.8 10 19.8 10.1 C20.9 10.3 21.6 11.1 21.7 12.1
      C22.2 11.6 22.9 11.4 23.5 11.6 C24.4 11.9 24.9 12.7 24.9 13.7 L24.9 19
      C24.9 23.8 21.9 27.2 17.6 27.2 L15.4 27.2 C12.4 27.2 10.4 25.8 9.2 23.6
      L7 19.6 C6.4 18.5 6.8 17.2 7.9 16.8 C8.8 16.5 9.6 16.9 10 17.6 L8.7 15.6 Z`,
    creases: [
      "M13 11.6 C13.1 12.8 13 13.8 12.8 14.6",
      "M17.5 11.4 C17.6 12.6 17.5 13.6 17.3 14.4",
      "M21.7 12.1 C21.8 13.2 21.7 14.1 21.5 14.8",
    ],
  },
};

// Silver bands, the same palette as the site's chrome lettering (--chrome-bands).
const bands = [
  ["0", "#f7f7fa"], ["0.16", "#a6a6ae"], ["0.3", "#f3f3f6"], ["0.44", "#8a8a93"],
  ["0.52", "#2c2c32"], ["0.58", "#6e6e77"], ["0.72", "#d6d6dc"], ["0.84", "#f7f7fa"], ["1", "#92929a"],
];

for (const [name, { shape, creases }] of Object.entries(cursors)) {
  const id = (part) => `${name}-${part}`;
  const stops = bands.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");
  const creaseLines = creases
    .map((d) => `\n  <path d="${d}" fill="none" stroke="#26262c" stroke-opacity="0.75" stroke-width="0.7" stroke-linecap="round"/>`)
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <!-- Silver chrome ${name} cursor: small soft shadow, dark rounded edge, banded chrome fill,
       bright bevel${creases.length ? ", finger creases" : ""}. Generated together so all three share one look. -->
  <defs>
    <linearGradient id="${id("chrome")}" gradientUnits="userSpaceOnUse" x1="5" y1="2" x2="21" y2="30">${stops}</linearGradient>
    <linearGradient id="${id("rim")}" gradientUnits="userSpaceOnUse" x1="4" y1="2" x2="18" y2="28">
      <stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0.55"/><stop offset="1" stop-color="#4a4a52"/>
    </linearGradient>
    <path id="${id("shape")}" d="${shape.replace(/\s+/g, " ")}"/>
  </defs>
  <use href="#${id("shape")}" transform="translate(0.45 0.65)" fill="#000" fill-opacity="0.18" stroke="#000" stroke-opacity="0.18" stroke-width="1.6" stroke-linejoin="round"/>
  <use href="#${id("shape")}" fill="#26262c" stroke="#26262c" stroke-width="2" stroke-linejoin="round"/>
  <use href="#${id("shape")}" fill="url(#${id("chrome")})"/>
  <use href="#${id("shape")}" fill="none" stroke="url(#${id("rim")})" stroke-width="0.8" stroke-linejoin="round"/>${creaseLines}
</svg>
`;
  writeFileSync(join(dir, `hand-${name}.svg`), svg);
  console.log(`wrote hand-${name}.svg at ${size}px`);
}
