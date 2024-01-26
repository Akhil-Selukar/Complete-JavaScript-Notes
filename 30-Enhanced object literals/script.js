"use strict";

const address = {
  block: "8th Block",
  street: "221B - Baker St",
  country: "UK",
};

const john = {
  fullName: "John Doe",
  contactNumber: 9874563215,
  age: 36,
  address,
};

console.log(john);

const sheldon = {
  fullName: "sheldon cooper",
  contactNumber: 9874563215,
  age: 36,

  getInfo() {
    console.log(
      `This is ${this.fullName}, I'm ${this.age} old and my contact number is ${this.contactNumber}.`
    );
  },
};

console.log(sheldon.getInfo());

const details = ["fullName", "age", "job"];

const leonard = {
  [details[0]]: "Leonard Hofstadter",
  [details[1]]: 34,
  [`friend-${4 - 3}`]: "Sheldon cooper",
};

console.log(leonard);
