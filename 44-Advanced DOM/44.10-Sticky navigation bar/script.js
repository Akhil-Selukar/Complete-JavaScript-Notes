"use strict";

// Selections
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

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

// 44.8 - Tabbed component

tabContainer.addEventListener("click", function (e) {
  const clickedTab = e.target.closest(".operations__tab");

  // To prevent click on elsewhere apart from tabs as we are using event deligation and added event handler to common parent of all tabs.
  if (!clickedTab) return;

  // Adding active tab style (clear from all tabs first and then add to selected tab only.)
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clickedTab.classList.add("operations__tab--active");

  // Activating the appropriate content as per the selected tab.
  const tabNumber = clickedTab.dataset.tab;
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${tabNumber}`)
    .classList.add("operations__content--active");
});

// 44.9 - Hover efect on navlinks (Passing argument to handler function).

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const linkHovered = e.target;
    const siblings = linkHovered.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((link) => {
      if (link != linkHovered) {
        link.style.opacity = this;
      }
    });
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// 44.10 - Sticky navigation

// const initialCoordinateOfS1 = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   // console.log(e);
//   if (this.window.scrollY > initialCoordinateOfS1.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// IntersectionObserver API

// const observerCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0.1, 0.2],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);

// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const stickyNavOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, stickyNavOptions);

headerObserver.observe(header);
