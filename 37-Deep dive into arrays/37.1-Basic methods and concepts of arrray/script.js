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

// Slice
console.log(friends.slice(2));
console.log(friends.slice(2, 5));
console.log(friends.slice(-3));
console.log(friends.slice());
console.log([...friends]);

// Splice
// console.log(friends.splice(2));
// console.log(friends);

// console.log(friends.splice(2, 3));
// console.log(friends);

console.log(friends.splice(-4, 2));
console.log(friends);
