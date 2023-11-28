## 04 Javascript Basic Operators

Operators are used to assign values, compare values, perform arithmetic operations, and many more. Operators are broadly classified under below 4 categories (there are other operators aswell)

- Arithmetic operators
- Assignment operators
- Increment decrement operators
- Comparison operators

Operators can work directly on values as well as on variables.

### Arithmetic Operators

Consider below piece of code for arithmetic operators.

```javascript
console.log("Addition of 2 and 3 is", 2 + 3);
console.log("Subtraction of 8 and 5 is", 8 - 5);
console.log("Multiplication of 6 and 3 is", 6 * 3);
console.log("8 Divided by 3 is", 8 / 3);
console.log("2 to the power of 4 is ", 2 ** 4);
```

output :

```
Addition of 2 and 3 is 5
Subtraction of 8 and 5 is 3
Multiplication of 6 and 3 is 18
8 Divided by 3 is 2.6666666666666665
2 to the power of 4 is  16
```

Explaination:

- <strong>Addition operator (+)</strong> - This operator just do the addition of two numbers (This operator is also used to concatination operation which is discussed below.)
- <strong>Substraction operator (-)</strong> - This operator is used to do substraction of two numbers..
- <strong>Multiplication operator (\*)</strong> - This operator is used to perform multiplication of two numbers.
- <strong>Division operator (/)</strong> - This operator performs division of two numbers.
- <strong>Exponentiation operator ( ** )</strong> - This operator is used to do exponentiation operation i.e. 2**3 means 2 to the power of 3 or 2 _ 2 _ 2.

<em><strong>Important Note -</strong><br>
The addition operator i.e. + can also be used for concatination operation by using it with string. (Check below section for example and explaination.)
</em>

### Addition operator (+) to concatinate strings

When any of the operand of + operator is 'String' then + operator performs concatination in place of addition. Take a look at below code and it's output.

```javascript
console.log(2 + "Hello");
console.log("Hello" + 2);
console.log("Hello" + 2 + 2);
console.log(2 + 2 + "Hello");
console.log("Hello" + " " + "world");
```

The out for above code is

```
2Hello
Hello2
Hello22
4Hello
Hello world
```

In above code we can see that 'Hello' is a string and we are using addition (+) operator on String and number operands so
it will perform the concatination and hence in 1st console.log() it gave '2Hello' and 'Hello2' in the next one.
Now if we take a close look at next two examples i.e. `console.log("Hello" + 2 + 2);` and `console.log(2 + 2 + "Hello");`. Here first one gave 'Hello22' means it concatinated all the three operands but when we put string at the end as shown in the next example, it gave '4Hello' means it first worked as normal arithmetic operator and then it concatinated the result with 'Hello'. This is because we only have + operator in this example and hence there will not be any operator precedence so the expression will be evaluated from left to right. Now while doing that first it will execute '2 + 2', here both the operands are number hence '+' acts as normal arithmetic operator and perform addition. After this addition now the operation will be between 4 and 'Hello' in this case one of the operand is string and hence concatination is performed.

### Assignment operators

Assignment operators are the operators which has lower operator precedence (Operator precedence is discussed below.) hence those are evaluated at the last.

Consider below code to understand assignment operators.

```javascript
let addition = 6 + 7; // 13
console.log("addition is ", addition);

addition += 2; // 15
console.log("after += operation addition is", addition);

addition -= 5; // 10
console.log("after -= operation addition is", addition);

addition *= 4; // 40
console.log("after *= operation addition is", addition);
```

Output for above code is

```
addition is  13
after += operation addition is 15
after -= operation addition is 10
after *= operation addition is 40
```

Here first statement is `let addition = 6 + 7;`, as assignment operator has lower precedence, first addition will be performed so '6 + 7' will become 13 and then 13 will be assigned to variable named 'addition'. This assignment of value to the variable is what '=' (assignment operator) does.
In the next line `addition += 2;`, '+=' is also an assignment operator and it is the compact version of `addition = addition + 2`. So it will add '2' to the value of 'addition' variable and assign the resultant value back to 'addition' variable. Similarly in subsequent lines '-=' does the substraction and then assignment while '\*=' does the multiplication and then assign the result back to the left hand side variable.

### Increment and decrement operators

Increment and decrement operators are used to increment or decrement the value by '1'. Mostly this operators are used in loops or places where we want to keep track of iterations/count.

```javascript
let x = 7;
x++;
console.log("x++ is ", x);
x--;
console.log("x-- is ", x);
```

Output for above code is

```
x++ is 8
x-- is 7
```

In above example we have declared a variable named 'x' and assign 7 to it. Now whwn we do 'x++' (++ is increment operator) then value of x get's incremented by 1 and hence `console.log("x++ is ", x);` gives us 8 as value of x. Similarly when we do x-- (-- is decrement operator) then the current value of x i.e. 8 is decreased by 1 and hence `console.log("x-- is ", x);` gives 7 as value of x.

### Comparison operators

Comparision operators basically used to compare two values and they generates boolean result i.e. either `true` when two values are equal or `false` when two values are different.

Let's have a look at below code example.
The output of above code is written as a comment in front of each console.log statement

```javascript
console.log(10 > 6); // true
console.log(10 < 6); // false
console.log(10 >= 10); // true
console.log(10 <= 10); // true
console.log(10 == 10); // true
console.log(10 == "10"); // true
console.log(10 === "10"); // false
console.log("10" === "10"); // true
```

In above example all comparisions are normal arithmetic comparisons only except the last four. Operator '==' and '===' both check equality only but '==' is equals and '===' is strict equals. <br>
== check the value and not datatype as we can see `console.log(10 == "10");` gives `true` even if we are comparing number with string. As number 10 is equal to the number '10' represented as String hence it gives `true`. While '===' checks value as well as datatype, means '===' will give `true` only when both the values are equal and of same datatype otherwise it returns `false`.

<em>Note - apart from above mentioned operators multiple other operators are present in javascript like conditional operator, bitwise operators, logical operators, etc.</em>

## Operator precedence

Operator precedence is nothing but the priority of operators and it describes which operator to execute first when there are more than one operator present in a single statement. Operator with higher precedence is executed first. Check operator precedence table at [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)

Consider below example code to understand the operator precedence.

```javascript
let firstNumber = 20 - 6;
let secondNumber = 10 + 2;

console.log(firstNumber);
console.log(secondNumber);
```

Here in first and second line we have 2 operators each those are assignment operator (=) and subtraction and addition operator respectively. Now if we check the precedence table, the precedence of assignment operator is 2 and that of addition or subtraction is 11 which means addition and subtraction has higher precedence over assignment hence addition and subtraction will be performed first and then assignment will be done. So '20 - 6' is 14 and that 14 is will be assigned to `firstNumber` similarly '10 + 2' is 12 that 12 is assigned to `secondNumber`. so the output will be

```
14
12
```

Now consider below example

```javascript
let a, b;
a = b = 12 + 2 - 3;

console.log(a, b);
```

Here we have declared two empty variables 'a' and 'b' then we have line `a = b = 12 + 2 - 3;`. Now if we see the precedence table, then the associativity (direction of execution) of assignment operator is 'right-to-left' means the assignment statement will always execute from right to left whereas, associativity of addition or subtraction is from 'left-to-right' means it will execute from left to right. We have already seen above that precedence of addition/subtraction is greated over assignment hence addition/subtraction will be executed first.
Hence in above example first '12 + 2 - 3' will be calculated in left to right direction i.e.

`12 + 2 - 3` will become `14 - 3` which will evaluate to 11.<br>
So the expression will become `a = b = 11`, now assignment operation will be performed from roght to left direction. So first 'b' will be assigned the value '11' and expression will become `a = 11` and hence finally 'a' will be assigned with the value '11' and both 'a' and 'b' will have '11'.

Output of above example

```
11 11
```

#### Updating operator precedence

The precedence of the operator can be updated to some extent. consider below example to understand this.

```javascript
let number_1 = 10;
let number_2 = 20;

let average = number_1 + number_2 / 2;
console.log(average);

average = (number_1 + number_2) / 2;
console.log(average);
```

In this example we have two numbers 'number_1' and 'number_2' Now when we calculate 'average' for the first time as per the precedence table division will be executed first and then addition. Hence the equation will become

```
average = 10 + 20 / 2

average = 10 + 10

average = 20
```

and it will give result as 20 which is wrong, obviously average of '10' and '20' is '15' and not '20'. SO we have to modify the precedence here such that addition will be performed before the division. To achieve this we have 'grouping' operator i.e. brackets () with highest precedence. As this has the highest precedence so anything grouped under a pair of bracked is executed first. So if we write the expression to calculate average as `average = (number_1 + number_2) / 2;` we modify the precedence of addition to highest because we grouped it under a pair of brackets so in this case the expression will be evaluated as follows.

```
average = (10 + 20) / 2

average = 30 / 2

average = 15
```

Here we are getting the correct average value and to get that we have successfully updated the precedence of + operator by using a pair of bracket to evaluate it before division.
