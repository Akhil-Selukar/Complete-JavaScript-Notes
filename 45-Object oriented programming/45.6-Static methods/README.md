## 45.6 Static methods

All the methods we have created till now in classes were instance methods and hence they were accessable by the objects of that class and they were present in the prototype. But static methods are the methods specific to the class and can not be accessed by the objects of that class. Hence static methods can not be present in the prototype. We can create static methods very easily. have a look at below example.

```javascript
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
```

In above code have a close look at `menue()` method we have added `static` keyword while defining the method, that's it. Now the menue method will be static method and will not be added to the prototype and hence will not be available on the objects created using the Pizza class. But it will be available on Pizza class.

The above code will give you output as.

```
Options for pizza base are :
1. Thin crust
2. Cheese burst
3. Hand tossed

Available toppings are :
1. Tomato
2. Onion
3. Olives
4. Corn
```

And when we try to call the method on veggiePizza object it will give an error saying menue is not a function.
