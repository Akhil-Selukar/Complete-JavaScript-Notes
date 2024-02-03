## 37.1 Array methods and concepts

Arrays are special type of objects in javascript where the key value is always numeric (index). We can store multiple values with multiple datatypes in a single array and access the values based on index. Below are some of the commonly used arrray methods and concepts.

Consider below code example.

```javascript
"use strict";

const friends = [
  "Sheldon",
  "Leonard",
  "Penny",
  "Amy",
  "Howard",
  "Bernadette",
  "Raj",
];

console.log(friends.length);

console.log(friends.slice(2));
console.log(friends.slice(2, 5));
console.log(friends.slice(-3));
console.log(friends.slice());
console.log([...friends]);
```

The output of above code is.

```
7
['Penny', 'Amy', 'Howard', 'Bernadette', 'Raj']
['Penny', 'Amy', 'Howard']
['Howard', 'Bernadette', 'Raj']
['Sheldon', 'Leonard', 'Penny', 'Amy', 'Howard', 'Bernadette', 'Raj']
['Sheldon', 'Leonard', 'Penny', 'Amy', 'Howard', 'Bernadette', 'Raj']

```

In above example we have an array called 'friends' which store names of 7 friends. Hence when we call `console.log(friends.length);` it returned 7 i.e. number of elements in the array.

**.slice()** - Slice method is used to etract specific part of array or a sub-array from given array. slice() method accepts two arguments, first one is the start index (this will be included in the resultant array) and second is end index (this will be excluded from the resultant array).

Line `console.log(friends.slice(2));` will start from 2nd index i.e. 'Penny' (indexing starts from 0) and as no end index is specified it will go till end of the array. Hence for this the output will be `['Penny', 'Amy', 'Howard', 'Bernadette', 'Raj']`

Line `console.log(friends.slice(2, 5));` will start from 2nd index and will go till 5th index (5th index will not be part of resultant arrray). Hence the output will be `['Penny', 'Amy', 'Howard']`

Line `console.log(friends.slice(-3));` specifies negative index. As only one index is present so it has to be the starting index. Now negative index means start counting from last and as starting index is included so it will start from 3rd last index and will go till end of the array hence we got last three values `['Howard', 'Bernadette', 'Raj']`.

Line `console.log(friends.slice());` does not specify any index so this will start from first element and go till last element. Means this will return the exact same array. This syntax is used to create a shallow copy of array. Same thing can be done by using [spread operator](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/24-Spread%20operator) as `console.log([...friends]);`. The only difference is when we use slice method we can do method chaining.
