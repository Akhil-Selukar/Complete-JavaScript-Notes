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
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const imageTargets = document.querySelectorAll("img[data-src]");

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

// 44.11 - Smooth loading of sections.

const sectionLoader = function (entries, observer) {
  const [entry] = entries;

  // console.log(entry);

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(sectionLoader, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

// 44.12 - Lazy loading of images.

const imageLoader = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // guard class - will terminate execution if the image is not intersecting

  // replacing src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(imageLoader, {
  root: null,
  threshold: 0,
  rootMargin: "400px",
});

imageTargets.forEach((image) => imageObserver.observe(image));

// 44.13 - Slider component

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currentSlide = 0;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const moveToSlide = function (slideNumber) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - slideNumber)}%)`;
  });
};

const nextSlide = function () {
  if (currentSlide === slides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  moveToSlide(currentSlide);
  activateDot(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
  activateDot(currentSlide);
};

moveToSlide(0);
createDots();
activateDot(0);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  e.key === "ArrowLeft" && previousSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateDot(slide);
  }
});
