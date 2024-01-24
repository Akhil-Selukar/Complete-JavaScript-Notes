## 26 Short Circuiting Using || and &&

Logical AND (&&) and logical OR (||) operator can also be used for short circuiting. We have already seen the [truthy and falsy values](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/08-Truthy%20and%20falsy%20values/README.md) in javascript. apart from boolean values logical AND and OR operator works on other datatypes as well based on their truthy or falsy value. And because of this we can create short circuiting in javascript.

To understand what exactly short circuiting is have a look at below example.

```javascript
"use strict";

console.log(3 || "John");
console.log(0 || "John");
console.log("John" || 0);
console.log(null || 4);
console.log(0 || null);
console.log(null || "John" || 0);
console.log(undefined || 6);
```

The output of above code is

```
3
John
John
4
null
John
6
```

Now, let's look at each line one by one.

In first line `console.log(3 || "John");`, both 3 and 'John' are truthy values and we got output as '3' i.e. first truthy value.

In second `console.log(0 || "John");`, 0 is a falsy value and 'John' is a truthy value and we got 'John' as output i.e. the truthy value as output.

In third `console.log("John" || 0);`, first value 'John' is truthy and second value (0) is falsy in this case as well we got 'John' i.e. truthy value as output. Same goes for `console.log(null || 4);`, `null` is a falsy value and 4 is truthy and we got 4 as output.

Here we can clearly observe that if we have one truthy and one falsy value then we get truthy value as output and in case of both truthy values we get first truthy value as output. Now what if both values are falsy values. In case of `console.log(0 || null);` both 0 and `null` are falsy values in this case we got `null` as output i.e second falsy value.

If we observe this closely we can see that if we use <b>logical OR (||) operator then the output is first truthy value which the operator found. And in case of no truthy value is present then the last value is the output.</b>

Now let's have a look at below code.

```javascript
let number = 12;

const result = true || number++;

console.log(result);
console.log(number);
```

Observe the output of above code.

```
true
12
```

How come the `number` variable be 12 even though we are using increament operator (++) on `number`. Well before explaining this check what happen if we change `true` to `false` in the logical operation `const result = true || number++;`

```javascript
let number = 12;

const result = false || number++;

console.log(result);
console.log(number);
```

Now the output is

```
12
13
```

Now in this case we got value of ressult as 12 and increment operation also got executed and we got 13 as `number`.

So, what happened in above scenario is. In case of || operator as soon as it finds any truthy value it immediately return that value and don't even bother to see further in OR operation, because if any of the value in logical OR operation is truthy then the result will always be true. Hence in case of `const result = true || number++;`, the first value in OR operation is `true` means truthy value hence immedialty `true` is returned and assigned to `result` and `number++` is simply skipped. This is exactly what short circuiting is.

In || operation as soon as a truthy value is found, that value is immediatly returned and everything after that value is skipped and || operation is short circuited.

In case of `const result = false || number++;`, first value is falsy hence second value was checked and as number i.e. 12 is truthy value it was returned and assigned to `result` and increment operation was performed on `number` to make it 13..

Just like logical OR, logical AND also perform short circuiting. The only difference is instead of truthy value && look for falsy value and as soon as a falsy value is found it immediatly return that value and skip everything after that value. In case of no falsy value is found, the && operator returns last truthy value. Have a look at belo example for short circuiting using && operator.

```javascript
console.log(3 && "John");
console.log(0 && "John");
console.log("John" && 0);
console.log(null && 4);
console.log(0 && null);
console.log("John" && null && 0);
console.log(undefined && 6);

let number2 = 12;

const result2 = true && number2++;

console.log(result2);
console.log(number2);
```

The output of above code is

```
John
0
0
null
0
null
undefined
12
13
```

### Summary

- In case of || operator,
  - It will <b>return first truthy value found</b> and skip all values after that.
  - If no truthy value is present then returns last value.
- In case of && operator,
  - It will <b>return first falsy value found</b> and skip all values after that.
  - If no falsy value is present then returns last value.
