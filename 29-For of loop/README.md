## 29 For of loop in javascript

For of loop is a new addition in ES6. This is a better way to loop over an array where we dont have to worry about the counters, condition and increment decrement. Below is the example of 'for of' loop in javascript.

```javascript
"use strict";

const john = {
  fullName: "John doe",
  age: 35,
  contactNumber: 9874563215,
  frontEndSkills: ["HTML & CSS", "ReactJS", "AngularJS"],
  backEndSkills: ["Java", "Python", "Spring Boot"],
  otherSkills: ["DevOps", "git"],
};

const allSkills = [
  ...john.frontEndSkills,
  ...john.backEndSkills,
  ...john.otherSkills,
];

for (const skill of allSkills) {
  console.log(skill);
}
```

The output for above code is

```
HTML & CSS
ReactJS
AngularJS
Java
Python
Spring Boot
DevOps
git
```

In above example we have an object 'john' with three different arrays containing his front end, back end and other skills. Now to iterate over all skills we combined all the three arrays in one single array using spread operator `const allSkills = [...john.frontEndSkills, ...john.backEndSkills, ...john.otherSkills];` here all the elements from three different arrays will together form a single array `allSkills`. Now we can use a normal for loop using counter and specifying condition that counter must be less than the length of allSkills array and then fetching value based on index using counter. But this whole thing can be simplified using 'for of' loop.

```javascript
for (const skill of allSkills) {
  console.log(skill);
}
```

Here we can see that we dont have to maintain the counter, we dont have to specify the condition. We simply define a variable which will hold one value from allSkills array at each iteration of the loop. And hence we got all the skills printed on the console.

Now the one thing which is missing in above implementation of 'for of' is we can't print the index or we can't track the iteration number. To do this we can modify the for of loop a bit. Have a look at below example.

```javascript
for (const skill of allSkills.entries()) {
  console.log(`skill at index ${skill[0]} is ${skill[1]}`);
}
```

In above modification we changed `allSkills` to `allSkills.entries()`. Now if we take a look at what exactly .entries() return by printing the output using `console.log(...allSkills.entries());` the the output will be.

```
[0, "HTML & CSS"]
[1, "ReactJS"]
[2, "AngularJS"]
[3, "Java"]
[4, "Python"]
[5, "Spring Boot"]
[6, "DevOps"]
[7, "git"]
```

So the output of `allSkills.entries()` is an iterable with individual arrays of element and it's index value, so we can use this to get the index as well as value. Now have a look at the below complete code.

```javascript
"use strict";

const john = {
  fullName: "John doe",
  age: 35,
  contactNumber: 9874563215,
  frontEndSkills: ["HTML & CSS", "ReactJS", "AngularJS"],
  backEndSkills: ["Java", "Python", "Spring Boot"],
  otherSkills: ["DevOps", "git"],
};

const allSkills = [
  ...john.frontEndSkills,
  ...john.backEndSkills,
  ...john.otherSkills,
];

// console.log(...allSkills.entries());

for (const skill of allSkills.entries()) {
  console.log(`skill at index ${skill[0]} is ${skill[1]}`);
}
```

The output of this code now is.

```
skill at index 0 is HTML & CSS
skill at index 1 is ReactJS
skill at index 2 is AngularJS
skill at index 3 is Java
skill at index 4 is Python
skill at index 5 is Spring Boot
skill at index 6 is DevOps
skill at index 7 is git
```

We can even modify the code as `skill` will be holding an array during each iteration so we can use destructuring of array and get index and value in separate variable like below.

```javascript
"use strict";

const john = {
  fullName: "John doe",
  age: 35,
  contactNumber: 9874563215,
  frontEndSkills: ["HTML & CSS", "ReactJS", "AngularJS"],
  backEndSkills: ["Java", "Python", "Spring Boot"],
  otherSkills: ["DevOps", "git"],
};

const allSkills = [
  ...john.frontEndSkills,
  ...john.backEndSkills,
  ...john.otherSkills,
];

// console.log(...allSkills.entries());

for (const [index, value] of allSkills.entries()) {
  console.log(`skill at index ${index} is ${value}`);
}
```

**Note:** We can use break and continue statement inside 'for of' loop just like normal for loop.
