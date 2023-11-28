const currentYear = 2024;
const ageSam = currentYear - 1998;
const ageMax = currentYear - 1992;

console.log("Sam's age - ", ageSam);
console.log("Max's age - ", ageMax);

// arithmetic operators
console.log("Addition of 2 and 3 is", 2 + 3);
console.log("Subtraction of 8 and 5 is", 8 - 5);
console.log("Multiplication of 6 and 3 is", 6 * 3);
console.log("8 Divided by 3 is", 8 / 3);
console.log("2 to the power of 4 is ", 2 ** 4);

// + operator to concatinate strings
console.log(2 + "Hello");
console.log("Hello" + 2);
console.log("Hello" + 2 + 2);
console.log(2 + 2 + "Hello");
console.log("Hello" + " " + "world");

// assignment operators
let addition = 6 + 7; // 13
console.log("addition is ", addition);

addition += 2; // 15
console.log("after += operation addition is", addition);

addition -= 5; // 10
console.log("after -= operation addition is", addition);

addition *= 4; // 40
console.log("after *= operation addition is", addition);

// increment decrement operators
let x = 7;
x++;
console.log("x++ is ", x);
x--;
console.log("x-- is ", x);

// comparison operators
console.log(10 > 6);
console.log(10 < 6);
console.log(10 >= 10);
console.log(10 <= 10);
console.log(10 == 10);
console.log(10 == "10");
console.log(10 === "10");
console.log("10" === "10");

// operator precedence
let firstNumber = 20 - 6;
let secondNumber = 10 + 2;

console.log(firstNumber);
console.log(secondNumber);

let a, b;
a = b = 12 + 2 - 3;
console.log(a, b);

// updating precedence
let number_1 = 10;
let number_2 = 20;

let average = number_1 + number_2 / 2;
console.log(average);

average = (number_1 + number_2) / 2;
console.log(average);
