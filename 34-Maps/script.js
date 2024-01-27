"use strict";

const penny = new Map();
penny.set("firstName", "Penny");
penny.set(1, "Leonard");

// console.log(penny);

// console.log(penny.set(2, "Sheldon"));

penny
  .set(2, "Sheldon")
  .set(3, "Bernadette")
  .set(4, "Raj")
  .set(5, "Amy")
  .set(6, "Howard")
  .set(true, "Penny is a waitress")
  .set(false, "Penny is a physicist");

// console.log(penny);

console.log(penny.get("firstName"));
console.log(penny.get(4));
console.log(penny.get(false));
console.log(penny.get("4"));

const orderItems = new Map();

orderItems
  .set(1, "Pizza")
  // .set(2, "Pasta")
  .set(3, "French toast")
  .set(2, "Coffee");

// console.log(orderItems);

console.log(orderItems.has(1));
orderItems.delete(3);
console.log(orderItems);

const colors = new Map();

colors.set(1, "Red").set(2, "Green").set(3, "Blue").set(4, "Orange");

console.log(colors.size);
colors.clear();
console.log(colors.size);

const theMap = new Map();
// theMap.set([1, 2], "Map value");
// console.log(theMap.get([1, 2]));

const keyArray = [1, 2];
theMap.set(keyArray, "Map value");
console.log(theMap.get(keyArray));
