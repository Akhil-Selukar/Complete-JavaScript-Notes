## 36.6 Closures

Closure makes a function remember all the variables that existed at the time when execution context of that function was in call stack even after the execution context is removed. To understand this better have a look at below example.

```javascript
"use strict";

const bookScreen1 = function () {
  let numberOfBookings = 0;

  return function () {
    numberOfBookings++;
    console.log(
      `Booked a seat for movie. Total bookings are ${numberOfBookings}`
    );
  };
};
const bookSeat = bookScreen1();

bookSeat();
bookSeat();
bookSeat();
```

Now let's look at how the above code will execute in javascript engine.
As soon as the code starts execution a global execution context is created which will have the `bookScreen1` function and it is added into the call stack.

![Execution flow - 1 (36-Deep dive into functions/36.6-Closures/images/Code_Execution_1.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/36-Deep%20dive%20into%20functions/36.6-Closures/images/Code_Execution_1.png)

Now as soon as the line `const bookSeat = bookScreen1();` is executed it will create another execution context for function `bookScreen1`, set the variable `numberOfBookings` to 0 and then the execution context will be added into the call stack.

![Execution flow - 2 (36-Deep dive into functions/36.6-Closures/images/Code_Execution_2.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/36-Deep%20dive%20into%20functions/36.6-Closures/images/Code_Execution_2.png)

The function bookScreen1() is returning another function. So after execution of function bookScreen1() at line `const bookSeat = bookScreen1();` the execution context for bookScreen1() will be removed from the call stack and new variable bookSeat will be created in global execution context. It's value will be set as the returned function from bookScreen1();

![Execution flow - 3 (36-Deep dive into functions/36.6-Closures/images/Code_Execution_3.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/36-Deep%20dive%20into%20functions/36.6-Closures/images/Code_Execution_3.png)

Now the `bookSeat()` is available in global execution context and execution context for bookScreen1() is not present in the call stack. So when we call bookSeat() function at last, it will create it's execution contexxt which will be child of global execution context and as the function code is as below no variable will be there in the exxecution context of bookSeat().

```javascript
function () {
    numberOfBookings++;
    console.log(
      `Booked a seat for movie. Total bookings are ${numberOfBookings}`
    );
  };
```

![Execution flow - 4 (36-Deep dive into functions/36.6-Closures/images/Code_Execution_4.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/36-Deep%20dive%20into%20functions/36.6-Closures/images/Code_Execution_4.png)

Here in above code first step only it is incrementing the value of `numberOfBookings` variable. But this variable is not present in global or bookSeat()'s execution context, it was there in execution context of bookScreen1() function which is not available now. And as the execution context for `bookSeat()` is child of global execution context it will not have access to variables in execution context of `bookScreen1()` as per scope chaining. But if we see the result of above code after execution of `bookSeat()` three times. The `numberOfBookings` variable get's incremented.

```
Booked a seat for movie. Total bookings are 1
Booked a seat for movie. Total bookings are 2
Booked a seat for movie. Total bookings are 3
```

![Execution flow - 5 (36-Deep dive into functions/36.6-Closures/images/Code_Execution_5.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/36-Deep%20dive%20into%20functions/36.6-Closures/images/Code_Execution_5.png)

This is what exactly first line in this article mean, the variable `numberOfBookings` was remembered even after the execution context for bookScreen1() in which that variable is present was removed from call stack. This is what exactly happpens because of closure.
