## 47.13 Promise combinator (.race())

In previous section we saw that .all() combinator takes all promises and execute them all in parallel and once all the promises are settled it returns the resultant promise with array of data from all the prommises. If any of the promise is rejected in the .all() combinator then the resultant promise will be rejected.

While in case of .race() combinator, it also collect all the promises and execute them in parallel. But instead of waiting for all the promises to settle it return the first settled promise as result (No matter it is fulfilled or rejected, if it is settled it will be the resultant promise of all the promises in .race()). For example have a loom at below code, where we are fetching data for three countries again, but this time we are using .race() combinator. So the result will be the promise having the data of country for which the promise got fulfilled first.

```javascript
"use strict";

const getCoutryJson = function (url, errorMessage = "Something went wrong!") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`(${response.status}) - ${errorMessage}`);
    }
    return response.json();
  });
};

const fetchCapitals = async function (country1, country2, country3) {
  try {
    const data = await Promise.race([
      getCoutryJson(`https://restcountries.com/v3.1/name/${country1}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country2}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country3}`),
    ]);

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

fetchCapitals("sweden", "germany", "UAE");
```

Now if you run the above code multiple times and observe the data you will get different data but the array will contain data for only one country (i.e. the country for which data was fetched first). So race() doesnot wait for all the promises to get fulfilled.

Same is true with if any of the promise is rejected, in that case the resultant promise of Promise.race() will be a rejected promise (Rejected promises are also fulfilled promises only.)

```javascript
"use strict";

const getCoutryJson = function (url, errorMessage = "Something went wrong!") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`(${response.status}) - ${errorMessage}`);
    }
    return response.json();
  });
};

const fetchCapitals = async function (country1, country2, country3) {
  try {
    const data = await Promise.race([
      getCoutryJson(`https://restcountries.com/v3.1/name/${country1}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country2}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country3}`),
    ]);

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

fetchCapitals("abcd", "germany", "UAE");
```

Now in above case the output will be a rejected promise (if call to 'abc' is rejected before 'germany' and 'UAE', In some runs you might get data for germany or UAE provided their calls got settled first.)

The more real usecase of Promise.race() combinator is to shortcircuit long running promises. Means if there are some long running promises or user has a very bad internet connection in that case we can't wait for 2-3 minutes for the promise to get settle but as the call is already made so we cant terminate the call in between (without refreshing or closing the window). So to handle such scenarios we can create a setTimeout() promise (promisify setTimeout() method) and provide a specific wait time and after that time we can reject the setTimeout() promise. And we can use a race() combinator and combine this promise with all other promises so that if the other promises are taking too much of time then after the specified time the setTimeout promise will get rejected and hence the overall call will be rejected and we can inform user via. error handling that the request was taking too long hence it got terminated. Have a look at below sample code.

```javascript
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Request timmed out.!"));
    }, sec * 1000);
  });
};

Promise.race([
  getCoutryJson(`https://restcountries.com/v3.1/name/japan`),
  timeout(0.5),
])
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
```

Now in above example if it took more than 0.5 sec to load the data for japan then it will say request timed out otherwise it will display the data for japan. By this way we can short circuit long running promises.
