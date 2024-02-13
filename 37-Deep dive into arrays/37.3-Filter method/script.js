"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];

// const boundries1 = runsThisOver.filter(function (runs) {
//   return runs >= 4;
// });
// console.log(boundries1);

const boundries = runsThisOver.filter((runs) => runs >= 4);
console.log(boundries);
