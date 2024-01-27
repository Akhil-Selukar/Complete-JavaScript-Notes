"use strict";

const set1 = new Set([
  "Penny",
  "Sheldon",
  "Leonard",
  "Sheldon",
  "Penny",
  "Howard",
]);

console.log(set1);

const set2 = new Set("Bernadette");
console.log(set2);

console.log(set1.size);
console.log(set1.has("Bernadette"));
console.log(set1.has("Penny"));

set1.add("Raj");
console.log(set1);
set1.delete("Sheldon");
console.log(set1);
// set1.clear();
// console.log(set1);

for (const bbtCast of set1) {
  console.log(bbtCast);
}

const cart = ["bag", "mobile", "T-shirt", "bag", "T-shirt"];

const uniqueItems = [...new Set(cart)];
console.log(uniqueItems);
