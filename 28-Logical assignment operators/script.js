"use strict";

const shop_1 = {
  bookCount: 1,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
};

const shop_2 = {
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

// Using normal || short circuiting.
// shop_1.bookCount = shop_1.bookCount || 5;
// shop_2.bookCount = shop_2.bookCount || 5;

// Using logical OR (||=)
// shop_1.bookCount ||= 5;
// shop_2.bookCount ||= 5;

// --------------------------------

// Using normal nullish coalescing
// shop_1.bookCount = shop_1.bookCount ?? 5;
// shop_2.bookCount = shop_2.bookCount ?? 5;

// Using logical nullish coalescing
// shop_1.bookCount ??= 5;
// shop_2.bookCount ??= 5;

// --------------------------------

// Using normal && short circuiting.
// shop_1.bookCount = shop_1.bookCount && "Undisclosed";
// shop_2.bookCount = shop_2.bookCount && "Undisclosed";

// Using logical AND assignment operator.
shop_1.bookCount &&= "Undisclosed";
shop_2.bookCount &&= "Undisclosed";

console.log(shop_1);
console.log(shop_2);
