"use strict";

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("You have purchased the lottery, now sit back and relax..!!");

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("You win the lottery..!!");
    } else {
      reject(new Error("You lost the lottery..!!"));
    }
  }, 1000);
});

lotteryPromise
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

console.log("Other stuff..!!");
console.log("Waiting for lottery result..!!");
console.log("Went for dinner..!!");
console.log("Next day..!!");

// promisifying setTimeout

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2).then(() => {
//   console.log("Waited for 2 sec");
// });

// wait(5)
//   .then(() => {
//     console.log("waited for 5 sec");
//     return wait(6);
//   })
//   .then(() => {
//     console.log("waited for additional 6 sec after earlier 5 sec.");
//   });
