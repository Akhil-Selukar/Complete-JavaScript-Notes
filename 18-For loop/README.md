## 18 Javascript For Loop

Loops are used to perform some operation over and over again for specific number of times or till certain condition is true. For loop is the most common and widely used loop in almost all programming languages. for loop consists of four very import parts, those are:

- Counter initialization
- Condition
- Counter increment/decrement
- Loop body

Below is the syntax of for loop.

```javascript
for(initialization ; condition ; increment/decrement){
  code to execute (loop body);
}
```

Initialization is where initial value of counter is set. This part is the first part which is executed in the loop and this is executed only once i.e. while starting the loop execution.

Condition is where we specify the condition, till when we want to execute the code inside the loop body. This condition is checked at the start of each iteration of loop.

Increment/Decrement is the part where we update the counter value. Because if we don't update the counter the loop will not terminate and will execute the loop body forever (technically it will crash the browser). Hence it is very important to update the counter. This updation happens at the end of each iteration.

Loop body is the code that need to be executed over and over again till the condition is true.

Consider below example and it's output to understand the workiing of for loop

```javascript
for (let counter = 1; counter <= 10; counter++) {
  console.log(`Iteration number ${counter}`);
}
```

The output of above code is

```
Iteration number 1
Iteration number 2
Iteration number 3
Iteration number 4
Iteration number 5
Iteration number 6
Iteration number 7
Iteration number 8
Iteration number 9
Iteration number 10
```

In above example we have initialized counter to 1 and we are checking if the counter i less than of equal to 10, and after every iteration we are increasing the value of counter by 1.

So when the loop execution starts it will initialize the counter variable to 1. Then the condition `counter <= 10` will be checked, here 1 is less than 10 so condition is true hence loop body will be executed and it will print 'Iteration number 1' to the console. Then next step is to increment the counter so new value of counter will be 2 then again the condition will be checked. Now 2 is also less than 10 hence condition is true so again loop body will execute and it will prent 'Iteration number 2' and same process will repeat till counter become 10. Now 10 as counter will also satisfy the condition '10 <= 10' hence we will get 'Iteration number 10' and counter will increment to 11 now the condition will be '11 <= 10' which is false and hence the loop will be terminated and loop execution will be stopped.

<hr>

Now consider an array 'rainbow' which has all the colors of a rainbow. Below code shows how we can iterate over the rainbow arrray and print each of it's color. Here we are starting the counter 'i' from 0 because array index starts from 0, then we are checking the condition till 'rainbow.length' i.e. we dont want to iterate once we reach the last index of rainbow array. And we are increasing the counter by 1 because we want to print all the colors (i.e. we want to iterate all the elements of the array.)

```javascript
const rainbow = [
  "Violet",
  "Indogo",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Red",
];

for (let i = 0; i < rainbow.length; i++) {
  console.log(rainbow[i]);
}
```

The output of above code will be

```
Violet
Indogo
Blue
Green
Yellow
Orange
Red
```

### Break and continue statements.

Now in above example, it we want to stop iteration as soon as we reach to the 'Green' color and if there is no 'Green' color then we want to iterate the complete array. In this case want something which will terminate the loop irrespective of the condition given in the loop i.e. `i < rainbow.length`. This can be achieved by `break;` statement. Let's have a look at below example.

```javascript
const rainbow = [
  "Violet",
  "Indogo",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Red",
];

for (let i = 0; i < rainbow.length; i++) {
  if (rainbow[i] === "Green") {
    break;
  }
  console.log(rainbow[i]);
}
```

Here inside the loop for each iteration we are checking if the array element is equal to 'Green' or not? if it is 'Green', then it will go inside the if block and there we have `break;`. This break terminates the execution of loop hence all the other iterations after the current iteration will not be performed. Hence the output for above program will be.

```
Violet
Indogo
Blue
```

Now consider the sase where we don't want to terminate the whole loop but we just want to skil that iteration only and continue with all other iterations till the end. In this scenario we can use `continue;` statement. Consider below example of continue statement.

```javascript
const rainbow = [
  "Violet",
  "Indogo",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Red",
];

for (let i = 0; i < rainbow.length; i++) {
  if (rainbow[i] === "Green") {
    continue;
  }
  console.log(rainbow[i]);
}
```

Now here in place of break; we have `continue;` so as soon as the loop starts iterating for 'Green' value, the if condition will become true and hence `continue;` statement will be executed. So as soon as continue statement is executed, that specific iteration will be skipped and no line of code after the continue will be executed for the current iteration. Hence 'Green' will not be printed in the output. But the difference between break and continue is that, continue will perform the next iteration and will not terminate the loop. Hence all the other colors after 'Green' will be printed in the output.
Below is the output for above code.

```
Violet
Indogo
Blue
Yellow
Orange
Red
```
