## 25 Rest Operator in javascript

The rest and spread both operator is denoted by ... i.e. three dots just that if the ... are on the right hand side of assignment operator (=) then it is spread operator while if it is at the left hand side of the assignment operator it is rest operator.

Rest operator behaves exactly opposit to the spread operator. Spread operators is used to unpack an array while rest operator is used to pack elements to form an array. It is used with destructuring, it collects all the unassigned elements in destructuring of an array. Consider below code example.

```javascript
"use strict";

const colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Pink"];

const [color1, , color3, ...remainingColors] = colors;
console.log(color1);
console.log(color3);
console.log(remainingColors);
```

In the above example we are destructuring the colors array and we are assigning 'Red' to 'color1' then we are skipping over 'Green' then we are assigning 'Blue' to color3 and then we have `...remainingColors`. This remainingColors with rest operator (...) will collect all the destructured elements after 'Blue' from colors array and form a new array using them. This is what rest operator does. Hence the output of above code will be.

```
Red
Blue
['Yellow', 'Orange', 'Pink']
```

(It is called rest operator because it collects rest of the elements and combine them into an array)

In above example we can clearly see that rest operator doesnot collect any skipped element it just collect rest of the elements after last assignment in the destructuring. Hence rest must allways be in the last to collect all remaining elements. Also we can not use multiple rest in single destructuring assignment.

Rest operator also works with objects.

In case of using rest operator with object it collects rest of the elements in an object. Here as order doesnot matter matter while destructuring an object it will collect all remaining elements from the destructured object. Consider below example.

```javascript
const john = {
  fullName: "John doe",
  age: 35,
  contactNumber: 9874563215,
  address: "8th block, 221B - Baker St, London, UK",
};

const { fullName, contactNumber, ...remainingDetails } = john;

console.log(fullName);
console.log(contactNumber);
console.log(remainingDetails);
```

Here in above example we have an object called 'john' which has fullName, address, age and contactNumber. Now at line `const { fullName, contactNumber, ...remainingDetails } = john;` we are destructuring the object and extracting fullName and contactNumber and then we have used a rest operator and collected all the remaining properties into a object called 'remainingDetails'. The output for above code will be.

```
John doe
9874563215
{
  age: 35,
  address: "8th block, 221B - Baker St, London, UK",
}
```

From above response we can see that rest opertor had collected age aswell (not like rest operator with array which did not collect the skipped values). This is because object's are not index based. Hence rest operator with object will pick each and every of the remaining element irrespective of the order.

Rest operator works with nested object as well.

```javascript
const library = {
  jsBook: {
    title: "Complete javascript bootcamp",
    cost: 150,
    pages: 400,
  },
  mongoDBBook: {
    title: "Complete guide to MongoDB",
    cost: 100,
    pages: 260,
  },
  funBook: {
    title: "Fun with flags",
    cost: 180,
    pages: 276,
  },
};

const {
  mongoDBBook: { cost, ...restMongo },
  ...restBooks
} = library;

console.log(cost);
console.log(restMongo);
console.log(restBooks);
```

In the above example we have a nested object 'library' which has three objects one for each book. and each object has book title, cost and number of pages. At line below line we are destructuring the library object and fetching mongoDBBook first and then fetching cost out of it, after that we are combining the remaining properties from mongoDBBook into an object called restMongo using rest operator.

```javasccript
const {
  mongoDBBook: { cost, ...restMongo },
  ...restBooks
} = library;
```

We also combining all the remaining books from library object after destructuring the mongoDBBook into another object called restBooks using rest operator. The overall output of above code is.

```
100
{
  title: "Complete guide to MongoDB",
  pages: 260,
}
{
  jsBook: {
    title: "Complete javascript bootcamp",
    cost: 150,
    pages: 400,
  },
  funBook: {
    title: "Fun with flags",
    cost: 180,
    pages: 276,
  },
}
```

Above we can clearly see that the first console.log printed the cost of mongoDBBook i.e. 100. then second console.log printed the restMongo object which is nothing but the rest part of mongoDBBook. And third console.log printed the remaining two books from library except mongoDBBook.

Another usecase for rest operator is to pass unknown number of parameters to a function. For example consider a add function which will add given numbers and give print the output to the console. Now we can add 2 numbers, 3 numbers, 4,5,6,7...,1000,...n numbers so we can't go on writing that many functions. The one solution which we already saw was to pass the arguments as an array of numbers but the second and better solution is we can use rest operator at the function like below.

```javascript
"use strict";

function add(...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
}

add(3, 2);
add(5, 6, 8, 2);
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
```

Here in above code we are not restricting user to pass specific number of arguments or we are not asking user to do additional work of creating an array and then passing it as an argument. But we are converting whatever numbers are sent into a single array using rest operator `add(...numbers)` and then using that array to perform the addition. Hence for all the function calls with different number of arguments add function will work fine and give expected output.

```
5
21
55
```
