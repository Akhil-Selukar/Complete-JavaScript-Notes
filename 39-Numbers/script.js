"use strict";

console.log(32 === 32.0);

console.log(0.1 + 0.2 === 0.3);
console.log(0.1 + 0.2);

console.log(typeof "55");
console.log(typeof Number("55"));
console.log(Number("55a"));

console.log(typeof +"55");
// console.log(+"55aa");

console.log(typeof Number.parseInt("35"));
console.log(Number.parseInt("35"));

console.log(Number.parseInt("35abcd"));

console.log(Number.parseInt("38.23abcd"));
console.log(Number.parseFloat("38.23abcd"));

console.log(Number.parseInt("1001abcd"));
console.log(Number.parseInt("1001abcd", 10));
console.log(Number.parseInt("1001abcd", 2));

// To check finite value.
console.log(Number.isFinite(20));
console.log(Number.isFinite(20.12));
console.log(Number.isFinite("20.12"));
console.log(Number.isFinite(+"20.12"));
console.log(Number.isFinite(+"20.12abc"));
console.log(Number.isFinite(2 / 0));
