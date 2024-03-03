## 40 Math object

Math object in javascript is basically used for doing commonly used mathematical operations. Below are few of the operations which can be performed using Math.

```javascript
console.log(Math.sqrt(16));
console.log(16 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(12, 56, 3, 84, 46, 41));
console.log(Math.min(12, 56, 3, 84, 46, 41));
```

The output of above code will be

```
4
4
2
84
3
```

Math.sqrt() is used to find the square root of the given number hence we got 4 when we pass 16. Same can be done by using exponentiation operator which is \*\*. Math.max() and Math.min() are two functions by using which we can get the maximum and minimum values from given values. Hence when we pass '12, 56, 3, 84, 46, 41' in Math.max() it gave 84 and when we pass same values in Math.min() it gave 3 which is the minimum value out of all which were passed.

Apart from above operations we can do round off of numbers using Math. Have a look at below example.

```javascript
console.log(Math.trunc(12.556846));
console.log(Math.ceil(12.556846));
console.log(Math.floor(12.556846));
console.log(Math.round(12.556846));
console.log(Math.round(12.456846));
```

The output of above code is.

```
12
13
12
13
12
```

**Math.trunc()** - This will simply drop the value after decimal point, hence in above example when we call `console.log(Math.trunc(12.556846));` the output is 12.

**Math.ceil()** - This will take the nearest **higher** integer of given decimal value. Hence in above example when we call `Math.ceil(12.556846)` it took 13 which is the next highest integer after 12.556846.

**Math.floor()** - This is very similar to Math.ceil() the only diffference is it will take the nearest **lower** integer of the given decimal value. Hence when we called `Math.floor(12.556846)`, it gave the lower nearest integer which is 12.

**Math.round()** - This method is used to round off the decimal numbers to it's nearest integer. So if the decimal number is 12.5+ then it will be rounded off to 13 and if the decimal number is 12.4- then it will be rounded off to 12.

Till above we have converted the decimal number to whole number, but what if we want to round off a decimal number to another decimal number only like if we want to make it consistent throughout th application that we must have 3 decimal places only even though the number is a whole number still we want to display it till three decimal places or if we have a decimal number with 7-8 decimal numbers but we want to round if off till three decimal places. In this case we can use toFixed(). Look at below example.

```javascript
console.log((2.75684).toFixed(2));
console.log((2.75384).toFixed(2));
console.log((2.7).toFixed(3));
```

In the first line of above example `console.log((2.75684).toFixed(2));` we are using toFixed() method on 2.75684 and we are saying to fix the decimal places to two places only. Hence the number 2.75684 will be rounded off to two decimal places and will give `2.76`. Simnilarly in second line it will give `2.75` here as the 4th place is less than 5 hence it will get rounded off to 2.75 and not 2.76. Now in last line `console.log((2.7).toFixed(3));` we have only one decimal place in 2.7 and we are fixing the decimal places to three places, so in this case for second and third place 0 will be added and we will get 2.700 as output. Hence the overall output of above code will be.

```
2.76
2.75
2.700
```

Math class also have another method to generate random numbers (Math.random()). This method will generate random number between 0 to 1. We can use this method and do some operations to generate a method which will return random number between any two given values (range). Below is the sample code.

```javascript
const randomNumberGenerator = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomNumberGenerator(0, 6));
```

Above randomNumberGenerator() method is a general method and the line `randomNumberGenerator(0, 6);` will generate random number between 1 to 6 every time it is called.

Apart from all above methods Math function also holds value for constants like PI and it also has functions like abs() which gives the absolute value of given number.

```javascript
console.log(Math.PI);
console.log(Math.abs(-12));
console.log(Math.abs(12));
```

The output for above code will be.

```
3.141592653589793
12
12
```
