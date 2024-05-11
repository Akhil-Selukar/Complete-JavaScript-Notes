## 48.3 Top level await without async function.

In the section [47.10-Consuming promises with Async-Await](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/47-Async%20javascript/47.10-Consuming%20promises%20with%20Async-Await) we have seen that the await can be used inside an async function. But from ES2022 we can use await at top level i.e. outside async function as well (but only in modules).

It is very important to use this wisely because it blocks the execution of module calling the other module having top level await.

Have a look at below example.

post.js

```javascript
console.log("Loading posts data.");

const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
console.log("fetched post done");
const postData = await posts.json();
await fetch("https://jsonplaceholder.typicode.com/comments");
console.log("fetched comments done");
await fetch("https://jsonplaceholder.typicode.com/photos");
console.log("fetched photos done");

console.log("Loaded all data for posts");

export const displayLastPost = function () {
  console.log(postData.at(-1).title);
};
```

Here we are fetching all posts and data related to posts and for that we are making three different fetch call, then by using displayLastPost() method we will be displaying the title of last post reeived from the response. Now to display last post first all the data related to all posts must be completly fetched hence we will have to wait for the fetch calls to get complete then only we can successfully call displayLastPost() method hence we are using await with each fetch call. Now this module is imported in main script.js file as below.

script.js

```javascript
import { displayLastPost as post } from "./post.js";

console.log("Started main script.js");
post();
console.log("completed main script.js");
```

Now when we run the code then we can observe that unless all the fetch calls from post.js module are executed we will not get output of script.js. Which means importing module is blocked during the execution/loading of imported module i.e. post.js. Hence every time the post(); call from script.js will be successful and will always be called after the post.js is completly loaded.

The output of above code will be.

```
Loading posts data.
fetched post done
fetched comments done
fetched photos done
Loaded all data for posts
Started main script.js
at nam consequatur ea labore ea harum
completed main script.js
```

Due to this we must be careful while using await at top level inside modules.

Here we can see that we have used await in module without having async function. This is allowed only in modules and from ES2022.
