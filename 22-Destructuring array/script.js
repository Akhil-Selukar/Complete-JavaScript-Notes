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

// const colors = ["Red", "Green", "Blue"];

// // Using array index
// const color_1 = colors[0];
// const color_2 = colors[1];
// const color_3 = colors[2];

// console.log(color_1, color_2, color_3);

// // Using destructuring of array
// const [newColor_1, newColor_2, newColor_3] = colors;

// console.log(newColor_1, newColor_2, newColor_3);

// const colors = ["Red", "Green", "Blue", "Yellow", "Black"];

// // Destracturing to get only first two elements.
// const [newColor_1, , newColor_2] = colors;

// console.log(newColor_1, newColor_2);

const numbers = [10, 12];

const [num1 = 0, num2 = 0, num3 = 0] = numbers;
console.log(num1);
console.log(num2);
console.log(num3);
