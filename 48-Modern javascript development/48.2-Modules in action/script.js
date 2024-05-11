// Importing module
// import {
//   orderPizza,
//   bill,
//   charges,
//   pizzaOrdered as order,
// } from "./pizzaShop.js";

// console.log("Main importing module.");

// orderPizza("Veg loaded", 2);
// console.log(bill);
// console.log(charges);
// console.log(order);

// ------------------------------

// import * as PizzaShop from "./pizzaShop.js";

// console.log("Main importing module.");

// PizzaShop.orderPizza("Veg loaded", 2);
// console.log(PizzaShop.bill);
// console.log(PizzaShop.charges);
// console.log(PizzaShop.pizzaOrdered);

import instructions, { orderPizza, bill } from "./pizzaShop.js";

orderPizza("Pepperoni pizza", 1);
instructions("Please use fresh cheese.");
console.log(`Your bill amount is ${bill}`);
