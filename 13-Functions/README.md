## 13 Javascript Functions

Functions in javascript are reusable block of code. If there is some code which we need to write multiple time in a code then we can create a function for that code.<br>
For example, if we have a code and in that code we are calculating sum of two numbers at 100 places then we will have to write 'firstNumber + secondNumber' 100 times, this is repetation of same code again and again. Now instead of addition consider there is a complex logic of 30-40 lines to calculate something. Now you will have to repeat the same 30-40 lines every time you wish to perform the calculation. This will for sure make the code very messy and it is most likly to have errors as we might miss something while rewriting the code again and again. In such case functions are very useful.

Functions are declared by writing `function` keyword followed by name of the function and pair of brackets (). If there are any values which need to be passed to the function then inside the brackets we have to specify variables to hold those values.

Consider a very simple function below.

```javascript
function logger(lineNumber) {
  console.log(`This is a logger at line number ${lineNumber}`);
}

logger(7);
logger(8);
```

In above code we have defined a function named 'logger()' this function accepts line number, hence logger has 1 parameter `lineNumber`. Now inside the function we are logging a message to the console `This is a logger at line nymber ...`.

`logger(7);` and `logger(8);` is where we are calling the function and sending/passing 7 and 8 as line number.

The output of above code will be

```
This is a logger at line number 7
This is a logger at line number 8
```

Now consider another example mentioned below.

```javascript
function addition(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

const result1 = addition(5, 3);
console.log(result1);

const result2 = addition(17, 20);
console.log(result2);
```

Here we have a function name `addition(firstNumber, secondNumber)`. This function takes two number and calculate sum of those numbers. But here instead of logging the value to console we are returning the calculated value by using `return` statement.

The output of above function is.

```
8
37
```

Above two are very simple functions and very simple code hence here functions are not additing significant value, but in large code including lot's of calculations and decision making functions are really very useful to reduce lines of code and improve the readability of the code.
