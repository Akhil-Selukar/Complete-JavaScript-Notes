## 15 Javascript Arrays

Array is nothig but a collection of different values. Consider that you have to store the subjects that one perticular student opted for his/her studies. In this scenario one way is you can create n-number of variables to hold n subject names. but managing these many variables throughout the code is a hectic task and is not advisable. Hence the better way to achieve this is to declare an Array and store all subjects in it. Have a look at below example where two ways of defining an array are shown.

```javascript
const subjects = ["English", "Science", "Geography", "Mathematics"];
const languages = new Array("C", "Java", "Python");

console.log(subjects);
console.log(languages);
```

In the above code we have defined two arrays in two different ways.
One is we can simply use square brackets '[]' and write all the elements separated by commas. And the other way is to use `Array` function with `new` keyword and write all the comma separated elements inside a bracket '()'.

The output for above code will be.

```
['English', 'Science', 'Geography', 'Mathematics']
['C', 'Java', 'Python']
```

We can also store elements of different type in same array i.e. below is also possible.

```javascript
const numbers = ["One", 2, 3.6, "Four"];

console.log(numbers);
```

It will give output as.

```
["One", 2, 3.6, "Four"]
```

<hr>

### Accessing array elements

We can access array elements by using index number. Array index starts from 0, hence first element in an array will have index 0, second element will have index of 1 and similarly Nth element in an array will have index value of 'N-1'. We can write array name followed by index value in square bracket to access element at that index.

```javascript
const subjects = ["English", "Science", "Geography", "Mathematics"];
const languages = new Array("C", "Java", "Python");

console.log(`First subject is ${subjects[0]}`);
console.log(`Third subject is ${subjects[2]}`);
console.log(`Second language is ${languages[1]}`);
console.log(`Tenth language is ${languages[10]}`);
```

Here the output will be as below. Here `subjects[0]` is trying to access the element present at 0th index in 'subjects' array which is 'English' hence first language is 'English' and so on. Also we can see that if we try to access element which is not present in the array i.e. `languages[10]` it gives us `undefined`.

```
First subject is English
Third subject is Geography
Second language is Java
Tenth language is undefined
```

Also Apart from just accessing the elements based on index value we can also modify the element at specific index. For example consider below code.

```javascript
const subjects = ["English", "Science", "Geography", "Mathematics"];
const languages = new Array("C", "Java", "Python");

subjects[2] = "Computer science";
console.log(subjects);
languages[5] = "C#";
console.log(languages);
```

In above example at line `subjects[2] = "Computer science";` we are assigning value "Computer science" to the index number 2 of subjects array i.e. at 3rd place in the array, hence 'Geography' will be replaced by 'Computer science' and new array will become `["English", "Science", "Computer science", "Mathematics"]`. Also we can assign new value to the index which was not defined. The output for above code will be.

```
['English', 'Science', 'Computer science', 'Mathematics']
['C', 'Java', 'Python', empty × 2, 'C#']
```

Here the `empty x 2` represents the 2 index after 'Python' does not have any value i.e. `undefined` and aftere that we have some value i.e. `C#`. If we try to access the value at empty index it will give `undefined` as output.

<strong>IMPORTANT NOTE - </strong> We have declared the subjects array as constant using const but still we are able to change the element at specific index. This is because we are not changing the array itself we are just changing the content of that array and constant 'subjects' holds the instance of Array not the elements in that arrray hence reassigning the element of an array defined using const is possible but we can not assigne a completly new array to it. Meaning below will not be possible.

```javascript
const subjects = ["English", "Science", "Geography", "Mathematics"];
const languages = new Array("C", "Java", "Python");

subjects = languages;
```

Here we are reassigning the subject array with completly different array i.e. language.This will give us below error

<p style="color:red;">script.js:22 Uncaught TypeError: Assignment to constant variable.</p>

We can store an entire array as an element of another array. i.e. below is possible.

```javascript
const subjects = ["English", "Science", "Geography", "Mathematics"];
const languages = new Array("C", "Java", "Python");

subjects[4] = languages;
```

Here we are adding a new element to the 'subjects' array and that new element is itself an array i.e. 'languages'.

Till now we have seen that we can add element at specific index, but if we are not sure about the length of an Array and we want to add the element at the end then we can use `push()` method of array. Similarly we take out the last element of an array we can use `pop()` method of array. When we push any element using push() method it returns the new length of that array while when we pop last element of an array it returns the popped element.

```javascript
const skills = ["Coding", "Debugging", "Testing"];

console.log(skills);
skills.push("Devops");
console.log(skills);
const poppedElement = skills.pop();
console.log(skills);
console.log(`Popped element is ${poppedElement}`);
```

The above code will generate below output.

```
['Coding', 'Debugging', 'Testing']
['Coding', 'Debugging', 'Testing', 'Devops']
['Coding', 'Debugging', 'Testing']
Popped element is Devops
```

Here we have one array named `skills` with 3 elements. When we do `skills.push("Devops);`, value 'Devops' get's added to the end of skills array so the second console.log() gives modified array with 'Devops' as fourth value. Now when we do `skills.pop()` the last element of skills array i.e. 'Devops' is popped out and stored in `poppedElement` and hence the 3rd console.log() prints only three elements i.e. the original array and the popped element has the value 'Devops'.

Now similar to adding element at the end of an array we can add element at the start using `unshift()` method and take out the first element by using `shift()` method. Just like push and pop here as well unshift returns length of modified array and shift returns the element which was present at index 0 i.e. first position. Have a look at below code and it's output for better understanding.

```javascript
const skills = ["Coding", "Debugging", "Testing"];

skills.unshift("GitHub");
console.log(skills);
const shiftedElement = skills.shift();
console.log(skills);
console.log(`Shifted element is ${shiftedElement}`);
```

The output of above code is.

```
['GitHub', 'Coding', 'Debugging', 'Testing']
['Coding', 'Debugging', 'Testing']
Shifted element is GitHub
```

Apart from this methods of array there are many other methods available. Few useful methods are given below.

_indexOf()_ - This will return the inde of given element. If that element is not present then it will return -1.

_includes()_ - This will return true if the given element is present in the array, otherwise it will return false.

_length_ - This is not method, this is property of an array but it is very useful. It returns the number of elements present in an array.

```javascript
const skills = ["Coding", "Debugging", "Testing"];

console.log(skills.indexOf("Debugging"));
console.log(skills.indexOf("Marketing"));

console.log(skills.includes("Coding"));
console.log(skills.includes("Swimming"));

console.log(skills.length);
```

thou output of above code is.

```
1
-1
true
false
3
```
