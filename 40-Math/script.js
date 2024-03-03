"use strict";

console.log(Math.sqrt(16));
console.log(16 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(12, 56, 3, 84, 46, 41));
console.log(Math.min(12, 56, 3, 84, 46, 41));

console.log(Math.trunc(12.556846));
console.log(Math.ceil(12.556846));
console.log(Math.floor(12.556846));
console.log(Math.round(12.556846));
console.log(Math.round(12.456846));
console.log(Math.round(12.5));

console.log((2.75684).toFixed(2));
console.log((2.75384).toFixed(2));
console.log((2.7).toFixed(3));

console.log(Math.random());

const randomNumberGenerator = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomNumberGenerator(0, 6));

console.log(Math.PI);
console.log(Math.abs(-12));
console.log(Math.abs(12));
