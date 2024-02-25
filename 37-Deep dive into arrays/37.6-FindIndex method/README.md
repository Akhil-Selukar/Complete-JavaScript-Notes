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
