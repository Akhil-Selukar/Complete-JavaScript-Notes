## 37.2 Map method

Just like forEach we can loop over the array using map method as well. The main difference between two is that using map method we create new array of all elements after executing the callback function for each element. While forEach doesnot create any array implicitly, we have to create it if required. Have a look at below example for better understanding.

```javascript
const rainbow = [
  "Violet",
  "Indigo",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Red",
];

const modifiedRainbow = rainbow.map(function (color) {
  return `Color ${color}`;
});

console.log(modifiedRainbow);
console.log(rainbow);
```

The output of above code is.

```
['Color Violet', 'Color Indigo', 'Color Blue', 'Color Green', 'Color Yellow', 'Color Orange', 'Color Red']
['Violet', 'Indigo', 'Blue', 'Green', 'Yellow', 'Orange', 'Red']
```

From above output we can see that the 'Color' is added to each element of rainbow array and a completly new array is returned after performing the operation `Color ${color}` on each and every element of rainbow array. The actual rainbow array is as it is.

This above function can be simplified using arrow functions as below.

```javascript
const modifiedRainbow = rainbow.map((color) => `Color ${color}`);
```

If we want to do the same operation using forEach then we have to define the modifiedRainbow first and add the modified elements into the array manually.

Just like forEach, map also has access to index and actual array inside callback function. Have a look at below example.

```javascript
const alphabets = ["A", "B", "C", "D"];

const modifiedAlphabets = alphabets.map(function (value, index) {
  return `Alphabet at index ${index} is '${value}'`;
});

console.log(modifiedAlphabets);
```

The output for above code is

```
["Alphabet at index 0 is 'A'", "Alphabet at index 1 is 'B'", "Alphabet at index 2 is 'C'", "Alphabet at index 3 is 'D'"]
```

From above output we can see that we can access index by sending a second argument to the callback function, similarly by adding third argument we can access the complete original array inside map method aswell.

> [!NOTE] we can modify above callback function using arrow function as below
>
> ```javascript
> const modifiedAlphabets = alphabets.map(
>   (value, index) => `Alphabet at index ${index} is '${value}'`
> );
> ```
