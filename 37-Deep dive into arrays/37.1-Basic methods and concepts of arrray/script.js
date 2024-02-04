"use strict";

const friends = [
  "Sheldon",
  "Leonard",
  "Penny",
  "Amy",
  "Howard",
  "Bernadette",
  "Raj",
];

console.log(friends.length);

// // Slice
console.log(friends.slice(2));
console.log(friends.slice(2, 5));
console.log(friends.slice(-3));
console.log(friends.slice());
console.log([...friends]);

// // Splice
// console.log(friends.splice(2));
// console.log(friends);

// console.log(friends.splice(2, 3));
// console.log(friends);

// console.log(friends.splice(-4, 2));
// console.log(friends);

const otherCasts = ["Stuart", "Priya", "Missy", "Leslie", "Zack"];
// console.log(otherCasts.reverse());
// console.log(otherCasts);

// const allCasts = friends.concat(otherCasts);
// console.log(allCasts);
// console.log([...friends, ...otherCasts]);

console.log(otherCasts.join("-"));

// // at method

const colors = ["Red", "Green", "Blue", "Orange", "White"];

console.log(colors[0]);
console.log(colors.at(0));

console.log(colors.at(-1));
console.log(colors.at(-2));

const firstName = "Sheldon";

console.log(firstName.at(1));

// ForEach loop.
const rainbow = [
  "Violet",
  "Indigo",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Red",
];

// for (const color of rainbow) {
//   console.log(`Rainbow has ${color} color.`);
// }

// rainbow.forEach(function (color) {
//   console.log(`Rainbow has ${color} color.`);
// });

rainbow.forEach(function (color, index) {
  console.log(`color ${index + 1} in rainbow is ${color}.`);
});
