"use strict";

// Selections
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// Modal window
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

// 44.6 - Event Delegation

// document.querySelectorAll(".nav__link").forEach(function (individual_link) {
//   individual_link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const linkId = this.getAttribute("href");
//     document.querySelector(linkId).scrollIntoView({ behavior: "smooth" });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const linkId = e.target.getAttribute("href");
    document.querySelector(linkId).scrollIntoView({ behavior: "smooth" });
  }
});
