## 47.8 Asynchronous javascript under the hood.

Till now we have seen the old way of doing AJAX calls promises and other async calls like loading of images and multimedia. But earlier during the introductory sections we have learned that javascript does not run multiple tasks on multiple thtreads. Then how exactly this asynchronous tasks are executed in javascript. This is what we will understand in this section.

Let's consider below code to understand the execution of async tasks.

```javascript
"use strict";

console.log("Line 1");
console.log("Line 2");
console.log("Line 3");

imgEl = document.querySelector(".img");
imgEl.src = "images/Finland.png";

imgEl.addEventListner("load", () => {
  imgEl.classList.add("fadeIn");
});

console.log("Line 4");

fetch("https://dummy.url/call").then((response) => {
  console.log(response);
});

console.log("Line 5");
console.log("Line 6");
```

Here as soon as the code is loaded the global execution context will be created in call stack and web API's will be available which are mainly provided by browser (in web API environment). Apart from this there are two queues will be there we will discuss about those queues further.

![Image-1(47-Async javascript/47.8-Async javascript under the hood/images/Image-1.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.8-Async%20javascript%20under%20the%20hood/images/Image-1.png)

Now as soon as the code execution starts it will print Line 1, Line 2 and Line 3 one by one synchronously on console. Then we are using document.querySelector() to select image element. So the execution context for querySelector will be created in call stack to execute the code `imgEl = document.querySelector(".img");`.

![Image-2(47-Async javascript/47.8-Async javascript under the hood/images/Image-2.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.8-Async%20javascript%20under%20the%20hood/images/Image-2.png)

After executing the above line we will have image element stored in imgEl variable. In the next line we are loading the image, now this is a async call. So this call is triggered in the web API environment and code execution continues. The next line is the event listner which has a callback function which is listning for 'load' event on imgEl. So the execution contexxxt is created for this callback function and attached to the API call which is running in web API environment and code execution is continued.

![Image-3(47-Async javascript/47.8-Async javascript under the hood/images/Image-3.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.8-Async%20javascript%20under%20the%20hood/images/Image-3.png)

Next the text "Line 4" is printed on console and the fetch() call is triggered. Now this fetch call again is a async call. Hence this call is also triggered in web API environment and the callback function in .then() is attached to it.

![Image-4(47-Async javascript/47.8-Async javascript under the hood/images/Image-4.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.8-Async%20javascript%20under%20the%20hood/images/Image-4.png)

After this text "Line 5" and "Line 6" are printed normall in synchronized manner. After the Line 6" is printed the call stack will be empty (except the global execution context). But the two async tasks are still running in the web API's environment. Now let's consider image loading is completed and it triggered the load event, as soon as the load event is triggered the callback function attached to the event listner listening to load event will be placed into the "Callback queue". This callback queue is a queue of all callback functions which need to be executed. (callback function land into callback queue after the event is triggered.)

Now the callback function is in callback queue but the code is executed in callstack, so to take this callback function from callback queue to call stack a event loop is there which contineously loop over the callback queue, microtask queue and call stack.

![Image-5(47-Async javascript/47.8-Async javascript under the hood/images/Image-5.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.8-Async%20javascript%20under%20the%20hood/images/Image-5.png)

As soon as the call stack is empty event loop check the two queues and if there is any callback function present there, it puts that callback function in call stack to execute.

![Image-6(47-Async javascript/47.8-Async javascript under the hood/images/Image-6.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.8-Async%20javascript%20under%20the%20hood/images/Image-6.png)

Now the remaining is the fetch() API call. This call is going to return a promise. Now with promise the proess is little bit different. As soon as the fetch() API call is successful, instead of puting the callback function from .then() method in to callback queue, in case of promises it will be put into the microtask queue. (Microtask queue is same as that of callback queue but callback from promises only will land into microtask queue). Now the proprity to pick the callback function by event loop is first will be the callback from microtasks then from callback queue. If let's say one microtask calls another fetch() api and that API got completed before the eventloop pick callback function from callback queue then the microtask for newly completed fetch() api call will be picked first and so on. So the point is unless microtask queue is cleared, event loop will not pick function from callback queue.

![Image-7(47-Async javascript/47.8-Async javascript under the hood/images/Image-7.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.8-Async%20javascript%20under%20the%20hood/images/Image-7.png)

Once this task is also completed the queues will be cleared and we will have the complete output on console. So this is how by using web API environment, callback and microtask queues javascript handles asynchronous calls.

![Image-8(47-Async javascript/47.8-Async javascript under the hood/images/Image-8.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.8-Async%20javascript%20under%20the%20hood/images/Image-8.png)
