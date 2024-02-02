"use strict";

// Normal function

const sayHello = function () {
  console.log("Hello from regular function..!!");
};

sayHello();
sayHello();

// Immediately invoked function expression.

(function welcome() {
  console.log("I welcome only once..!!");
})();

(() => console.log("Again, I welcome only once..!!"))();
