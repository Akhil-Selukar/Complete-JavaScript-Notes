"use strict";

// const pizza = {
//   pizzaBase: "Thin crust",
//   toppings: ["Onion", "Tomato", "Corn", "Black olives"],

//   get lastTopping() {
//     return this.toppings.slice(-1).pop();
//   },

//   set lastTopping(topping) {
//     this.toppings.push(topping);
//   },
// };

// const pizzaTopping = pizza.lastTopping;
// console.log(pizzaTopping);

// pizza.lastTopping = "Capcicum";
// console.log(pizza.toppings);

class Pizza {
  availableSides = ["Coke", "Garlic bread"];
  constructor(pizzaBase, toppings, sides) {
    this.pizzaBase = pizzaBase;
    this.toppings = toppings;
    this.sides = sides;
  }

  get sideInfo() {
    if (this.sides) return this.sides;
    else alert("No sides available!");
  }

  set sideInfo(side) {
    if (this.availableSides.includes(side)) this.sides = side;
    else alert(`${side} is not available at this moment.`);
  }
}

const veggiePizza = new Pizza("New hand tosted", [
  "Onion",
  "Capcicum",
  "Corn",
  "Tomato",
  "Olives",
]);

veggiePizza.sideInfo = "Coke";
console.log(veggiePizza.sideInfo);
