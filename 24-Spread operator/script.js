"use strict";

const colors = ["Red", "Green", "Blue", "Yellow"];
const newColors = ["Orange", "Pink", ...colors];

console.log(newColors);

const colorsCopy = [...colors];
console.log(colorsCopy);

const john = {
  fullName: "John doe",
  age: 36,
  phoneNumber: 9874563215,
  skills: ["Javascript", "Python", "ReactJS"],
};

// console.log(...john); // This is not allowed.

const updatedJohn = {
  address: "8th block, 221B - Baker St, London, UK",
  ...john,
  job: "Developer",
};

console.log(updatedJohn);
