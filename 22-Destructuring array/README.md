## 22 Javascript Destructuring Array

Destructuring is a modern javascript feature of extracting elements from an array or an object into individual variables.

Consider we hav an array 'colors' with values red, green and blue. If we want to get the elements of the array into separate individual variables then we traditionally use array index and store value at each index into saperate variable but this is doable without using array index and by using destructuring of array. Below example shows the same.

```javascript
const colors = ["Red", "Green", "Blue"];

// Using array index
const color_1 = colors[0];
const color_2 = colors[1];
const color_3 = colors[2];

console.log(color_1, color_2, color_3);

// Using destructuring of array
const [newColor_1, newColor_2, newColor_3] = colors;

console.log(newColor_1, newColor_2, newColor_3);
```

The out of above code will be

```
Red Green Blue
Red Green Blue
```

We can see that both the way of extracting the elements from an array gives same result. _Even after destructuring the array original arrayr remain as it is._

We can use destructuring of array to fetch limited number of elements as well. For example if we have an array name colors with value red, green, blue, yellow and black and we only want to extract first two colors from the array then we can do the following.

```javascript
const colors = ["Red", "Green", "Blue", "Yellow", "Black"];

// Destracturing to get only first two elements.
const [newColor_1, newColor_2] = colors;

console.log(newColor_1, newColor_2);
```

The above code will give only the first two colors i.e.

```
Red Green
```

If we want to extract first and third color then we can write below destructuring.

```javascript
const colors = ["Red", "Green", "Blue", "Yellow", "Black"];

// Destracturing to get only first two elements.
const [newColor_1, , newColor_3] = colors;

console.log(newColor_1, newColor_3);
```

Here we have entered a blank place at the second spot of destructuring operator hence the second color will not be extracted and the output will be

```
Red Blue
```

We can use array destructuring to return more than one values from a function. Consider below example where we have a restaurent object which contain details of the restaurent along with the menue for starters and main course. We have a mthod inside the restaurent object to order food from the restaurent. The order method accepts the index value of starter which user want to order and index value of main course dish which user want to order and based on the users selection order method return both the items user ordered. Now here we have to return two values from the order method, this can be achieved by Array destructuring as follows.

```javascript
"use strict";

const restaurent = {
  name: "Biryani house",
  location: "8th block, 221B - Baker St, London, UK",
  specialities: ["Biryani", "barbeque", "Non-Veg curry"],
  starters: ["Fish-fry", "Chicken-fry", "Boiled-egg"],
  mainCourse: [
    "Chicken curry",
    "Egg curry",
    "Fish curry",
    "Egg biryani",
    "Chicken biryani",
  ],

  order: function (starterIndex, mainCourseIndex) {
    return [this.starters[starterIndex], this.mainCourse[mainCourseIndex]];
  },
};

const [item1, item2] = restaurent.order(2, 4);

console.log(`Ordered item 1 is ${item1}`);
console.log(`Ordered item 2 is ${item2}`);
```

Here from order method of restaurent object we are returning two items as a single array but at the calliing part we are using array destructuring and extracting both the items from the array so that we can perform further operations on the individual items. This is a small trick to return multiple values from a function. The ouput of above code will be

```
Ordered item 1 is Boiled-egg
Ordered item 2 is Chicken biryani
```

Also we can destructure nested arrays as well. Consider we have array inside an array that can be destructured as follows.

```javascript
const weights = [10, 12, [24, 32]];

const [w1, w2, [w3, w4]] = weights;

console.log(w1);
console.log(w2);
console.log(w3);
console.log(w4);
```

In the above code we have weights array which has an nexted array `[24, 32]`. to destruct this array we have mentioned nexted array in destruction operator `[w3, w4]`. The output of above code will be.

```
10
12
24
32
```

In all the above examples we are aware of the array which we are destructuring. Consider that the only information we have is the array length might be 3 or less, but we are not sure about the exact array lenth and if we try destructuring the array then it will give `undefied` for the values which are ont present.

```javascript
const numbers = [10, 12];

const [num1, num2, num3] = numbers;
console.log(num1);
console.log(num2);
console.log(num3);
```

As tthe numbers array don't have 3rd element the value for num3 will be undefined, and the output will be.

```
10
12
undefined
```

In such sccenarios we can assign a default value to the destructured elements.

```javascript
const numbers = [10, 12];

const [num1 = 0, num2 = 0, num3 = 0] = numbers;
console.log(num1);
console.log(num2);
console.log(num3);
```

Now in above case even though the 'numbers' array don't have third element but the value of num3 will not be `undefined` it will be the default value 0 which we have assigned while destructuring hence the output will be.

```
10
12
0
```
