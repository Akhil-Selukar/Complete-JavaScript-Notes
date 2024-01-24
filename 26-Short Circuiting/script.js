"use strict";

console.log(3 || "John");
console.log(0 || "John");
console.log("John" || 0);
console.log(null || 4);
console.log(0 || null);
console.log(null || "john" || 0);
console.log(undefined || 6);

let number = 12;

const result = true || number++;

console.log(result);
console.log(number);

console.log(3 && "John");
console.log(0 && "John");
console.log("John" && 0);
console.log(null && 4);
console.log(0 && null);
console.log("John" && null && 0);
console.log(undefined && 6);

let number2 = 12;

const result2 = true && number2++;

console.log(result2);
console.log(number2);
