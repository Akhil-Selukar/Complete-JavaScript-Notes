"use strict";

function logger(lineNumber) {
  console.log(`This is a logger at line number ${lineNumber}`);
}

logger(7);
logger(8);

function addition(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

const result1 = addition(5, 3);
console.log(result1);

const result2 = addition(17, 20);
console.log(result2);
