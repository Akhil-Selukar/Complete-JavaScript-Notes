## 47.9 Building simple promises manually.

Till now we were using/consuming the promises and this is waht we mostly do, but there is a way we can create a promise by ourself and we can use that promise. This is called promisifying. One of the scenarios where we create promises is when we want to wait for some time before executing a certain code but we do not want to stop the execution. For example let's say we have a application where we are saving data entered by user in different places and as soon as the user click on save we are creating a transaction in a transaction DB and once the complete data saving is done we are marking the transaction created earlier as completed. Now for all other intermediate proceses let's say it takes max to max 5 seconds so we want to wait for 5 seconds before completing the transaction in this case we can create a promise when we create the transaction and in that promise we can wait for 5 seconds and then complete the transaction. (If we wait using normal setTimeout() then it will stop the complete execution for those 5 seconds, we dont want that)

First for simplicity we will see how we can create a promise manually and then we will see the above example in action.

So in below example we are creating a lottery system. In lottery you have to buy a lottery ticket and after certain time the result of lottery is declared, so it is not like during that time you can't do anything else. So same we will simulate that after buying lottery ticket the result will be announced after 5 seconds and during that 5 seconds other tasks can be performed. The lottery result is randomly 50% of time you will win and 50% of time you will lose.

Now have a look at below code first, then we will see what eactly is done in the code.

```javascript
"use strict";

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("You have purchased the lottery, now sit back and relax..!!");

  setTimeout(function () {
    if (Math.random >= 0.5) {
      resolve("You win the lottery..!!");
    } else {
      reject(new Error("You lost the lottery..!!"));
    }
  }, 5000);
});

lotteryPromise
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

console.log("Other stuff..!!");
console.log("Waiting for lottery result..!!");
console.log("Went for dinner..!!");
console.log("Next day..!!");
```

Output of above code is.

```
You have purchased the lottery, now sit back and relax..!!
Other stuff..!!
Waiting for lottery result..!!
Went for dinner..!!
Next day..!!
You win the lottery..!!
```

Here in above output you can see that as soon as the code is executed the promise is generated hence we got the message 'You have purchased the lottery, now sit back and relax..!!'. Then the promise will not resolve till next 5 seconds so program didn't wait till then. It executes the further code hence we got all other console.log() in output and after that once the 5 sec time is over the promise got resolved hence we got 'You win the lottery..!!'.

Now to create promise manually we used Promise() constructor function which eccepts only one parameter which is a executor function i.e. the function which need to be executed when the promise is created. Now this executor function accepts two other parameters those are resolve and reject function. These functions are responsible for either resolving the promise or rejecting the promise. Now in this resolver function we can perform the operations which are supposed to be performed by the call which will generate the promise and based on the output of the operations we can use either resolve or reject function to fulfill the promise. Now if the promise if fulfilled by using resolve() in that case .then() will handle the promise while if promise if fulfilled by reject() then catch() will handle the promise. This is how a promise is created in javascript.

Now comming back to the previous example to promisify the setTimeout() function. We can implement it like below.

```javascript
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2).then(() => {
  console.log("Waited for 2 sec");
});

wait(5)
  .then(() => {
    console.log("waited for 5 sec");
    return wait(6);
  })
  .then(() => {
    console.log("waited for additional 6 sec after earlier 5 sec.");
  });
```

Here in above example we have created a wait() function which returns a promise with timeout value of given seconds. If we observe the output of above code then we will get 'Waited for 2 sec" exactly after 2 seconds of running the code, then after next 3 seconds we wil get "waited for 5 sec" because we have already waited for 2 sec earlier and these two calls or promises are different.

Now in case of below part of the code.

```javascript
wait(5)
  .then(() => {
    console.log("waited for 5 sec");
    return wait(6);
  })
  .then(() => {
    console.log("waited for additional 6 sec after earlier 5 sec.");
  });
```

We are waiting for 5 seconds first then once the 5 seconds are completed then only the first promise will be resolved and it will call wair(6) which will return another promise. And now this new promise will be resolved after exactlly 6 seconds. Here we are kind of chaining the promises.

So back to the initial example, it will be implemented something like below.

```javascript
const wait = function (seconds) {
  // Create a transaction for save operation

  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Trigger the save operation

wait(5).then(() => {
  // code to make the transaction complete.
});

// Code to store data to different places.
```

Now in above case as soon as the save operation is triggered, the first thing will be called is wait(5) method which will create the transaction and return the promise which will be fulfilled after 5 seconds, during those 5 seconds the code to store data to different places will be executed. And after 5 seconds the promise will be resolved and .then() method will be called which will mark the transaction as complete.
