"use strict";

const rainbow = [
  "Violet",
  "Indigo",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Red",
];

// const modifiedRainbow = rainbow.map(function (color) {
//   return `Color ${color}`;
// });

const modifiedRainbow = rainbow.map((color) => `Color ${color}`);

console.log(modifiedRainbow);
console.log(rainbow);

const alphabets = ["A", "B", "C", "D"];

// const modifiedAlphabets = alphabets.map(function (value, index) {
//   return `Alphabet at index ${index} is '${value}'`;
// });

// console.log(modifiedAlphabets);

const modifiedAlphabets = alphabets.map(
  (value, index) => `Alphabet at index ${index} is '${value}'`
);

console.log(modifiedAlphabets);
