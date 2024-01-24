"use strict";

const shop = {
  bookCount: 0,
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

const booksAvailable = shop.bookCount ?? "Not a book shop!";
console.log(booksAvailable);
const toysAvailable = shop.toysCount || "Not a toy shop!";
console.log(toysAvailable);
