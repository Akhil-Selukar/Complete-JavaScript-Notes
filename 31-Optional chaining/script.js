"use strict";

const address = {
  block: "8th Block",
  street: "221B - Baker St",
  country: "UK",
};

const sheldon = {
  fullName: "Sheldon Cooper",
  contactNumber: 9874563215,
  age: 36,
  address,
  getInfo() {
    return `This is ${this.fullName}, I'm ${this.age} old and my contact number is ${this.contactNumber}.`;
  },
};

const leonard = {
  fullName: "Leonard Hofstadter",
  contactNumber: 9632587415,
  age: 34,
  // address,
  // getInfo() {
  //   return `This is ${this.fullName}, I'm ${this.age} old and my contact number is ${this.contactNumber}.`;
  // },
};

console.log(sheldon.address.street);
// console.log(leonard.address?.street);
console.log(leonard.address?.street ?? "Address not available.");

console.log(sheldon.getInfo?.());
console.log(leonard.getInfo?.() ?? "Something went wrong.!");
