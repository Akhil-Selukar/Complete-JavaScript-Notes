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

// subjects[4] = languages;
// console.log(subjects);

// subjects = languages;
