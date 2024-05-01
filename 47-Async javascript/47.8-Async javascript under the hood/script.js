"use strict";

console.log("Line 1");
console.log("Line 2");
console.log("Line 3");

imgEl = document.querySelector(".img");
imgEl.src = "images/Finland.png";

imgEl.addEventListner("load", () => {
  imgEl.classList.add("fadeIn");
});

console.log("Line 4");

fetch("https://dummy.url/call").then((response) => {
  console.log(response);
});

console.log("Line 5");
console.log("Line 6");
