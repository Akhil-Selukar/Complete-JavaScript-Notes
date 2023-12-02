## 06 Javascript Logical Operators

In code logical operators are used to take complex decisions.
Below are the logical operatord present in javascript.

- Logical AND (`&&`)
- Logical OR (`||`)
- Logical NOT (`!`)

All the above operators works on their respective truth table mentioned belos.

- Logical AND (&&)

| A     | B     | A && B |
| ----- | ----- | ------ |
| true  | true  | true   |
| true  | false | false  |
| false | true  | false  |
| false | false | false  |

<br>
- Logical OR (||)

| A     | B     | A \|\| B |
| ----- | ----- | -------- |
| true  | true  | true     |
| true  | false | true     |
| false | true  | true     |
| false | false | false    |

<br>
- Logical NOT (!)

| A     | !A    |
| ----- | ----- |
| true  | false |
| false | true  |

<hr><br>

Consider below example to understand the working of logical AND (`&&`) operator.

```javascript
console.log(true && true);
console.log(true && false);
console.log(false && true);
console.log(false && false);
```

Output of the above code is

```
true
false
false
false
```

Here we can clearly see that we are getting true as result only when both the operands of logical AND i.e. `&&` are `true` otherwise it returns `false`.

Similarly have a look at below code to understand operation of logical OR operator (`||`)

```javascript
console.log(true || true);
console.log(true || false);
console.log(false || true);
console.log(false || false);
```

Output of the above code is.

```
true
true
true
false
```

Here the output is `true` even if one of the operand is `true`.

And for logical NOT (`!`) operator

```javascript
console.log(!true);
console.log(!false);
```

The output is

```
false
true
```

<hr>

**MPORTANT NOTE -** Logical operators (Except logical NOT) return boolean value only if operated on boolean operands. (It's not like it always return boolean) have a look at below example to understand this in a better.

```javascript
console.log(null && true); // null
console.log("hello" && true); // true
console.log("hello" && false); // false
console.log("hello" && "world"); // world

console.log(null || true); // true
console.log("hello" || true); // hello
console.log("hello" || false); // hello
console.log("hello" || "world"); // hello
console.log(false || "world"); // world
console.log(true || "world"); // true

console.log(!""); // true
console.log(!"hello"); // false
console.log(!null); // true
console.log(!undefined); // true
```

Here the output is written in front of each line as a comment

To understand above piece of code we need to understand actual working of the logical operators.<br>
Logical AND operator (`&&`) look for any falsy value and as soon as it get's the falsy value it returns that value otherwise if there is no falsy value, it returns the last value.<br>
Now the line `console.log(null && true);` will make sense. `null` is a falsy value and the operator is logical AND hence as soon as it found the flasy value it returned that i.e. `null`. Similarly for `console.log("hello" && true);` this line, there is no falsy value available hence it returned last value i.e. `true`. In `console.log("hello" && false);` there is a false itself hence it returned that. And in last `console.log("hello" && "world");` thete is no false value hence it returned the last value which is 'world'.

Logical OR operator (`||`) looks for any truthy value and as soon as it get's the truthy value it returns that value otherwise if there is no truthy value then it returns the last value<br>.
Now have a look at line `console.log(null || true);` here there is a true value so it returns `true`. In line `console.log("hello" || true);` both the values are truthy but as soon as the first truthy value is found the next value will not be checked and it returns the first truthy value (in this case 'hello').
And same rule is followed in the subsiquent examples.
