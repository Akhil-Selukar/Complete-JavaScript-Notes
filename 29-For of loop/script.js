"use strict";

const john = {
  fullName: "John doe",
  age: 35,
  contactNumber: 9874563215,
  frontEndSkills: ["HTML & CSS", "ReactJS", "AngularJS"],
  backEndSkills: ["Java", "Python", "Spring Boot"],
  otherSkills: ["DevOps", "git"],
};

const allSkills = [
  ...john.frontEndSkills,
  ...john.backEndSkills,
  ...john.otherSkills,
];

for (const skill of allSkills) {
  console.log(skill);
}

// console.log(...allSkills.entries());

for (const skill of allSkills.entries()) {
  console.log(`skill at index ${skill[0]} is ${skill[1]}`);
}

// for (const [index, value] of allSkills.entries()) {
//   console.log(`skill at index ${index} is ${value}`);
// }
