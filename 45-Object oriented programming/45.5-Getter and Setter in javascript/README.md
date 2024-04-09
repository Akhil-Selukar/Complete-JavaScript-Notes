## 45.5 Getters and Setters in javascript

Just like in other programming language getters and setters are used to get the value of or set the value to a specific property in javascript. However in javascript getters and seters are not implemented and called just like other programming language. Have a look at below code example to understand how getters and setters work in normal object in javascript.

```javascript
"use strict";

const pizza = {
  pizzaBase: "Thin crust",
  toppings: ["Onion", "Tomato", "Corn", "Black olives"],

  get lastTopping() {
    return this.toppings.slice(-1).pop();
  },

  set lastTopping(topping) {
    this.toppings.push(topping);
  },
};

const pizzaTopping = pizza.lastTopping;
console.log(pizzaTopping);

pizza.lastTopping = "Capcicum";
console.log(pizza.toppings);
```

In above example we have a normal object called pizza which has two properties pizzaBase and toppings array. We have added a special method lastTopping using `get` keyword. This method becomes the getter method and this must return some value. Similarly we can use `set` keyword to generate setter, this method will accept exacylt one value. Now most people can say that this we can directly do by accessing the property of pizza object. But getter and setters are helpful when we want to do specific operation every time before fetching certain property from an object or every time adding certain property to the object. Also if we observe the call to this method, we dont have to call them using (). Instead we can call getters and setters just like normal properties over object. The output of above code will be.

```
Black olives
['Onion', 'Tomato', 'Corn', 'Black olives', 'capcicum']
```

Above is how we can use getter and setter in normal object, but now let's see how we can use getters and setters in classes. With classes as well getters and setters works just the same way it work with normal object. Have a look a look at below example.

```javascript
class Pizza {
  constructor(pizzaBase, toppings) {
    this.pizzaBase = pizzaBase;
    this.toppings = toppings;
  }

  get lastTopping() {
    return this.toppings.slice(-1).pop();
  }

  set lastTopping(topping) {
    this.toppings.push(topping);
  }
}

const veggiePizza = new Pizza("New hand tosted", [
  "Onion",
  "Capcicum",
  "Corn",
  "Tomato",
  "Olives",
]);

console.log(veggiePizza.lastTopping);

veggiePizza.lastTopping = "Mushroom";
console.log(veggiePizza.toppings);
```

In above example we have a class called Pizza which has a constructor to create an object of Pizza class, and getter setter methods to get and set the lasst topping in the pizza. The working is exacytly same as that of first example. Hence the output will be.

```
Olives
['Onion', 'Capcicum', 'Corn', 'Tomato', 'Olives', 'Mushroom']
```

Note: Mostly getters and setters are prefered over directly setting or getting values to object when we want to perform some operations (Mainly validations) on the data before it is set to the object or returned from the object. Have a look at below example.

```javascript
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
```

In above example in getter as well as setter we have added some validations.
