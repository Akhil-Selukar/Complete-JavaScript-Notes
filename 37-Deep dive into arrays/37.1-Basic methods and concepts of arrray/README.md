## 37.1 Array methods and concepts

Arrays are special type of objects in javascript where the key value is always numeric (index). We can store multiple values with multiple datatypes in a single array and access the values based on index. Below are some of the commonly used arrray methods and concepts.

### slice method

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

> The one thing we have to note here is that the slice method does not change the actual array. It returns a completly new array.

### splice method

The next method which sound similar to slice is `.splice()` method. Splie method also accept two arguments. The first argument is the starting index and the second argument in splice is not the end index, but it is the number of elements to pick from starting index. Another thing to note in splice is that it actually mutate the original array which means it change the original array. Consider below example.

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

console.log(friends.splice(2));
console.log(friends);
```

The output of above code will be

```
['Penny', 'Amy', 'Howard', 'Bernadette', 'Raj']
['Sheldon', 'Leonard']
```

From above output we can see that the when we dont specify the second argument in splice() method then it takes all the values after the starting point hence we got `['Penny', 'Amy', 'Howard', 'Bernadette', 'Raj']` as output for `console.log(friends.splice(2));`. After eecuting the above splice method if we have a look at friends array then we can see that now the friends array only has two values. `['Sheldon', 'Leonard']`.

To check the splice method with two arguments have a look at below example.

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

console.log(friends.splice(2, 3));
console.log(friends);
```

Now in above example at `console.log(friends.splice(2, 3));` we have specified starting index as 2 and the second argument is 3 which means it will take 3 values from the starting index. So the output of above line will be `['Penny', 'Amy', 'Howard']`. Here it started from the 2nd index i.e. 'Penny' and then took next three values (Penny, Amy and Howard). After executing this line all the remaining values will be there in the original friends array. Hence the friends array will now be `['Sheldon', 'Leonard', 'Bernadette', 'Raj']`

Just like slice method we can specify negative index as well in the splice method. In this case it will count the index from last element of an array and take all the values (if second argument is not there)

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

console.log(friends.splice(-4));
console.log(friends);
```

Here the output will be

```
['Amy', 'Howard', 'Bernadette', 'Raj']
['Sheldon', 'Leonard', 'Penny']
```

As the fourth element from last is 'Amy' hence we got elements form 'Amy' till end of the array. And the elements remain in the original friends array are `['Sheldon', 'Leonard', 'Penny']`

If we give second argument with negative index value then it will take only that many values. Have a look at below example.

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

console.log(friends.splice(-4, 2));
console.log(friends);
```

Now the output in above case will be.

```
['Amy', 'Howard']
['Sheldon', 'Leonard', 'Penny', 'Bernadette', 'Raj']
```

Here it started from 4th index from last and took 2 values those are 'Amy' and 'Howard' and rest of the values are still in original friends array.

This is many time used to delete some element form an array.

### reverse method

Reverse method, as name suggest reverse the array and it is important to note that id does mutate/change the original array.

```javascript
const otherCasts = ["Stuart", "Priya", "Missy", "Leslie", "Zack"];

console.log(otherCasts.reverse());
console.log(otherCasts);
```

The output of above code will be.

```
['Zack', 'Leslie', 'Missy', 'Priya', 'Stuart']
['Zack', 'Leslie', 'Missy', 'Priya', 'Stuart']
```

From tthe output we can clearly see that the reverse method indeed reversed the array and it did the changes in original array.

### concat methods

Concat method is used to join two arrays and create a new array with all the elements from both the arrays. Concat method doesnot mutate any of the array, it simply returns new array.

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
const otherCasts = ["Stuart", "Priya", "Missy", "Leslie", "Zack"];

const allCasts = friends.concat(otherCasts);
console.log(allCasts);
console.log([...friends, ...otherCasts]);
```

The output of above code will be

```
['Sheldon', 'Leonard', 'Penny', 'Amy', 'Howard', 'Bernadette', 'Raj', 'Stuart', 'Priya', 'Missy', 'Leslie', 'Zack']
['Sheldon', 'Leonard', 'Penny', 'Amy', 'Howard', 'Bernadette', 'Raj', 'Stuart', 'Priya', 'Missy', 'Leslie', 'Zack']
```

From above example we can see that just like concat we can get the same result by using spread operator as well.

### join method

Join method is used to convert an array into a string with given separator and all the elements of array.

```javascript
const otherCasts = ["Stuart", "Priya", "Missy", "Leslie", "Zack"];

console.log(otherCasts.join("-"));
```

The output of above code will be.

```
Stuart-Priya-Missy-Leslie-Zack
```

Here we can see that all the elements of otherCases array are joined using '-' and a single string is returned.
