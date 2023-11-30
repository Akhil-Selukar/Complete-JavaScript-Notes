## 06 Javascript If-else Statements

Decision control statements/structure is an essential part of any programming language. If-else is one of the most common decision control statement in javascript. The syntax of if else statement is.

```
if(condition){
    // statements if condition is true.
} else {
    // statements if condition is false.
}
```

From above structure we can clearly see that we need to put a condition after 'if' i.e. a statement which will result in a boolean value. Based on the boolean value returned by the condition either code block after if or code block after else will be executed. (Note that only one of the two code block will execute.)

Consider below example to understand if-else statement.

```javascript
const ageOfUser = 20;

if (ageOfUser >= 18) {
  console.log("User can vote..!!");
} else {
  console.log("User is a minor and can not vote..!!");
}
```

Here the `ageOfUser` is 20 and the condition mentioned with if is `ageOfUser >=18` which will return `true` i.e. a boolean value and as the boolean value returned is `true` the code block that will execute is `console.log("User can vote..!!");` and the code inside the else block will not be executed. Hence the output will be

```
User can vote..!!
```

### If-else-if statement (if-else-if ladder)

Look at the below example and the use of if else in it.

```javascript
const firstNumber = 0;

if (firstNumber > 0) {
  console.log("Given number is positive number..!!");
} else if (firstNumber < 0) {
  console.log("Given number is negative number..!!");
} else {
  console.log("Given number is zero..!!");
}
```

In this example we are first checking the condition `(firstNumber > 0)` if this condition is false then instead of directly using the 'else' statement we used 'else if' statement and specified the second condition `(firstNumber <0)` and after that we used 'else' statement. Now here if the first if condition is 'true' then it will execute `console.log("Given number is positive number..!!");` and will ignore every 'else-if' and last 'else' statement, while if the first condition is false then only it will check the 'else-if' condition if this condition is true then it will execute `console.log("Given number is negative number..!!");` and skip the last else block and if the 'else-if' condition is false then it will execute the last else block.

The output of above code will be

```
Given number is zero..!!
```

<br>
<hr>
<br>
There are few other versions of if-else available which are given below.

- Nested if-else (type - 1)

  The syntax for this is

```
if(condition) {
    if(condition) {
        // some code
    } else {
        // some code
    }
} else{
    // some code
}
```

<br>

- Nested if-else (type - 2)

  The syntax for this is

```
if(condition) {
    // some code
} else{
    if(condition) {
        // some code
    } else {
        // some code
    }
}
```

<br>

- Nested if-else (type - 3)

  The syntax for this is

```
if(condition) {
    if(condition) {
        // some code
    } else {
        // some code
    }
} else{
    if(condition) {
        // some code
    } else {
        // some code
    }
}
```

- Simple if statement

The syntax for this is

```
if(condition) {
    // some code
}
```
