## 02 Javascript variables

Variables are nothing but containers in which we can store values (just like normal container in our kitchen.). Javascript has a very powerful and unique feature by which we can change the variable type in runtime it is called as 'Dynamic typing'. i.e. we can decide which type of data need to be stored in a variable in runtime. For example if we create a string in javascript, we can further store a number, array or an object in it.
Because of this feature javascript is called as 'Dynamically typed language'

Below is the example of dynamimc typing in javascript.

```javascript
let age = 25;
console.log(age);

age = "Twenty-five";
console.log(age);
```

The outpot for above code will be:

```
25
Twenty-five
```

In this example we can see that initially the variable 'age' is holding an integer value which we are logging using console.log() and after that we are reassigning the same variable with a string value which is getting assigned without any error. Means the type of variable is dynamically decided.

There are two ways to define a variable in javascript, one is using `var` keyword (This is the old way of defining variables and can be seen in some old codes mostly written before 2015 i.e. before ES6) and second is using `let` keyword which is the modern way of definind a variable in javascript. below is the difference between two.

| Syntax            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| var number_1 = 7; | Here we have declared a variable with name 'number_1' and assigned a integer value to it. i.e. 7 This is an old way of declaring variable. (was being used before ES6) Not recommended to use now. You will find this in some old JavaScript codes. Here 7 is a literal i.e. literal value of the variable. 'number_1' is identifier i.e. the name to variable (how that variable is identified) = is assignment operator. And var is a keyword in javascript |
| let number_1 = 7; | Here also we have declared a variable with name 'number_1' and assigned a integer value 7 to it. This is the new way to declare variable and we should use this in our code. Here 7 is a literal i.e. literal value of the variable. 'number_1' is identifier i.e. the name to variable (how that variable is identified) = is assignment operator. And let is a keyword in javascript.                                                                       |

|

## Difference between var, let and const

`var` is always globally scoped. We can change the value of `var` from anywhere whereas `let` and `const are block scoped variables. To understand this better let's look at the below examples.

```javascript
var number1 = 10;
console.log("first - " + number1);
{
  console.log("second - " + number1);
  number1 = 20;
  console.log("third - " + number1);
}
console.log("fourth - " + number1);
```

output to the above code will be :

```
first - 10
second - 10
third - 20
fourth - 20
```

In the above example we have defined a variable named `number1` and assigned a value '10' to it. Now at line `console.log("first - " + number1);` i.e. first console.log() the value of the variable is 10. After that we have started a new block of code and inside that block as well we can see that the value of the variable at second console.log() i.e. `console.log("second - " + number1);` is 10 itself, which means the value of number1 declared using `var` keyword is globally scoped. Now as the value is globally scoped then it can be changed from anywhere in the code, so line `number1 = 20;` reassigns the variable with new value i.e. 20. and after that both third and fourth console.log() displays the value of `number1` as 20 which is the reassigned or modified value.

Now consider the same code with `let` keyword.

```javascript
let number2 = 100;
console.log("first - " + number2);
{
  let number2 = 200;
  console.log("second - " + number2);
}
console.log("third - " + number2);
```

output to the above code will be :

```
first - 100
second - 200
third - 100
```

Here first console.log() displays the value as 100, after that inside the block we are redeclaring the value of `number2` as 200 (This redecleration is possible because variable defined using `let` are block scopped. If we try to redeclare the variable with `let` outside the block it will give syntax error but same will work with `var` keyword hence using `var` can introduce errors in code as we might redefin same variable in huge code and modify it's value). Inside theblock after redeclaring the variable we can see the that the second console output gives value as 200, and even after that as soon as we leave the block and try to log the value outside it, we get back 100 which means the value 200 was only valid or specific to that block only.

<strong>Constants (declared with `const`)</strong>
Any variable declared with `const` keyword is called constant and it's value cannot be changed throughout the code. If we try to change the value we get <block style="color:red;"> TypeError: Assignment to constant variable.</block>

## Variable naming conventions in javascript

1. Only letters, numbers, '\_' and '$' is allowed.
2. Variable name must not start with a number.
3. Reserved keywords cannot be used as a variable name.
4. variables are case sensitive i.e. answer and Answer are two different variable with two different memory locations. (JavaScript is a case sensitive language)
