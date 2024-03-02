## 37.7 Some and every method.

**1. Some method** - Some method basically works similar to includes() method, just the only difference is that in includes() method we have to specify the actual value we want to search, we can not pass condition to check on each element of array. While in some() method you can specify the condition which will be checked over all the array elements and if any of the element satisfies the condition then the it will retur true. To specify the condition we use callback function with some() method. have a look at below example.

```javascript
const runsThisOver = [0, 2, 4, 1, 6, 0];
const successfulOver = [0, 1, "w", 2, 4, 0];

const anyBoundary = runsThisOver.some((run) => run >= 4);
console.log(anyBoundary);

const anyWicket = runsThisOver.some((run) => run === "w");
console.log(anyWicket);

const anyWicketSuccess = successfulOver.some((run) => run === "w");
console.log(anyWicketSuccess);
```

In the above example `runsThisOver.some((run) => run >= 4)` in this line we are specifying the condition that run must be greater than or equal to 4. So if any of the element from the array satisfies this condition then the reult will be `true`. In second line `runsThisOver.some((run) => run === "w")` same thing we are checking for 'w' character i.e. wicket. For array 'runsThisOver' this condition will be false for all the elements hence this will return `false` while for array 'successfulOver' the condirtion will be true for element at index 2 hence it will return `true`

The output of above code will be.

```
true
false
true
```

**2. every method** - Now some method returns true if any one or more elements of the array satisfy the condition specified in callback function, but every() method will return true only when all the elements satisfies the condition. If any one element fails the condition then every method will return false.

```javascript
const runsThisOver = [0, 2, 4, 1, 6, 0];
const runsLastOver = [4, 6, 4, 4, 6, 4];

const allBoundary = runsThisOver.every((run) => run >= 4);
console.log(allBoundary);

const allBoundaryLastOver = runsLastOver.every((run) => run >= 4);
console.log(allBoundaryLastOver);
```

In above example we have given the same confition i.e. run must be greater than or equal to 4. but in first case with array 'runsThisOver' not all elements satisfy the condition hence this will return `false`, while in case of second array i.e. 'runsLastOver' all the array elements satisfies the condition hence this will return `true`
