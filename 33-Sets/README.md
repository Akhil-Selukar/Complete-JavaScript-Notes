## 33 Sets in javascript

Before ES6 javascript had only two data structure those are Objects and Arrays but in ES6 'Sets' and 'Maps' were added in javascript.<br>
Set is basically a collection of unique values, means sets can not have duplicate values. To create a set we can use `new` keyword and pass an iterable of values using which we want to create a set. Now as we know that arrays and strings are iterable, so we can pass array/string to create a set as below.

```javascript
const set1 = new Set([
  "Penny",
  "Sheldon",
  "Leonard",
  "Sheldon",
  "Penny",
  "Howard",
]);

console.log(set1);

const set2 = new Set("Bernadette");
cnsole.log(set2);
```

The output of above code is

```
{'Penny', 'Sheldon', 'Leonard', 'Howard'}
{'B', 'e', 'r', 'n', 'a', 'd', 't'}
```

Here we can see that in set1 'Penny' and 'Sheldon' are not repeated even though they were reapeted in the array used to create set1. Same in case with set2 as well, here in 'Bernadette' the letter 'e' and 't' are repeated but the set2 does not contain 'e' and 't' multiple times.

### methods and properties of set.

Below are the methods and properties that set has.

```javascript
"use strict";

const set1 = new Set([
  "Penny",
  "Sheldon",
  "Leonard",
  "Sheldon",
  "Penny",
  "Howard",
]);

console.log(set1.size);
console.log(set1.has("Bernadette"));
console.log(set1.has("Penny"));

set1.add("Raj");
console.log(set1);
set1.delete("Sheldon");
console.log(set1);
set1.clear();
console.log(set1);
```

The output of above code is

```
4
false
true
{'Penny', 'Sheldon', 'Leonard', 'Howard', 'Raj'}
{'Penny', 'Leonard', 'Howard', 'Raj'}
{}
```

By using `size` property we can get the number of elements present in the set hence `console.log(set1.size);` gave 4. By using `has()` method we can check if any element is present in the set or not. This method returns a boolean value i.e. `true` if the element si present in the set or `false` if not. Also we can add an element in the set by using `add()` method and we can delete an element using `delete()` method as shown in the example code above. There is no method or way available to retrive value out of a set as set contains all the unique elements and the order of element doesnot matter in case of set then retriving any element from set will not make any sence only knowing that the value is present in the set or not will also work. To clear all elements of a set we can use `.clear()` method. As sets are also an iterables so we can use 'for of' loop over set.

```javascript
const set1 = new Set([
  "Penny",
  "Sheldon",
  "Leonard",
  "Sheldon",
  "Penny",
  "Howard",
]);

for (const bbtCast of set1) {
  console.log(bbtCast);
}
```

The output will be

```
Penny
Sheldon
Leonard
Howard
```

Now in real world sets are mostly used to remove duplicate values in any array. Consider below example where we want to identify the different items available in a shopping cart.

```javascript
const cart = ["bag", "mobile", "T-shirt", "bag", "T-shirt"];

const uniqueItems = [...new Set(cart)];
console.log(uniqueItems);
```

In the above example let's say we have added 2 bags, 2 T-Shirts and a monbile into the cart and we want to identify the unique elements in this case we can use set. So here at line `const uniqueItems = [...new Set(cart)];` we are converting the 'cart' array to a set using `new Set()` which will remove the duplicates and then by using spread operator we are extracting the unique elements of the set to again create a array of unique elements.

Also if we want to get the count of number of unique items in the cart then we can do something like
`const uniqueCount = [new Set(cart).size];`
