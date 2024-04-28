## 47.3 First look at promises and fetch API.

In last few lectures we have seen the old traditional way of calling external APIs which is XMLHttpRequests, but in ES6 we do have a better way to call the APIs which is using 'fetch()' and promises. By using promises we can avoid callback hell. Before moving further and explaining anything else lets have a look at modern way of doing an AJAX call or calling a third party API, then we will learn more about promises.

In below code commented part is how we called the external API to get details of country by using country name, while uncommented part is the modern way of calling the same AIP.

```javascript
// const request = new XMLHttpRequest();
// request.open("GET", "https://restcountries.com/v3.1/name/finland");
// request.send();

// request.addEventListener("load", function () {
//   const [data] = JSON.parse(request.responseText);
//   console.log(data);
// });

const request = fetch("https://restcountries.com/v3.1/name/finland");
console.log(request);
```

The output of above is.

```
Promise {<pending>}
[[Prototype]]: Promise
[[PromiseState]]: "pending"
[[PromiseResult]]: undefined
```

From above we can see that we dont have to write a callback function to listen to load event and we can just use fetch() and pass the url to which we want to make request to. (fetch() method do accept other parameters as option object for different type of requests.)

Now if we see the response of `fetch("https://restcountries.com/v3.1/name/finland")` it will be a 'Promise'. So what exactly a promise is.

A promise is an placeholder object for future result of an asynchronous operation. So as soon as a async operation is performed then in modern js a promise is created and code execution is processed further. With promises we are no longer need to rely on events and callback functions, also if we want to have a sequence of async operations (just like the neighbouring countries example in last section), we can chain the promises and achieve the same result which we achieve by using calback hell.

Now it as we know what promises are we must know the lifecycle of promises, then only we will be able to successfully work with them.
As soon as an asynchronous task is triggered a promise is built and at throughout the execution of the task the promise stays in 'pending' state. Once the asynchronous task is complete the promnise is said to be 'settled'. Now promise can be setttled in two ways, one is 'Fulfilled' and the other is 'Rejected'. Whenever the asynchronous task executes successfully the promise is fullfiled while if the tas failed then the promise becomes rejected.

![Lifecycle of promise (47-Async javascript/47.3-First look at promises and Fetch API/images/Lifecycle_of_promise.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.3-First%20look%20at%20promises%20and%20Fetch%20API/images/Lifecycle_of_promise.png)
