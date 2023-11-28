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
