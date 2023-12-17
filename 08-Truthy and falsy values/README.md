## 08 Javascript Truthy and Falsy Values

Just like Number() or String() javascript has Boolean() function which converts any value to boolean value i.e. either `true` or `false`. Those values which result in `false` when given to Boolean() function are called 'Falsy' values while the other values are called 'Truthy' values.

In javascript we have 5 falsy values apart from `false` itself. those are

- 0 (zero)
- '' (empty string)
- undefined
- NaN
- null

Hence all the below line of code will result in `false`.

```javascript
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean(null));
```

output of above code is

```
false
false
false
false
false
```

Whereas all other values apart from above (few are shown below) gives `true`.

```javascript
console.log(Boolean({}));
console.log(Boolean("Hello"));
console.log(Boolean(210));
```

output :

```
true
true
true
```

<em>Note : </em> Boolean() function is very rarely used for type conversion. Generally this happens implicitly.

Consider below example in which truthy and falsy values are getting implicitly converted to respective boolean values. (type coercion)

```javascript
let lifeLine = 0;
if (lifeLine) {
  console.log("Press start to start again.!!");
} else {
  console.log("Game over..!!");
}

lifeLine = 1;
if (lifeLine) {
  console.log("Press start to start again.!!");
} else {
  console.log("Game over..!!");
}
```

When lifeline is 0, the if statement `if (lifeLine)` triggers `Boolean(lifeline)` which will return `false` as 0 is falsy value. Hence it will execute else block and return `Game over..!!`. And when lifeLine is 1 then as 1 is a truthy value it will return `true` and if block will be executed to return `Press start to start again.!!`.
