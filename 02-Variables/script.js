let firstName = "Akhil";
let lastName = "Selukar";

console.log(firstName);
console.log(lastName);

let number_1 = 5;
let number_2 = 6;

console.log(number_1 + number_2);

// difference between var and let

var number1 = 10;
console.log("first - " + number1);
{
  console.log("second - " + number1);
  number1 = 20;
  console.log("third - " + number1);
}
console.log("fourth - " + number1);

let number2 = 100;
console.log("first - " + number2);
{
  let number2 = 200;
  console.log("second - " + number2);
}
console.log("third - " + number2);
