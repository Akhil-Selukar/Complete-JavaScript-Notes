"use strict";

const now = new Date();
console.log(now);

const newYear = new Date("January 01 2023 00:00:00");
console.log(newYear);
const christmas = new Date("Dec 25, 2023");
console.log(christmas);
const transactionDate = new Date("2020-12-24T09:12:34.457Z");
console.log(transactionDate);

const newDate = new Date(2020, 7, 13, 12, 38, 43);
console.log(newDate);

const unixDate = new Date(0);
console.log(unixDate);

// 4 * 24 * 60 * 60 * 1000 = 345600000
const fourDayPastUnixDate = new Date(345600000);
console.log(fourDayPastUnixDate);

// Date methods

const myDate = new Date("March 07 2023 05:43:12");
console.log(myDate);

console.log(myDate.getFullYear());
console.log(myDate.getMonth());
console.log(myDate.getDate());
console.log(myDate.getDay());
console.log(myDate.getHours());
console.log(myDate.getMinutes());
console.log(myDate.getSeconds());
console.log(myDate.toISOString());
console.log(myDate.getTime());

myDate.setFullYear(2025);
console.log(myDate);

console.log(Date.now());
