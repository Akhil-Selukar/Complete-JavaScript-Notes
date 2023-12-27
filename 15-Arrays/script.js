"use strict";

// Defining an array
const subjects = ["English", "Science", "Geography", "Mathematics"];
const languages = new Array("C", "Java", "Python");

console.log(subjects);
console.log(languages);

// Accessing array elements
console.log(`First subject is ${subjects[0]}`);
console.log(`Third subject is ${subjects[2]}`);
console.log(`Second language is ${languages[1]}`);
console.log(`Tenth language is ${languages[10]}`);

// Operations on array
subjects[2] = "Computer science";
console.log(subjects);
languages[5] = "C#";
console.log(languages);
// subjects = languages;

const skills = ["Coding", "Debugging", "Testing"];

console.log(skills);
skills.push("Devops");
console.log(skills);
const poppedElement = skills.pop();
console.log(skills);
console.log(`Popped element is ${poppedElement}`);

skills.unshift("GitHub");
console.log(skills);
const shiftedElement = skills.shift();
console.log(skills);
console.log(`Shifted element is ${shiftedElement}`);

console.log(skills.indexOf("Debugging"));
console.log(skills.indexOf("Marketing"));

console.log(skills.includes("Coding"));
console.log(skills.includes("Swimming"));

console.log(skills.length);
