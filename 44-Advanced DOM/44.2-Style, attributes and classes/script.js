"use strict";

const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn cookie-close-btn'>got it!</button>";

bodyElement.after(cookieMsg);

cookieMsg.style.color = "#000000";
cookieMsg.style.backgroundColor = "#bbb";

console.log(cookieMsg.style.backgroundColor);
console.log(cookieMsg.style.width);

console.log(getComputedStyle(cookieMsg).width);

document.documentElement.style.setProperty("--color-primary", "#e6bf22");

const mainHeading = document.querySelector(".heading-1");

console.log(mainHeading.classList);
console.log(mainHeading.className);
