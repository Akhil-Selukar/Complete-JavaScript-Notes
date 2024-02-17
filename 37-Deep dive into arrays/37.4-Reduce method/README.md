## 37.4 Reduce method

Reduce method transform the array to a single value. Like if we want to add all values of an array, or multiply or concatinate, etc. then this can be done by reduce method. So in shord reduce method boils down the array to a single value. Have a look at below example.

```javascript
"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];

const runsScored1 = runsThisOver.reduce(function (total, runs) {
  return runs + total;
}, 0);
console.log(runsScored1);
```

In above example we can see that the way we call reduce method is similar to that of map and filter method where we are passing a callback function. But the difference here is the call back function accept one more argument apart from value, index and complete array. That parameter is called 'accumulator' which is 'total' in above example. This accumulator is always has to be first parameter in the callback function. Apart from this accumuator another argument is there for reduce method which is passed after the callback function '0' in above code, this is nnothing but the initial value of the accumulator.

Now during each iteration the when `return runs + total;` executes it will add runs for current iteration into the total and then return the addition. This returned value will be the new value of accumulator (i.e. total in our case) for next iteration, and so on. So at the end we get only single value i.e. the value of accumulator after last iteration. So the output of above code will be.

```
13
```

> [!NOTE] The above callback function can also be written using arrow function as below.
>
> ```javascript
> "use strict";
>
> const runsThisOver = [0, 2, 4, 1, 6, 0];
>
> const runsScored = runsThisOver.reduce((total, runs) => runs + total, 0);
>
> console.log(runsScored);
> ```

> [!TIP] Reduce method is not just return the addition, multiplicatio, subtraction, etc of all elements of the array. With little bit of logic we can use reduce method for many more scenarios like finding maximum value in an array or finding minimum value, etc. Below is the example where we are finding maximum value from an array.
>
> ```javascript
> const runsThisOver = [0, 2, 4, 1, 6, 0];
>
> const maxValue = runsThisOver.reduce((max, runs) => {
>   if (max > runs) return max;
>   else return runs;
> }, runsThisOver[0]);
>
> console.log(maxValue);
> ```
