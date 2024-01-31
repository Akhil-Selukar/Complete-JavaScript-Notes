## 36.2.1 Function Accepting Callback Function

As we already know by now that javascript has first class functions and because of this we can pass function as an argument to another function (i.e. to higher order functions). To understand how this works consider below example.

```javascript
"use strict";

const addition = function (num1, num2) {
  return num1 + num2;
};

const multiplication = function (num1, num2) {
  return num1 * num2;
};

// Higher order function
const calculate = function (num1, num2, fn) {
  console.log(`Operation being performed : ${fn.name}`);
  console.log(`Result of operation is ${fn(num1, num2)}`);
};

calculate(4, 5, addition);
calculate(4, 5, multiplication);
```

In above example we have two function addition and multiplication. Both the functions accepts two numbers and return addition and multiplication of those numbers respectively. Now if we take a look at `calculate` function here we can see that apart from two numbers we are passing third argument which is nothing but one of the two functions (addition or multiplication). Now based on which function we pass the operation is performed and result is displayed in the console. Here the function `calculation()` is a higher order function as we are passing another function as it's argument and calculation function will then call the given function hence the functions 'addition' and 'multiplication' are the callback functions because those are being called by another function.

The output of above code is.

```
Operation being performed : addition
Result of operation is 9
Operation being performed : multiplication
Result of operation is 20
```

From above output we can see that when we pass `addition` function to calculation then addition is performed and when we pass `multiplication` then multiplication is performed.

> Important note :
> This type of higher order function provides abstraction in javascript. (Abstraction means hiding the implementation details) here how addition and multiplication is being performed is hidden from rest of the program. The program perform addition and multiplication via calculation function.
