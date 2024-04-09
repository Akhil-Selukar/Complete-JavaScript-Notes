"use strict";

class Pizza {
  constructor(pizzaBase, toppings, sides) {
    this.pizzaBase = pizzaBase;
    this.toppings = toppings;
  }

  get lastTopping() {
    return this.toppings.slice(-1).pop();
  }

  set lastTopping(topping) {
    this.toppings.push(topping);
  }

  static menue() {
    console.log(
      "Options for pizza base are : \n1. Thin crust \n2. Cheese burst \n3. Hand tossed"
    );
    console.log(
      "Available toppings are : \n1. Tomato \n2. Onion \n3. Olives \n4. Corn"
    );
  }
}

const veggiePizza = new Pizza("New hand tosted", ["Onion", "Corn"]);

Pizza.menue();
// veggiePizza.menue();
