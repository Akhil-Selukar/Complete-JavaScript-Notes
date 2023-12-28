"use strict";

// Defining an object

const employee = {
  firstName: "Sheldon",
  lastName: "Cooper",
  age: 36,
  company: "BBT",
  skills: ["Javascript", "Python", "Azure", "Physics"],
};

console.log(employee);

// Accessing elements in an object.
console.log(employee.firstName);
console.log(employee["lastName"]);

const propertyName = prompt("enter the property name you want to see : ");
console.log(employee.propertyName);
console.log(employee[propertyName]);

// Adding properties to the object.
employee.location = "USA";
employee["contactNumber"] = 9874563215;

console.log(employee);
