## 37.6 Find Index Method

FindIndex works just like find method, the only difference here is find method fives the actual value which is found while the findIndex method as name suggest returns the index value of the found element. In case of the index is present multiple times then it will return the first index. Have a look at below example.

```javascript
"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];

const indexForSixRuns = runsThisOver.findIndex((run) => run === 6);
console.log(indexForSixRuns);

const indexForZeroRuns = runsThisOver.findIndex((run) => run === 0);
console.log(indexForZeroRuns);
```

The output of above code will be.

```
4
0
```

The above output is because the 6 run is present at index 4 while 0 run is first present at index 0 itself.

At first glance it looks very similar to indexOf() method, but there is a very big difference. In index of we can only search the value like `runsThisOver.indexOf(4)`, while in findIndex we can pass a callback function in which we can write any condition which will generate a boolean value (It is not necessary that we can pass only values) like `runsThisOver.findIndex((run) => run/2)`, Here run/2 is not actually a value which is present in the array but it is an condition based on which we can find the element in given array.
