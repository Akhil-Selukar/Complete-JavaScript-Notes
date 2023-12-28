"use strict";

const employee = {
  firstName: "Sheldon",
  lastName: "Cooper",
  age: 36,
  skills: ["Javascript", "Python", "Azure", "Physics"],
  yearlySalary: 12000,

  calcMonthlySalary: function () {
    this.monthlySalary = this.yearlySalary / 12;
    return this.monthlySalary;
  },

  toString: function () {
    return `This is ${this.firstName} ${this.lastName}, a ${
      this.age
    }-year old employee with monthly salary of ${this.calcMonthlySalary()}$`;
  },
};

console.log(employee.calcMonthlySalary());
console.log(employee.monthlySalary);
console.log(employee.monthlySalary);

console.log(employee.toString());
