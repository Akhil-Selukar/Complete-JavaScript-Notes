"use strict";

const addition = function (num1, num2) {
  return num1 + num2;
};

const multiplication = function (num1, num2) {
  return num1 * num2;
};

// Higher order function
const calculate = function (num1, num2, fn) {
  console.log(`Operation being performed : ${fn.name}`);
  console.log(`Result of operation is ${fn(num1, num2)}`);
};

calculate(4, 5, addition);
calculate(4, 5, multiplication);
