"use strict";

const colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Pink"];

const [color1, , color3, ...remainingColors] = colors;
console.log(color1, color3, remainingColors);

const john = {
  fullName: "John doe",
  age: 35,
  contactNumber: 9874563215,
  address: "8th block, 221B - Baker St, London, UK",
};

const { fullName, contactNumber, ...remainingDetails } = john;

console.log(fullName);
console.log(contactNumber);
console.log(remainingDetails);

const library = {
  jsBook: {
    title: "Complete javascript bootcamp",
    cost: 150,
    pages: 400,
  },
  mongoDBBook: {
    title: "Complete guide to MongoDB",
    cost: 100,
    pages: 260,
  },
  funBook: {
    title: "Fun with flags",
    cost: 180,
    pages: 276,
  },
};

const {
  mongoDBBook: { cost, ...restMongo },
  ...restBooks
} = library;

console.log(cost);
console.log(restMongo);
console.log(restBooks);

function add(...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
}

add(3, 2);
add(5, 6, 8, 2);
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
