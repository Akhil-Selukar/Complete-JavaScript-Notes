"use strict";

class Employee {
  constructor(firstName, lastName, companyName, contactNo) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.companyName = companyName;
    this.contactNo = contactNo;
  }

  welcome() {
    console.log(
      `Hello ${this.firstName} ${this.lastName}, welcome to ${this.companyName}.`
    );
  }
}

const leonard = new Employee(
  "Leanord",
  "Hofstadter",
  "Caltech university",
  9874563215
);

console.log(leonard);
leonard.welcome();
