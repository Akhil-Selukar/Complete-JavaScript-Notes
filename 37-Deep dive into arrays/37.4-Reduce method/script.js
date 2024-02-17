"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];

// const runsScored1 = runsThisOver.reduce(function (total, runs) {
//   return runs + total;
// }, 0);
// console.log(runsScored1);

const runsScored = runsThisOver.reduce((total, runs) => runs + total, 0);
console.log(runsScored);

const maxValue = runsThisOver.reduce((max, runs) => {
  if (max > runs) return max;
  else return runs;
}, runsThisOver[0]);

console.log(maxValue);
