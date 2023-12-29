"use strict";

for (let counter = 1; counter <= 10; counter++) {
  console.log(`Iteration number ${counter}`);
}

const rainbow = [
  "Violet",
  "Indogo",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Red",
];

for (let i = 0; i < rainbow.length; i++) {
  console.log(rainbow[i]);
}

// Break and continue statements.

for (let i = 0; i < rainbow.length; i++) {
  if (rainbow[i] === "Green") {
    break;
  }
  console.log(rainbow[i]);
}

for (let i = 0; i < rainbow.length; i++) {
  if (rainbow[i] === "Green") {
    continue;
  }
  console.log(rainbow[i]);
}
