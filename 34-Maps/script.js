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

const mcq = new Map([
  ["question", "Which of the following is not one of the rainbow colors?"],
  [1, "Red"],
  [2, "Orange"],
  [3, "Pink"],
  [4, "Green"],
  ["answerKey", 3],
  [true, "You'r answer is correct..!"],
  [false, "Sorry, but wrong answer..!"],
]);

// console.log(mcq);

// // convertion of object to map
// const rainbowObject = {
//   color1: "Violet",
//   color2: "Indigo",
//   color3: "Blue",
//   color4: "Green",
//   color5: "Yellow",
//   color6: "Orange",
//   color7: "Red",
// };

// const rainbowMap = new Map(Object.entries(rainbowObject));

// console.log(rainbowMap);

console.log(mcq.get("question"));

for (const [key, value] of mcq) {
  if (typeof key === "number") {
    console.log(`Option ${key} : ${value}`);
  }
}

const userSelection = 3;
console.log(mcq.get(userSelection === mcq.get("answerKey")));

// // converting map to array
// const friends = new Map([
//   [1, "Leonard"],
//   [2, "Sheldon"],
//   [3, "Amy"],
//   [4, "Penny"],
// ]);

// console.log(friends);

// console.log([...friends]);

// console.log([...friends.keys()]);
// console.log([...friends.values()]);
