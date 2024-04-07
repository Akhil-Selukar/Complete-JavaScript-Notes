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

const john = new Employee("John", "Doe", "ABC Infotech", 9876543210);
const sheldon = new Employee("Sheldon", "Cooper", "Caltech", 7412589635);

console.log(john);
console.log(sheldon);

// john.welcome();
// sheldon.welcome();
