"use strict";

const restaurent = {
  name: "Biryani house",
  location: "8th block, 221B - Baker St, London, UK",
  specialities: ["Biryani", "barbeque", "Non-Veg curry"],
  starters: ["Fish-fry", "Chicken-fry", "Boiled-egg"],
  mainCourse: [
    "Chicken curry",
    "Egg curry",
    "Fish curry",
    "Egg biryani",
    "Chicken biryani",
  ],

  order: function (starterIndex, mainCourseIndex) {
    return [this.starters[starterIndex], this.mainCourse[mainCourseIndex]];
  },
};

const [item1, item2] = restaurent.order(2, 4);

console.log(`Ordered item 1 is ${item1}`);
console.log(`Ordered item 2 is ${item2}`);
