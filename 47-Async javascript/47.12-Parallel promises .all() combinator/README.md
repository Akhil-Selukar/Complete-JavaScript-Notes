## 47.12 Parallel promises (.all() combinator)

Now consider a scenario where we will be given with the name of 3 countries and we want the output as an array of capital countries of those three countries. To generate the output we will have to fetch the data for all the three countries and then we will have to get the capital for those countries from the fetched data and then return the array of those capitals. Based on what all we have learned till now we can implement this method as below.

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
    const [data1] = await getCoutryJson(
      `https://restcountries.com/v3.1/name/${country1}`
    );
    const [data2] = await getCoutryJson(
      `https://restcountries.com/v3.1/name/${country2}`
    );
    const [data3] = await getCoutryJson(
      `https://restcountries.com/v3.1/name/${country3}`
    );

    console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
  } catch (err) {
    console.log(err.message);
  }
};

fetchCapitals("finland", "norway", "netherlands");
```

This will generate the expected result and work fine but if you closely observe the code. we are doing three different completly independent async calls but still we are waiting for call to country1 complete first, then we are doing the fetch call to country2 and after that to country3. But ideally as all the three calls are independent to each other we can do all this calls parallely, this will impreve the response time.

Have a look at calls execution for current scenario.

![Non parallel calls (47-Async javascript/47.12-Parallel promises .all() combinator/images/non-parallel calls.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.12-Parallel%20promises%20.all()%20combinator/images/non-parallel%20calls.png>)

Here in the response of network tab we can clearly see that call for finland is completed first, then it started call for norway and after completion of that it started call for netherlands. and overall it took 22ms to load the complete page.

Now to make these three calls parallel we can use .all() combinator of promise. This will ensure that all the promises added in it are executed at the same time. Have a look at below code.

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
    const data = await Promise.all([
      getCoutryJson(`https://restcountries.com/v3.1/name/${country1}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country2}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country3}`),
    ]);
    const capitals = data.map((countryData) => countryData.capital[0]);
  } catch (err) {
    console.log(err.message);
  }
};

fetchCapitals("finland", "norway", "netherlands");
```

Now here we have added all the three async calls to a Promise.all() combinator and executed that combinator, now the three calls will be executed parallely and we will get an array of data. from that data we can fetch the capital for each country.

In this case as well the output will be same but if you see the sequence of execution, it will be paralllel. In this exampel the requests are less so it will not show significant impact but in case of large requests the impact is significant.

![Parallel calls (47-Async javascript/47.12-Parallel promises .all() combinator/images/Parallel calls.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.12-Parallel%20promises%20.all()%20combinator/images/Parallel%20calls.png>)

The important thing to note here is that if any one of the promise is rejected from the .all() combinator then the resultant promise will be rejected. and to fulfill the resultent promise all the promises need to be fulfilled.
