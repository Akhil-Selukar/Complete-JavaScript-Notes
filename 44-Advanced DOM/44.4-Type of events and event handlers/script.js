"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// 44.3 - Viewboard coordinates and smooth scrolling

const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnLearnMore.addEventListener("click", function (e) {
  // const section1Coordinates = section1.getBoundingClientRect();
  // console.log(section1Coordinates);

  // console.log(e.target.getBoundingClientRect());

  // console.log(`Current horizontal-scroll : ${window.scrollX}`);
  // console.log(`Current vertical-scroll : ${window.scrollY}`);

  // window.scrollTo({
  //   left: section1Coordinates.left + window.scrollX,
  //   top: section1Coordinates.top + window.scrollY,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

// Types of events and event Handlers

const h1Element = document.querySelector("h1");

// h1Element.addEventListener("mouseenter", function (e) {
//   alert("Your mouse entered the heading section..!!");
// });

// h1Element.onmouseenter = function (e) {
//   alert(
//     "Old style event handling - Your mouse entered the heading section..!!"
//   );
// };

const h1Handler = function () {
  alert("Your mouse entered the heading section..!!");
  h1Element.removeEventListener("mouseenter", h1Handler);
};

h1Element.addEventListener("mouseenter", h1Handler);
