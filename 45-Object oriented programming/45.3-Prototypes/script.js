"use strict";

const Employee = function (firstName, lastName, companyName, contactNo) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.companyName = companyName;
  this.contactNo = contactNo;

  //   this.welcome = function () {
  //     console.log(`Hello ${firstName} ${lastName}, welcome to ${companyName}.`);
  //   };
};

Employee.prototype.welcome = function () {
  console.log(
    `Hello ${this.firstName} ${this.lastName}, welcome to ${this.companyName}.`
  );
};

Employee.prototype.employmentStatus = "Active";

const john = new Employee("John", "Doe", "ABC Infotech", 9876543210);
const sheldon = new Employee("Sheldon", "Cooper", "Caltech", 7412589635);

// console.log(john);
// console.log(sheldon);

john.welcome();
sheldon.welcome();

console.log(john.__proto__);

console.log(john.employmentStatus);
console.log(sheldon.employmentStatus);

console.log(john.hasOwnProperty("firstName"));
console.log(john.hasOwnProperty("employmentStatus"));

// console.log(john);
// console.log(john.__proto__);
// console.log(john.__proto__.__proto__);
// console.log(john.__proto__.__proto__.__proto__);
