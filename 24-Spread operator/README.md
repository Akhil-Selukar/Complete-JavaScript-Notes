## 24 Javascript Spread Operator.

Spread operator is nothing but ... i.e. three dots. What this operator does is it gives all the elements of an array individually. (without array data structure.). For example

```javascript
const colors = ["Red", "Green", "Blue", "Yellow"];
console.log(colors);
console.log(...colors);
```

In above code we have an array named 'colors' and first we are printing the array as it is and after that we are printing the array with spread operator `console.log(...colors);` The output of the code is given below.

```
["Red", "Green", "Blue", "Yellow"]
Red Green Blue Yellow
```

From above output we can see that the first console.log where we are printing the array directly will print the array as it is (i.e. arrray data structure.) While if we print the array with spread operator we are getting the values inside the colors aray individually i.e. without the array data structure.

This is very useful when we want to add all the elements from one array to another array, have a look at below example.

```javascript
const colors = ["Red", "Green", "Blue", "Yellow"];
const newColors = ["Orange", "Pink", ...colors];

console.log(newColors);
```

The output for above code is.

```
['Orange', 'Pink', 'Red', 'Green', 'Blue', 'Yellow']
```

Here we can see that in the newColors all the elements of 'colors' got added individually and has separate index for each color and not like `["Orange", "Pink",["Red", "Green", "Blue", "Yellow"]]`.

_Note : The main difference between spread operator and array destructuring is that spread operator dees not assign the values to any variables._

By using spread operator we can do shallow copies of an array.

```javascript
const colors = ["Red", "Green", "Blue", "Yellow"];

const colorsCopy = [...colors];

console.log(colorsCopy);
```

Here in above code we are creating a shallow copy of colors array.

_Important Note : spread operator works on all the iterables including string. Since ES 2018 spread operator also works on objects even though objects are not iterable_

Consider below example to see spread operator with objects.

```javascript
const john = {
  fullName: "John doe",
  age: 36,
  phoneNumber: 9874563215,
  skills: ["Javascript", "Python", "ReactJS"],
};

// console.log(...john) // This is not allowed.

const updatedJohn = {
  address: "8th block, 221B - Baker St, London, UK",
  ...john,
  job: "Developer",
};

console.log(updatedJohn);
```

In above code when we directly use spread operator to print individual elements of an object the it will throw error <span style="color:red">Uncaught TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function</span> this is because object is not an iterable and spread operator expecct an iterable. But if we use spread operator on objects while creating shallow copy of an object or copy with additional attributes then it works. Hence the below code will work and generate new object called updatedJohn

```javascript
const updatedJohn = {
  address: "8th block, 221B - Baker St, London, UK",
  ...john,
  job: "Developer",
};
```

The output of the overall code will be.

```
{
  address: "8th block, 221B - Baker St, London, UK"
  ag: 36
  fullName: "John doe"
  job: "Developer"
  phoneNumber: 9874563215
  skills: ['Javascript', 'Python', 'ReactJS']
}
```
