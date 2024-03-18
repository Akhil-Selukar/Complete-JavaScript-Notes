"use strict";

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(document.querySelector(".heading-1"));

const buttons = document.querySelectorAll(".btn");
console.log(buttons);

console.log(document.getElementById("paragraph-1"));

const allParagraphs = document.getElementsByTagName("p");
console.log(allParagraphs);
