## 36.5 Immediately invoked function expressions.

In general we declare a function somewhere in the code and access or call it as and when required multiple number of times, that is what functions are used for, right? But there are some scenarios which we will discuss further where we want a function to execute only once and then there must not be any way to execute that function again. Such functions are called as immediately invoked function expressions. Now consider below example of normal function.

```javascript
"use strict";

const sayHello = function () {
  console.log("Hello from regular function..!!");
};

sayHello();
sayHello();
```

Here we have a very simple function which will print the string `Hello from regular function..!!` on console. And as shown in above code we can call this function as many time as we want. So how we can make a function which can be called only once, well we can do it like the `welcome` function in below code.

```javascript
"use strict";

(function welcome() {
  console.log("I welcome only once..!!");
})();
```

In above code we observe few things.

1. The function is not assigned to any variable or function does not have any name.
2. We have wrapped the complete function inside a pair of bracket i.e. () to make it function expression.
3. We have immediately called the function expressionn by using ().

So like above we can create a function which can be called immediately after declaration and then there is no other way we can call the same function again.

if we see the output of above code then it will be.

```
I welcome only once..!!
```

Same will work with arrow functions as well.

```javascript
(() => console.log("Again, I welcome only once..!!"))();
```

But why exactly these type of functions was invented?
This was invented before ES6 to prevent variables to get accidently modified. because we have already seen in scope chain that the variables of parent scope can be accessed in child scope. So globally declared variables can accidently get modified in any functions hence this pattern of writing function is introduced. But since ES6 we can create block scope and declare variable using const inside the block scope which will be private to that block hence now we rarely use the immediately invoked function epressions.
