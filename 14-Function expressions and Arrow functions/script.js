"use strict";

const num1 = 5;
const num2 = 3;

const result1 = addition1(num1, num2);
console.log(`addition of ${num1} and ${num2} is ${result1}`);

// function declaration
function addition1(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

//  function expression
const addition2 = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
};

const result2 = addition2(num1, num2);
console.log(`addition of ${num1} and ${num2} is ${result2}`);

// Arraw function
const addition3 = (firstNumber, secondNumber) => {
  console.log(
    `Adding ${firstNumber} and ${secondNumber} using arrow function.`
  );
  return firstNumber + secondNumber;
};

const result3 = addition3(6, 8);
console.log("Addition using arrow function is " + result3);

const welcome = () => `Hello, User`;
console.log(welcome());
