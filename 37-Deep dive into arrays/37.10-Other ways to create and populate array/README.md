## 37.10 Ways to programatically create and populate array.

Till now we have created arrays like `const arr = ['a', 'b', 'c', 'd']`, but there are few other wasy aswell to create an array. have a look at belo code.

```javascript
const arr_1 = new Array(8);
console.log(arr_1);
```

Above code will also create an array with 8 empty elements. here 8 is not one of the element in the array but it is the size of array which will be created. We are using Array class here and by using new keyword and constructor of array class we are creating a array of length 8. If we print the array on console then it will be an array of 8 empty places or an array of length 8.

Now to insert value in this array we have many ways like directly placing value at specific index like `arr_1[2] = "A";` or by using for loop and looping over empty array and placing value at each index and so on. But apart from this there are few methods like fill() and from() (from() is use to create and fill an array at the same time). Let's take a look at these methods.

**fill() method** - Fill method is used to fill an empty or mutate an already filled array. We can use fill() method accepts three parameters out of which second and third parameters are optional. Have a look at below example.

```javascript
const arr_1 = new Array(8);

arr_1.fill(3);
console.log(arr_1);
```

Here at first line we have created an empty array with length 8. Now when we call fill method on that array with only one parameter which is '3', all the 8 places in that array will be filled with 3. Hence on console we will get the array as `[3, 3, 3, 3, 3, 3, 3, 3]`. So from this we can say that the first argument which is compulsory in fill() method is the value which need to be placed in the array.

Now if we want to fill the newly created empty array with value 3, but we don't want to fill all the places. We just want to fill from index 3 to index 6 (including index 6). So in this case we can use the fill method with three arguments where the second argument will be the starting index from where we want to start filling the elements and the third argument will be the end index till which we want to fill the element. Hence for above requirement we can write.

```javascript
const arr_1 = new Array(8);

arr_1.fill(3, 3, 6);
console.log(arr_1);
```

Now the output will be

```
[,,, 3, 3, 3, 3,,]
```

If we dont specify the last index then the value will be added till the end of that array.

By using fill we can change/mutate existing array as well.

```javascript
const arr = [1, 2, 3, 4, 5, 6];
arr.fill("A", 2, 4);

console.log(arr);
```

The output of above code will be `[1, 2, 'A', 'A', 5, 6]`

<hr>

**from() method** - from() is a method of array class, this method accepts length of array and an callback function to fill the array the callback function is optional. Have a look at below example.

```javascript
const arr_2 = Array.from({ length: 7 });

console.log(arr_2);
```

Here we have called from() method of 'Array' class and given length as 7 but we have not pass any callback function or second argument hence the array created by this from() method will be an array of legth 7 with all values as `undefined` (Note that by using new keyword array is createed with empty values but by using from() method array is created with undefined values.) The output of above code will be

```
[undefined, undefined, undefined, undefined, undefined, undefined, undefined]
```

Below example shows the use of callback function to set the initial value to array element.

```javascript
const arr_2 = Array.from({ length: 7 }, () => 1);

console.log(arr_2);
```

Here we have simply returned 1 from the callback function hence all the values of the array will be set to 1. and the output will be `[1, 1, 1, 1, 1, 1, 1]`. The call back function here is same as that of other callback functions whcih will have access to current element, index value and the whole array as first, second and third arguent respectively. So by using index, we can do something like below as well.

```javascript
const arr_2 = Array.from({ length: 7 }, (_, index) => index + 1);

console.log(arr_2);
```

Here the first argument to the callback function is actual element which will be 'undefined'' always in above case and we dont need that element hence we have created a dummy variable '\_' the second argument is index value which we used to populate values in the array and hence the output is `[1, 2, 3, 4, 5, 6, 7]`
