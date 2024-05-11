## 48.2 Modules in action

To see modules in action first thing we need to do is to create a module in javascript, the module can be simply created by creating a new javascript file like `pizzaShop.js`. In our example script.js is the main javascript file and pizzaShop.js is the module which we will be importing into the script.js so let's first import the module in main js file.

pizzaShop.js

```javascript
// Exporting module

console.log("Exporting module.");
```

script.js

```javascript
// Importing module
import "./pizzaShop.js";

console.log("Main importing module.");
```

Now here as we have imported the pizzaShop.js in script.js so as discussed in last section pizzaShop.js must load first and then script.js should load. Now when these files load it should print the console.log() statements. But when e run the code the output that we get is below error.

```
Uncaught SyntaxError: Cannot use import statement outside a module
```

This is because whenever we work with javascript module we have to instruct this in the html file to import javascript modules. Hence we have to specify the type attribute to module in js import line of html file.

```html
<script type="module" src="script.js"></script>
```

Now you will see that the error will be gone and the output will be like below.

```
Exporting module.
Main importing module.
```

So from here we can see that the Exporting module which is pizzaShop.js got loaded first andthen main module script.js got loaded.

> **Note:** in newer versions of web browser you might see below error after changing the type to module.
>
> ```
> Access to script at 'file:///<script.js file path>' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.
> ```
>
> This error stats that you can not load files/scripts and modules from loacl system to the web browser due to security reasons.
>
> To make this work below are some work arounds.
>
> 1. if you are using VS code: You can install any live server extension and run your code from there.
>
> 2. If you have node.js setup:
>
>    a. Install http-server by typing `npm install -g http-server`<br>
>    b. Change into your working directory, where your index.html is.<br>
>    c. Start your http server by running `http-server -c-1`

Now to see how we can export some variables and methods from module and import it into another module. Let's create some variables first in pizzaShop.js and try to access them in script.js.

pizzaShop.js

```javascript
console.log("Exporting module.");

let billAmount = 0;
const pizzaOrdered = [];

const orderPizza = function (pizzaName, quantity) {
  console.log(`You ordered ${quantity} ${pizzaName}..!!`);
  pizzaOrdered.push({ pizzaName, quantity });
  billAmount = 120 * quantity;
};
```

script.js

```javascript
import "./pizzaShop.js";

console.log("Main importing module.");

orderPizza("Veg loaded", 2);
console.log(billAmount);
```

In above example we have created two variables and a method to order pizza in module pizzaShop.js and trying to access the method and one of the variable in script.js. Now as we have seen in last section that variables and methods in modules are are module scopped, so the it will not be accessable outside the module hence in above code we will get below error.

```
Exporting module.
Main importing module.
Uncaught ReferenceError: orderPizza is not defined
    at script.js:6:1
```

Now to fix above issue we need to export the method from module and import it in the script.js like below.

pizzaShoop.js

```javascript
console.log("Exporting module.");

let billAmount = 0;
const pizzaOrdered = [];

export const orderPizza = function (pizzaName, quantity) {
  console.log(`You ordered ${quantity} ${pizzaName}..!!`);
  pizzaOrdered.push({ pizzaName, quantity });
  billAmount = 120 * quantity;
};
```

Here we have simply added `export` keyword before the method and this method will now be exported as public API for other modules and we can import this in other modules like below.

script.js

```javascript
import { orderPizza } from "./pizzaShop.js";

console.log("Main importing module.");

orderPizza("Veg loaded", 2);
console.log(billAmount);
```

here we have imported the 'orderPizza' method from pizzaShop.js module and now if you see the output it will be like below.

```
Exporting module.
Main importing module.
You ordered 2 Veg loaded..!!
Uncaught ReferenceError: billAmount is not defined
    at script.js:7:13
```

Now we can see that the orderPizza method was successfully executed but still we dont have access to variable billAmount in script.js, because we have not exported that variable.

Now we can export bunch of variables at once in javascript using export statement, even we can rename it before exporting like below.

pizzaShop.js

```javascript
console.log("Exporting module.");

let billAmount = 0;
const pizzaOrdered = [];
const deliveryCharges = 20;

export const orderPizza = function (pizzaName, quantity) {
  console.log(`You ordered ${quantity} ${pizzaName}..!!`);
  pizzaOrdered.push({ pizzaName, quantity });
  billAmount = 120 * quantity;
};

export { billAmount as bill, deliveryCharges as charges, pizzaOrdered };
```

Here in above example using the export at last line we have exported the 'billAmount' as 'bill', 'deliveryCharges' as 'charges' and pizzaOrdered array without renaming it. Now while importing these variables we need to make sure that it must be imported with same names i.e. bill, charges and pizzaOrdered. This is called named export. (There is another type of export called default export which we will see below in this section only.)

script.js

```javascript
import {
  orderPizza,
  bill,
  charges,
  pizzaOrdered as order,
} from "./pizzaShop.js";

console.log("Main importing module.");

orderPizza("Veg loaded", 2);
console.log(bill);
console.log(charges);
console.log(order);
```

Now here in above example we have imported orderPizza method, bill, charges and pizzaOrdered and then renamed pizzaOrdered as orde here. (So renaming can be done at both exporting and importing end). Now if we see the output, all variables and methods will be accessable in script.js.

```
Exporting module.
Main importing module.
You ordered 2 Veg loaded..!!
240
20
[{
pizzaName : "Veg loaded"
quantity : 2
}]
```

Now consider there can be many variables and methods a module can export, and we might need all of them. In such cases instead of mentioning all of them in import statement we can import all by using \* like below.

script.js

```javascript
import * as PizzaShop from "./pizzaShop.js";

console.log("Main importing module.");

PizzaShop.orderPizza("Veg loaded", 2);
console.log(PizzaShop.bill);
console.log(PizzaShop.charges);
console.log(PizzaShop.pizzaOrdered);
```

This code will also work fine and give the same output as that of above. The important thing which we have to notice here is we can not rename individual property at importing side in above case and it is a common convention to use first letter as captial like class name while giving alice to importen namespace.

Now till now we were working with named export and hence we had to make sure that the variable/method name we are importing must be same as that of what we are importing. But there is another export called default export where we can import the method or variable with any name. The point to remember here is that we can only export 1 thing from a module using default export. Have a look at below code.

pizzaShop.js

```javascript
console.log("Exporting module.");

let billAmount = 0;
const pizzaOrdered = [];
const deliveryCharges = 20;

export const orderPizza = function (pizzaName, quantity) {
  console.log(`You ordered ${quantity} ${pizzaName}..!!`);
  pizzaOrdered.push({ pizzaName, quantity });
  billAmount = 120 * quantity;
};

export { billAmount as bill, deliveryCharges as charges, pizzaOrdered };

// Default export

export default function (messageForChef) {
  console.log(`You special instruction is ${messageForChef}..!!`);
}
```

Here we have directly exported a function using default export and there is no name for this function hence while importing we can import it with any name. like below

(Mixing default and maned export works fine but it is not advisable to use it, as it is complex and difficult to maintain so can introduce bugs.)

script.js

```javascript
import instructions from "./pizzaShop.js";

instructions("Please use fresh cheese.");
```

Here we have imported the default export using name 'instructions' but this can be any name and it works fine. But again it is important to note that we can not use default export for more than one values.

Here the output will be

```
You special instruction is Please use fresh cheese...!!
```

Just to demonstrate both default and named export works together have a look at below code.

pizzaShop.js

```javascript
let billAmount = 0;
const pizzaOrdered = [];
const deliveryCharges = 20;

export const orderPizza = function (pizzaName, quantity) {
  console.log(`You ordered ${quantity} ${pizzaName}..!!`);
  pizzaOrdered.push({ pizzaName, quantity });
  billAmount = 120 * quantity;
};

export { billAmount as bill, deliveryCharges as charges, pizzaOrdered };

// Default export

export default function (messageForChef) {
  console.log(`You special instruction is ${messageForChef}..!!`);
}
```

script.js

```javascript
import instructions, { orderPizza, bill } from "./pizzaShop.js";

orderPizza("Pepperoni pizza", 1);
instructions("Please use fresh cheese.");
console.log(`Your bill amount is ${bill}`);
```

Here in above code we have imported default export with name instructions and orderPizza and bill are the named exports. The output of above code will be.

```
You ordered 1 Pepperoni pizza..!!
You special instruction is Please use fresh cheese...!!
Your bill amount is 120
```
