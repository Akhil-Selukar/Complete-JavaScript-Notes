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

console.log(friends.slice(2));
console.log(friends.slice(2, 5));
console.log(friends.slice(-3));
console.log(friends.slice());
console.log([...friends]);
