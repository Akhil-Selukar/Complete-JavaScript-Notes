## 35 Strings in javascript

Methods on strings are almost similar to that of arrays. Strings are also iterables and hence we can iterate over strings using loop.

Have a look at below example.

```javascript
"use strict";

const showName = "Big Bang Theory";
const season = "Season 1";

console.log(season[0]);
console.log(season[1]);
console.log(season[2]);
console.log(season[7]);
console.log(Number(season[7]));

console.log(season.length);

console.log(showName.indexOf("B"));
console.log(showName.indexOf("g"));
console.log(showName.lastIndexOf("B"));
console.log(showName.lastIndexOf("g"));

console.log(showName.indexOf("Bang"));
console.log(showName.indexOf("bang"));

console.log(season.charAt(3));

console.log(showName.slice(4));
console.log(showName.slice(4, 8));
console.log(season.slice(season.indexOf(" ") + 1));
console.log(season.slice(-1));
```

First look at the output of above program and then we will go over each and every console.log() one by one.

```
S
e
a
1
1
8
0
2
4
7
4
-1
s
Bang Theory
Bang
1
1
```

Now if we look at the first console.log() i.e. `console.log(season[0]);`, just like arrays it is accessing the 0th index element of the string `Season 1` and hence we got 'S' in the outpu. Similarly for next 3 lines we are accessing elements at different indices and hence we got the values 'e', 'a', and '1' (as a string) in the output. Now when we access the element based on index it returns string only hence the element at index 7 which is 1 will be returned as a string. To convert this into a number we used Number() function.

Just like size in array we can use length property of stringto get the length of string. Length of a string is calculated starting with 1, while index starts from 0.

By using 'indexOf()' and 'lastIndexOf()' we can check at what index the given letter/word is present in the string. If the word or letter is not present then it returns -1 and if it present then it returns the starting index of the word or the index of the letter. Hence as a output of `console.log(showName.indexOf("B"));` we got 0 as 'B' is present at the start of 'Big Bang Theory' whereas when we use lastIndexOf() i.e. `console.log(showName.lastIndexOf("B"));` we got 4 as output as the last occurance of 'B' is at 4th index. (This is case sensitive).

Just like letter we can search for word as well. Here the output will be the starting index of the word, and if the word is not present then it will return -1.

To get specific portion out of the string we can use slice() method. In this method we can pass two arguments, 1st argument will be the starting index of the required portion of string and second argument will be the end index of the required string. (We must note that the start index is included in the separated string while end index is excluded.) As strings are immutable hence slice method does not alter or modify existing string but it return a new sliced string. In slice method second argument is optional and if we don't pass second argument it simply return the sliced string from start index to the end of string.
If we pass negative value in the slice method then that index will be counted from the last index of string, hence in case of `console.log(season.slice(-1));` we got 1 as output. Because it start slicing the string from last but 1 index till the end of the string.
