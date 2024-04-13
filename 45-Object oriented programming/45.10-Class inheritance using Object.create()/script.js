"use strict";

const EmployeeProto = {
  init(firstName, lastName, yearOfJoining, company) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfJoining = yearOfJoining;
    this.company = company;
  },

  welcomeEmployee() {
    console.log(
      `Hello ${this.firstName} ${this.lastName}, welcome to ${this.company}.!!`
    );
  },

  getExperience() {
    console.log(`You have experience of ${2024 - this.yearOfJoining} years.`);
  },
};

const DeveloperProto = Object.create(EmployeeProto);
DeveloperProto.init = function (
  firstName,
  lastName,
  yearOfJoining,
  company,
  primarySkill
) {
  EmployeeProto.init.call(this, firstName, lastName, yearOfJoining, company);
  this.primarySkill = primarySkill;
};

DeveloperProto.introduce = function () {
  console.log(`Hello, my name is ${this.firstName}. And I am a Developer.!!`);
};

DeveloperProto.welcomeEmployee = function () {
  console.log(
    `Hello ${this.firstName} ${this.lastName}, welcome to ${this.company}.!!\nYou joined as a Develoepr.`
  );
};

const howard = Object.create(DeveloperProto);
howard.init("Howard", "Wolowitz", 2021, "Caltech university", "Javascript");

// console.log(howard);
howard.introduce();
howard.welcomeEmployee();
howard.getExperience();
