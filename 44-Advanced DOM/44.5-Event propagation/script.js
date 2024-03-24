"use strict";

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;

document.querySelector(".nav__link").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("Link");
  },
  true
);

document.querySelector(".nav__links").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("Links_Section");
    e.stopPropagation();
  },
  true
);

document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("Nav");
  },
  true
);
