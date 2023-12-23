## 14 Javascript Functions Expression

Function expression and function declaration are two ways to define a function.

In function declaration we write `function` keyword foloowed by the function name and function arguments, and then inside the curly brackets we write the steps to execute as a part of the function execution. While in function expression we define a constant variable with `const` keyword and assign the function body to that variable and we call the function with the function name.

Below is the example for function declaration.

```javascript
const num1 = 5;
const num2 = 3;

function addition1(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

const result1 = addition1(num1, num2);
console.log(`addition of ${num1} and ${num2} is ${result1}`);
```

Here we have defined a function with name 'addition1' using `function` keyword which accepts two numbers and returns the addition thoe numbers.

The output of above code will be.

```
addition of 5 and 3 is 8
```

Now, consider below code which is the same function but declared using function expression.

```javascript
const num1 = 5;
const num2 = 3;

const addition2 = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
};

const result2 = addition2(num1, num2);
console.log(`addition of ${num1} and ${num2} is ${result2}`);
```

Here we can see that we have created a constant with name 'addition2' and assigned the function definition to it. We can call the function by using the constant name.

The output for above code will be.

```
addition of 5 and 3 is 8
```

The importanyt point to note here is in function declaration it is possible to use the function above function declaration which is shown below.

```javascript
const num1 = 5;
const num2 = 3;

const result1 = addition1(num1, num2);
console.log(`addition of ${num1} and ${num2} is ${result1}`);

function addition1(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
```

In above code we have called the function 'addition1' before it's declaration. This is allowed and will work without any issue. But same is not the case with function expression, means below code will not work as we have called the function before it's declaration.

```javascript
const num1 = 5;
const num2 = 3;

const result2 = addition2(num1, num2);
console.log(`addition of ${num1} and ${num2} is ${result2}`);

const addition2 = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
};
```

Above code will give the error.

<p style="color:red;">Uncaught ReferenceError: Cannot access 'addition2' before initialization at script.js:4:17</p>

This is becausse we are trying to call the function before defining it.
