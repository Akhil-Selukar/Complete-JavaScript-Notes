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

This is what exactly first line in this article mean, the variable `numberOfBookings` was remembered even after the execution context for bookScreen1() containing that variable was removed from call stack. This happpens because of closure.

The secret here or why this work is.

> Every function will have access to the environment variable of execution context in which that function was created.

To explain this with above example. <br>
In above example the function which is stored as 'bookSeat()' was actually created and returned from `bookScreen1()`. Hence even though we are executing the function `bookSeat()` after the execution context of `bookScreen1()` is removed from call stack, bookSeat will have access to the variable environment of bookScreen1's execution context. And hence it is able to access and update the value of `numberOfBookings`.

This behaviour is called as closure. (properly closing the execution context of function when another function is generated and returned while completing the execution of current function).

> Note: While scope chaining, if the variable is not present in the functions execution context's variable environment, first closure is checked. Even before checking the parent execution context's variable environment. (Earlier while explaining we saw that if variable is not present the it look at parent)

Note: To see the closure of any function we can write below.

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

console.dir(bookSeat);
```

Here `console.dir(bookSeat);` is used to display the information related to the function.

If we see the output here.

![Closure output (36-Deep dive into functions/36.6-Closures/images/Output_1.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/36-Deep%20dive%20into%20functions/36.6-Closures/images/Output_1.png)

Here in 'Scope' we can see the 'Closure' at 0th index. The closure is from 'bookScreen1' and has a variable'numberOfBookings' with value 3.

### More on closures

It is not compulsory to return a function to see closure in action. Consider below example.

```javascript
"use strict";

let multiplicate;

const getHundreds = function () {
  const multiplier = 100;
  multiplicate = function (num) {
    console.log(num * multiplier);
  };
};

const getThousands = function () {
  const multiplier = 1000;
  multiplicate = function (num) {
    console.log(num * multiplier);
  };
};

getHundreds();
multiplicate(2);

getThousands();
multiplicate(2);
```

Here if we see the output we will get

```
200
2000
```

So here when we first call `getHundreds()` function the value to `multiplier` is set to 100 and `multiplicate` is set to the function so when we call `multiplicate(2)` for the first time it was having closure values of getHundreds() hence we got 200 as a result. After that when we call `getThousands()` method now the multiplier is set to 1000 and `multiplicate` is <u>reassigned with new function</u> hence now the multiplicate will have closure of `getThousands()` so when we call `multiplicate(2)` second time we got 2000.

Consider another example where we are trying to imitate a food ordering system where on ordering the food we receive confirmation from restaurent after 5 seconds.

```javascript
"use strict";

const orderFood = function (dish) {
  const dishName = dish;

  setTimeout(function () {
    console.log(
      `your order for ${dishName} was accepted and food is being prepared.`
    );
  }, 5000);

  console.log(
    `Thanks for ordering ${dishName}, we are checking with the chief.`
  );
};

orderFood("Pizza");
```

Here in above example we have a function called `orderFood` which accepts the dish name and it wait for 5 seconds (setTimeout(_function to execute_, _wait time in millSec_ )) and then print the message that order is accepted with dish name. Also after this setTimeout() funnction we have printed another message with dish name. Let's see the output for this.

(Please run on your system to check the 5 sec delay)

```
Thanks for ordering Pizza, we are checking with the chief.
your order for Pizza was accepted and food is being prepared.
```

So from the output we can see that when we call the orderFood() function, line `` console.log(
    `Thanks for ordering ${dishName}, we are checking with the chief.`
  ); `` got executed first and wtill line inside setTimeout function is not executed. So we can definitely say thet the execution context of orerFood gets removed after printing the thank you line and in it we are printing 'Pizza' means the variable `dishName` was accessable at that time. Now after 5 seconds when the setTimeout() executes at that time the executation context for orderFood was already removed from call stack still we successfully get dishName in the line `` console.log(
      `your order for ${dishName} was accepted and food is being prepared.`
    ); `` this shows that the closure was there and it had the value of dishName.
