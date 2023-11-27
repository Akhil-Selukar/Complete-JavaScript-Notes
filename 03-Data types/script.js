let firstName = "Akhil";
let age = 27;
let isHired = true;
let mobileNumber = BigInt(123456789);
let message = Symbol("This is a message..!!");
let salary;
let insurance = null;

console.log(typeof firstName);
console.log(typeof age);
console.log(typeof isHired);
console.log(typeof mobileNumber);
console.log(typeof message);
console.log(typeof salary);
console.log(typeof insurance);

// Object

let employee = {
  firstName: "Akhil",
  age: 27,
  isHired: true,
  mobileNumber: BigInt(123456789),
};

console.log(typeof employee);

console.log(employee["firstName"]);
console.log(employee["isHired"]);
