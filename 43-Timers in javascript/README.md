## 43 Timers in javascript

Javascript has two timer functions setTimeout() and setInterva. Both requires a callback function and the time in milliseconds. The difference between both is setTimeout() executes once after the given amount of time passed while setInterval() executes in a loop after the given amount of time is passed since last execution.

To understand the working of setTimeout() function, have a look at below example.

```javascript
"use strict";

const toppings_2 = ["oliver", "onion", "tomato"];

const preparePizza = function (...toppings) {
  console.log(`Your pizza is ready with toppings ${toppings}`);
};

setTimeout(preparePizza, 5000, toppings_2);
console.log("Your pizza is being baked..!!");
```

In above example lets assume we are simulating a pizza shop. so we have an array of toppings that should go in a pizza, then we have a function preparePizza which accepts the toppings and write a string on console that your pizza is ready with all toppings on it. Consider that 5 seconds are required to make bake the pizza. So we want the pizza is ready message after 5 seconds. So we have passed the preparePizza function as a callback function to setTimeout() method and gave the timeout value to 5000 milliseconds i.e. 5 sec. Now to pass the arguments to the function we can pass those arguments in setTimeout method itself after timeout value, hence we have passed the toppings array.

One thing to keep in mind while working with setTimeout() function is that setTimeout() function doesnot hold the current execution of the code. It just read the callback function and create a timeout function and start running it asynchronously and continue with the program. To prove this we have written a console.log() after timeout is set. In output if we see, as soon as we run this code we will get `Your pizza is being baked..!!` immediately. Which means the code did not wait for the timeout function to finish. And then after 5 seconds we will get the string `Your pizza is ready with toppings oliver,onion,tomato`

Now we can cancle the timeout at any time during the execution of the program provided the timeout is not executed. to understand this have a look at below code.

```javascript
"use strict";

const toppings_1 = ["oliver", "onion", "pineapple", "tomato"];

const preparePizza = function (...toppings) {
  console.log(`Your pizza is ready with toppings ${toppings}`);
};

const bakePizza = setTimeout(preparePizza, 5000, toppings_1);
console.log("Your pizza is being baked..!!");

if (toppings_1.includes("pineapple")) {
  console.log("Tpooing contains pineapple, cancle the order..!!");
  clearTimeout(bakePizza);
}
```

Now in above example we have assigned the timeout function to another variable called `bakePizza`. When we start the execution of above code it will immediately print the `Your pizza is being baked..!!` Now when this line is executed the timer is already created and countdown of 5 seconds is initiated. But as soon as the pineapple in toppings is descovered at line `if (toppings_1.includes("pineapple"))` we are clearing the timeout using `clearTimeout(preparePizza);`. So whatever timeout value was set to `bakePizza` will be cleared and the line your pizza is ready will never be printed as the timeout is cleared.

Now the second function is the setInterval() function. In above setTimeout() function we have seen that after the predefined time interval the callback function executes once. But what if we want to execute the function again and again after a set time interval. In this case we use setInterval() in place of setTimeout(). All the implementation parts and parameters are same for setInterval as that of setTimeout. Have a loot at below example.

```javascript
setInterval(function () {
  console.log(new Date());
}, 3000);
```

in above example the time will be printed every 3 seconds, that means the callback function will contineously execute every three seconds.
