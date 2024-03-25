"use strict";

const navLinks = document.querySelector(".nav__links");

// //////// Elements downward to the selected element i.e child.
// console.log(navLinks.querySelectorAll(".nav__link"));

// console.log(navLinks.childNodes);
// console.log(navLinks.children);

// navLinks.firstElementChild.style.color = "green";
// navLinks.lastElementChild.style.backgroundColor = "red";

// //////// Elements upward to the selected element i.e parent.

const btnOpenAccount = document.querySelector(".nav__link--btn");

// console.log(btnOpenAccount.parentNode);
// console.log(btnOpenAccount.parentElement);

// console.log(btnOpenAccount.closest(".nav__links"));

// btnOpenAccount.closest(".nav__links").style.backgroundColor = "skyblue";

// //////// Elements adjucent to the selected element i.e siblings.
const firstNavItem = document.querySelector(".nav__item");

console.log(firstNavItem.previousElementSibling);
console.log(firstNavItem.nextElementSibling);

console.log(firstNavItem.previousSibling);
console.log(firstNavItem.nextSibling);

console.log(firstNavItem.parentElement.children);
