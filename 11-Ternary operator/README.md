## 11 Javascript Ternary/Conditional Operator

Conditional or ternary operator is just like if-else statement with slight differences. If-else statement can't produce a result or cant generate a value based on the condition but conditional/ternary operator can. But in ternary operator we can not write a block of code like in if-else statement. So basically conditional/ternary operators are used to generate a value based on condition and not to execute a specific block of code based on condition.

The structure of conditional/ternary operator is as follows

[Condition] ? [if condition is true] : [if condition is false];

Consider below example of ternary operator

```javascript
const age = 14;

let drink = age >= 18 ? "Beer 🍺" : "Water 💧";
console.log(`You are allowed to drink ${drink}`);
```

The output of above code is

```
You are allowed to drink Water 💧
```

Here in second line we have `age >= 18 ? "Beer 🍺" : "Water 💧";`. In this statement `age >= 18` is the condition, if this condition is true then if will return the value immediately next to ? i.e. `Beer 🍺` and if the condition is false then it will return the value which is after : i.e. `Water 💧`.

Now as conditional operator is a operator hence it produces or returns this value and hence we can assign this value to some variable. Hence in the line `let drink = age >= 18 ? "Beer 🍺" : "Water 💧";` drink will be assigned by a value generated based on the condition and that value we are logging in the console by using `` console.log(`You are allowed to drink ${drink}`); ``.

Same code can be written using if-else statement as below.

```javascript
const age = 14;

if (age >= 18) {
  drink = "Beer 🍺";
} else {
  drink = "Water 💧";
}

console.log(`You are allowed to drink ${drink}`);
```

Here we can clearly see that using conditional operator we can reduce the lines of code and it is much more simpler that using if-else statement.
