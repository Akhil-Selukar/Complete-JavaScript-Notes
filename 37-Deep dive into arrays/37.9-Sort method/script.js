"use strict";

const userNames = [
  "Sheldon",
  "Penny",
  "Leonard",
  "Raj",
  "Howord",
  "Amy",
  "Bernadette",
];

console.log(userNames.sort());
console.log(userNames);

const numbers = [12, 53, -16, -45, 56, 81, -27, 3];
// console.log(numbers.sort());

// ascending order
// numbers.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

// descending order
// numbers.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

// ascending order simplified
// numbers.sort((a, b) => a - b);

// descending order simplified
numbers.sort((a, b) => b - a);

console.log(numbers);
