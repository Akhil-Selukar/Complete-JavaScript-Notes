## 37.3 Filter method

Filter method, as name suggests filter the array elements based on given criterion and return a new array with filtered values. the filter criterion is passed as a callback function. Have a look at below example.

```javascript
"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];

const boundries = runsThisOver.filter((runs) => runs >= 4);
console.log(boundries);
```

In above example we an array which represent runs scored on each ball of an over. And we want to filter out only the boundries. Hence we used the filter method on runsThisOver array and we are returning runs which are >= 4 by using an array function. same code can be written without arraw function as below.

```javascript
"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];

const boundries1 = runsThisOver.filter(function (runs) {
  return runs >= 4;
});
console.log(boundries1);
```

The output will be.

```
[4, 6]
```

That means as per the filter criterion the elements are filtered and returned as new array.
