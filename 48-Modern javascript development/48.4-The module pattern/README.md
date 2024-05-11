## 48.4 The module pattern

The modules implementation which we are working with since last couple of sections is introduced from ES6. But in code before that modules were implemented using module pattern. In module pattern the module is written in an ['immediately invoked function expression' (IIFE)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/36-Deep%20dive%20into%20functions/36.5-Immediately%20invoked%20function%20expressions) These function expressions are executed only once in the program. Have a look at below code.

```javascript
const pizzaShop = (function () {
  const pizzaOrdered = [];
  const deliveryCharges = 20;

  const orderPizza = function (pizzaName, quantity) {
    console.log(`You ordered ${quantity} ${pizzaName}..!!`);
    pizzaOrdered.push({ pizzaName, quantity });
  };

  const specialInstructions = function (messageForChef) {
    console.log(`You special instruction is ${messageForChef}..!!`);
  };

  return {
    deliveryCharges,
    pizzaOrdered,
    orderPizza,
  };
})();

console.log("Ordering pizza");

pizzaShop.orderPizza("Pepperoni pizza", 3);

console.log("Your order is below");
console.log(pizzaShop.pizzaOrdered);

console.log(
  `Total bill amount including delivery charges is ${
    pizzaShop.pizzaOrdered[0].quantity * 120 + pizzaShop.deliveryCharges
  }`
);
```

In above example we have an immediately invoked function expression which initializes the variable pizzaOrdered, deliveryCharges and methods orderPizza, specialInstructions. After initializing these thing the function returns an object having the two variables initialized in IIFE those are deliveryCharges and pizzaOrdered and the method to order the pizza orderPizza.

As IIFE's are invoked once and then there is no way we can call that function again, so the object with the variables and a method will be returned only once when the IIFE executes, then throughout the code we will be using the returned object from IIFE (i.e. object stored in 'pizzaShop')

Now as we know that after execution IIFE will not be accessable and the variables deliveryCharges and pizzaOrdered are the part of IIFE and they are function scopped so how we will be able to access the variable even after the IIFE execution is done. The alswer lies in the concept of [Hoisting](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/README.md#hoisting-and-tdz-temporal-dead-zone), the function always has access to the variables which were present at the birthplace of that function. So whenever we call orderPizza, it will have access to all the variables in IIFE because those variables were defined at the birthplace of orderPizza method i.e. the IIFE.

The output of above code will be.

```
Ordering pizza
You ordered 3 Pepperoni pizza..!!
Your order is below
[{
  pizzaName : "Pepperoni pizza"
  quantity : 3
}]
Total bill amount including delivery charges is 380
```

In above code pizzaShop will work just like module, and we can export what all properties and methods we want during the execution of IIFE so that it will be accessable from the main script.js.
