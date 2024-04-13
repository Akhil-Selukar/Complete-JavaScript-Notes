"use strict";

class Employee {
  constructor(firstName, lastName, yearOfJoining, company) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfJoining = yearOfJoining;
    this.company = company;
  }

  welcomeEmployee() {
    console.log(
      `Hello ${this.firstName} ${this.lastName}, welcome to ${this.company}.!!`
    );
  }

  getExperience() {
    console.log(`You have experience of ${2024 - this.yearOfJoining} years.`);
  }

  static printCompanyName() {
    console.log(`${this.company}`);
  }
}

class Developer extends Employee {
  constructor(
    firstName,
    lastName,
    yearOfJoining,
    company,
    primarySkill,
    secondarySkill
  ) {
    super(firstName, lastName, yearOfJoining, company);
    this.primarySkill = primarySkill;
    this.secondarySkill = secondarySkill;
  }

  introduce() {
    console.log(`Hello, my name is ${this.firstName}. And I am a Developer.!!`);
  }

  welcomeEmployee() {
    console.log(
      `Hello ${this.firstName} ${this.lastName}, welcome to ${this.company}.!!\nYou joined as a Develoepr.`
    );
  }
}

const howard = new Developer(
  "Howard",
  "Wolowitz",
  2021,
  "Caltech university",
  "Javascript",
  "Engineering"
);

howard.introduce();
howard.welcomeEmployee();
howard.getExperience();
// howard.printCompanyName();
