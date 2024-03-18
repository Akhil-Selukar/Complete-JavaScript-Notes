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

const allBtn = document.getElementsByClassName("btn");
console.log(allBtn);

const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

// cookieMsg.textContent = "We use cookie for better and faster performance and analytics purpose";

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn'>got it!</button>";

bodyElement.prepend(cookieMsg);
bodyElement.append(cookieMsg);
