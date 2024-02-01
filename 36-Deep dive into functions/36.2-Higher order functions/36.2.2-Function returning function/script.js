"use strict";

const greet = function (greetingMessage) {
  return function (userName) {
    console.log(`${greetingMessage} ${userName}`);
  };
};

const hiGreeting = greet("Hi");
const helloGreeting = greet("Hello");

console.log(typeof hiGreeting);
console.log(typeof helloGreeting);

hiGreeting("Sheldon");
helloGreeting("Sheldon");
