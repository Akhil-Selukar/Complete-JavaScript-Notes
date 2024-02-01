## 36.2.2 Function Returning Function

Just like other values we can return another function from a function. Have a look at below example.

```javascript
"use strict";

const greet = function (greetingMessage) {
  return function (userName) {
    console.log(`${greetingMessage} ${userName}`);
  };
};

const hiGreeting = greet("Hi");
const helloGreeting = greet("Hello");

console.log(typeof hiGreeting);
console.log(typeof helloGreeting);

hiGreeting("Sheldon");
helloGreeting("Sheldon");
```

In above example we have `greet` function which accepts a message with which we want to greet the user and it returns a funcion which will receive userName and greet the user based on the message provided. This function we can use multiple times. Like we can call greet function and send 'Hello' as greetingMessage and receive a function which will greet with 'Hello' to everyone and then reuse the received function as and when required. This is what is done in the above example. We have called greet function two times with message 'Hi' and 'Hello' and stored the received function in hiGreeting and helloGreeting and then we have called those functions as and when required.

The output of above code will be.

```
function
function
Hi Sheldon
Hello Sheldon
```

From the above result we can see that the returned value of greet function is another function and based on the greetingMessage send we got respective functions which we can call with userName.
