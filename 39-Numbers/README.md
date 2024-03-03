## 39 Numbers in javascript

The important thing to note about numbers in javascript is that in javascript all numbers are handled as floating point numbers, no matter we write them as integers or floating point numbers. For example have a look at below code.

```javascript
"use strict";

console.log(32 === 32.0);
```

The output of above code is `true` even though first value is a integer and second value is a fload and we are using strict equality still we are getting true, this is because internally both the values are considered as 32.0 i.e. floating point values.

Now have a look at below code.

```javascript
console.log(0.1 + 0.2 === 0.3);
console.log(0.1 + 0.2);
```

In above code we can clearly see that 0.1 + 0.2 will become 0.3 and then 0.3 must be equal to 0.3 so it should return 'true' but the output is false and when we try to print 0.1 + 0.2, instead of 0.3 it will print 0.3000000000004, weird right? This is because internally javascript stores numbers in 64-bit base 2 format i.e. numbers are always stored in binary format. In case of some fractional numbers it is very difficult to represent them in binary format and this is what happen with 0.1 + 0.2 hence we get this weird result. This is a common and known bug in javascript and hence generally if your usecase involved extreme level of precision and have many decimal calculations then it is not advisable to use javascript.

Now most of the time in javascript when we read data from any DOM element or when we accept data from user, the data is always in string format. We can't directly read numbers in javascript. Hence to convert the strings to number we have few ways mentioned below.

1. To use Number()

```javascript
console.log(typeof "55");
console.log(typeof Number("55"));
```

In above example if we see the output the first console.log i.e. `console.log(typeof "55");` will print `string` because 55 is wrapped inside "" hence 55 is of string type. but when we put that string "55" in Number() then we can see that the string number is converted to actual numeric value and then if we check the type of that converted 55 we will get `number` which will happen at line `console.log(typeof Number("55"));`

If we try to put some non numeric value in Number() then it will return `NaN` which is Not a Number result.

2. Type coercion.

```javascript
console.log(typeof +"55");
```

In above case the output will be `number` even though we have "55" as a string. This is because we have written a + before the string hence this + operator will trigger type coercion and convert string 55 into numeric 55.

3. By using parseInt()

```javascript
console.log(typeof Number.parseInt("35"));
console.log(Number.parseInt("35"));
```

Here the parseInt() function convert the string to number and hence we get `number` as type in first console.log() and when we print the number we get numeric value.

The main difference between Number() and Number.parseInt() is if we pass any non numeric value to number() it directly gives us 'NaN' while if we pass a non numeric value which is starting with an integer or floating point number we get that number instead of 'NaN'. (The condition is number must be at the start of the string.)

```javascript
console.log(Number.parseInt("35abcd"));
```

The above code will successfully convert the string to number and print 35 on console instead of NaN.

If we have a string which starts with floating point and we use parseInt() then it will return number only till the decimal point, but if we want the complete number including decimal values then we can use parseFloat().

```javascript
console.log(Number.parseInt("38.23abcd"));
console.log(Number.parseFloat("38.23abcd"));
```

the output of first line will be `38` only, it will not have .23 whereas the output of second line will be complete number `38.23`.

This parseInt() and parseFloat() functions are very useful when we want to manipulate some css values based on certain events. because usually css values has some units like px, rem, etc..

> Note: parseInt() and parseFloat() accepts a second optional argument which is the base of number system we are using, i.e. by default we use decimal number system with base 10, hence the default value is 10 which we don't mention but it is always better to mention the value. have a look at below example where we are using binary system to read binary value.

```javascript
console.log(Number.parseInt("1001abcd"));
console.log(Number.parseInt("1001abcd", 10));
console.log(Number.parseInt("1001abcd", 2));
```

The output of above code is

```
1001
1001
9
```

Here we can see that if we don't mention the base then by default it consider it as 10 hence in first two lines we got value in decimal number system i.e. 1001. But when we mention the base as 2 then javascript started reading the value in binary format and hence it gave the decimal equivalent of binary '1001' which is '9'.

<hr>

Now if we want to check that the given value or calculated value is a valid integer or not then we can use isFinite() method.

```javascript
console.log(Number.isFinite(20));
console.log(Number.isFinite(20.12));
console.log(Number.isFinite("20.12"));
console.log(Number.isFinite(+"20.12"));
console.log(Number.isFinite(+"20.12abc"));
console.log(Number.isFinite(2 / 0));
```

In above example at first line number 20 is a finite number hence we will get `true` as the output. Similarly 20.12 is also a finite number so we will get `true`. But in case of third line `console.log(Number.isFinite("20.12"));` even though the number is 20.12 only but it is in String format which is not number hence it can't be finite so it will give `false`. When we convert String into number by type coercion or by using Number() or parseInt() if a valid number is generated then we get `true` when checked with isFinite() hence `true` will be printed in case of fourth console.log(), for same reason fifth console.log will print `false` because the resultant value will be 'NaN'. Now in last console.log() i.e. `console.log(Number.isFinite(2 / 0));` here the result of '2/0' will be `infinite` value which is certainly not a number hence this will return `false`.

Similar to isFinite() method we have isNaN() and isInteger() methods. Important point to note about isInteger is if we check isInteger(26) and isInteger(26.00), in both cases we get `true`. This is because internally javascript handles numbers in floating point format and we have already seen that 26 === 26.00
