const num1 = 5;
const num2 = 3;

const result1 = addition1(num1, num2);
console.log(`addition of ${num1} and ${num2} is ${result1}`);

// function declaration
function addition1(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

const result2 = addition2(num1, num2);
console.log(`addition of ${num1} and ${num2} is ${result2}`);

//  function expression
const addition2 = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
};
