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

Have a look at below code example.

```javascript
const case1 = "Sheldon Cooper";
const emailId = "   SheldonCooper@bbt.com   ";

console.log(case1.toLowerCase());
console.log(case1.toUpperCase());
```

In above code '.toLowerCase()' and '.toUpperCase()' as name suggest will it convert the string to complete lower case or complete upper case respectively. hence the output of above code will be.

```
sheldon cooper
SHELDON COOPER
```

Now in above example only we can see that the email id is not in correct format, means there are some upper case letters present in the email id, also there are some leading and some trailing void spaces. If we want to convert the above eamil id in acceptable format then to convert it into lower case we can simply use toLowerCase() method, but how to remove the void spaces from the string. For that we have a trim() method.

```javascript
const case1 = "Sheldon Cooper";
const emailId = "   SheldonCooper@bbt.com   ";

console.log(emailId.toLowerCase());
console.log(emailId.trim());
```

In above example we are converting the email id into lower case and then we are applying the trim() method. The expected output here is email id in lower case without ant leading or trailing void spaces. But the actual output is.

```
   sheldoncooper@bbt.com
SheldonCooper@bbt.com
```

Here we can see thet first only the uppercase letters are converted to lowercase and then only the void spaces are removed. But we want both. Both the operations are not applied here because we already know that strings are immutable hence every time we use any function on string it returns a new string. This is why we can do chaining of methods as one method return the output as new modified string and we can apply another method on it. Hence to get desired output we can do.

```javascript
const case1 = "Sheldon Cooper";
const emailId = "   SheldonCooper@bbt.com   ";

console.log(emailId.toLowerCase().trim());
```

Now here the output will be as expected.

```
sheldoncooper@bbt.com
```

The trim() method removes void spaces from both the ends, but what if we want to remove spaces from only one end. For this in ES2019 two more methods are added 'trimStart()' and 'trimEnd()' which will trim the void spaces from start and end of the string respectively.

Replacing specific letter or word from string is also possible. We can use replace() method for this purpose. 'replace()' method accepts two arguments the first one is the letter or word which you want to replace and the second one is the letter or word with which you want to replace the first argument. Consider below example.

```javascript
const line1 = "Two documents are missing.";

const result = line1.replace("Two", "Couple of");
console.log(result);
```

Hene in above example we are replacing 'Two' with 'Couple of' and the replace operation will generate a new string this we are string in another variable called 'result'. The output of above code will be.

```
Couple of documents are missing.
```

As here as well replace() method is giving back a new string, we can apply method chaining. Let's say we want to replace 'Two' with 'Couple of' and 'missing' with 'found' then instead of first replacing one word and storing it's result into another and then replacing the second word from that string. We can simple do method chaining and write both replacement in a single line as.

```javascript
const line1 = "Two documents are missing.";

const result = line1.replace("Two", "Couple of");
const result2 = line1.replace("Two", "Couple of").replace("missing", "found");
console.log(result2);
```

The output of above code will be

```
Couple of documents are found.
```

Now let's have a look at below example.

```javascript
const billString =
  "There are two items in your cart and your bill amount is two thousand and eighty two.";

console.log(billString.replace("two", "three"));
```

You might expect the output as `There are three items in your cart and your bill amount is three thousand and eighty three.`. But here if we see the actual output of this code then it will be `There are three items in your cart and your bill amount is two thousand and eighty two.`. Only the first 'two' is replaced with 'three' and remaining 'two' is still as it is. To fix this we can use 'replaceAll()' instead of just replace().

```javascript
const billString =
  "There are two items in your cart and your bill amount is two thousand and eighty two.";

console.log(billString.replaceAll("two", "three"));
```

Now the output will be as expected.

```
There are three items in your cart and your bill amount is three thousand and eighty three.
```

Now if we want to check if the given string starts with a specific word or not/ if it ends with specific word or not/ if it contains specific word or not in all this cases we can use below string methods which return boolean.

```javascript
const billString =
  "There are two items in your cart and your bill amount is two thousand and eighty two.";

console.log(billString.startsWith("Hello"));
console.log(billString.startsWith("There"));
console.log(billString.endsWith("five."));
console.log(billString.endsWith("two."));
console.log(billString.includes("bag"));
console.log(billString.includes("cart"));
```

In the above example 'startsWith()' method as name suggests will check that if the string starts with given word/letter or not. Similarly 'endsWith()' check for if the string ends with given word/letter or not, and 'includes()' method check if the string contains given word/letter or not (It can be present anywhere in the string.)

The output of above code will be.

```
false
true
false
true
false
true
```

All the three methods above are case sensitive hence in most of the cases these methods are used with 'toUpperCase' or 'toLowerCase' methods like below.

```javascript
const billString =
  "There are two items in your cart and your bill amount is two thousand and eighty two.";

console.log(billString.toLowerCase().startsWith("hello"));
console.log(billString.toLowerCase().startsWith("there"));
console.log(billString.toLowerCase().endsWith("five."));
console.log(billString.toLowerCase().endsWith("two."));
console.log(billString.toLowerCase().includes("bag"));
console.log(billString.toLowerCase().includes("cart"));
```

The output will still remain the same.
