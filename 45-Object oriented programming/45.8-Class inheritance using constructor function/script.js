"use strict";

const Employee = function (firstName, lastName, joiningYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.joiningYear = joiningYear;
};

Employee.prototype.getExperience = function () {
  console.log(
    `${this.firstName} ${this.lastName} has total ${
      2024 - this.joiningYear
    } years of experience`
  );
};

const Hr = function (firstName, lastName, joiningYear, toolsUsed) {
  Employee.call(this, firstName, lastName, joiningYear);
  this.toolsUsed = toolsUsed;
};

Hr.prototype = Object.create(Employee.prototype);

Hr.prototype.info = function () {
  console.log(
    `${this.firstName} ${this.lastName} is a Hr with experience in ${this.toolsUsed}`
  );
};

const katrina = new Hr("Kartina", "Bennett", 2020, "Workday");
// console.log(katrina);
katrina.info();
katrina.getExperience();

console.log(katrina instanceof Hr);
console.log(katrina instanceof Employee);
console.log(katrina instanceof Object);

console.log(katrina.__proto__);
