## 37.9 Sorting an array

We have a array method called sort(), which as name suggest sort the array (by default in ascending order). havee a look at below example of sorting.

Important thing to note while working with sort is, Sort method mutate the original array.

```javascript
const userNames = [
  "Sheldon",
  "Penny",
  "Leonard",
  "Raj",
  "Howord",
  "Amy",
  "Bernadette",
];

console.log(userNames.sort());

const numbers = [12, 53, -16, -45, 56, 81, -27, 3];
console.log(numbers.sort());
```

Here the output of above code will be.

```
['Amy', 'Bernadette', 'Howord', 'Leonard', 'Penny', 'Raj', 'Sheldon']
[-16, -27, -45, 12, 3, 53, 56, 81]
```

From the above example we can see that sort method did sorted the userNames array perfectly fine but with numbers array output is not as expected. This is because sort method works on string, means it will consider everything as string while sorting. Hence numbers inside the numbers array were also considered as string and hence it sorted them as per string sorting and not as per the numerical sorting. Now we can fix this by using a callback function with sort() method. Have a look at below code which will fix sorting of numeric array.

```javascript
const numbers = [12, 53, -16, -45, 56, 81, -27, 3];

// ascending order
numbers.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});

console.log(numbers);

// descending order
numbers.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

console.log(numbers);
```

Here in callback function we are passing two values a and b, those values are nothing but the current value and next value in the array. Now if current value is greater than the next value then we have to return any positive number and if the current value is less than the next value then we have to return any negative number. Here the number can be any number. (for descending order we just have to reverse the above logic) Now if in this case we check the output then it will work as epected.

```
[-45, -27, -16, 3, 12, 53, 56, 81]
[81, 56, 53, 12, 3, -16, -27, -45]
```

Now as we know that the number can be any number just the positive or negative sign matters hence we can simplify the above callback function as below.

```javascript
const numbers = [12, 53, -16, -45, 56, 81, -27, 3];

// ascending order
numbers.sort((a, b) => a - b);

console.log(numbers);

// descending order
numbers.sort((a, b) => b - a);

console.log(numbers);
```

Here it is obvious that if a is greater than b then a-b will generate a positive number and if a is less than b then a-b will generate negative number hence above simplified form will also work with numerical as well as string array (in case of string array ascii values will be used in background)
