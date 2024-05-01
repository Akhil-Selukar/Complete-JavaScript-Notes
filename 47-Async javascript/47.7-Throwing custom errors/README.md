## 47.7 Throwing custom errors

Now consider a sccenario where user is trying to fetch data for a country which doesnot exist. In this case the API call is not failed, call is successful but the data is not there, hence the promise will be in fulfilled state but we will not have any data in that promise and all next steps will fail in this case. Try simulating this scenario.

```javascript
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      displayCountryCard(data[0]);

      const neighbourCountry = data[0].borders?.[0];
      if (!neighbourCountry) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
    })
    .then((response) => response.json())
    .then((neighboursData) =>
      displayCountryCard(neighboursData[0], "neighbour")
    )
    .catch((err) => alert(err.message))
    .finally(() => {
      console.log("This is the end of promise chain..!!!");
    });
};

btn.addEventListener("click", () => {
  displayCountryDetails("finlaand");
});
```

Here the error message you will get will not be clear to user like in below scerrnshot.

![Error message screenshot (47-Async javascript/47.7-Throwing custom errors/images/Custom_error-1.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.7-Throwing%20custom%20errors/images/Custom_error-1.png)

Now this message is not at all giving any information to user about the wrong country name. Even if we print this message to console for developer it is difficult to identify the actual cause.

In such cases we have to send some meaningful message to the user and this is what we can achieve using the custome errors.

Now as we already know that even though the response of fetch call is error but the call was successfful hence the promise is in fulfilled state. So to throw a custom error we must identify that when the response of fetch call is success and when it is failed. To identify this if we check the response from first .then() for both valid and invalid country we will get below results.

For valid country

```javascript
fetch(`https://restcountries.com/v3.1/name/finland`).then((response) =>
  console.log(response)
);
```

The response will be.

![Valid country response (47-Async javascript/47.7-Throwing custom errors/images/Valid-country-response.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.7-Throwing%20custom%20errors/images/Valid-country-response.png)

Now if we pass invalid country

```javascript
fetch(`https://restcountries.com/v3.1/name/abcd`).then((response) =>
  console.log(response)
);
```

Then the response will be like.

![Invalid country response (47-Async javascript/47.7-Throwing custom errors/images/Invalid-country-response.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.7-Throwing%20custom%20errors/images/Invalid-country-response.png)

Here you can observe the difference. In case of valid country the response has property `ok : true` and `status : 200` while in case of invalid country the response has property `ok : false` and `status : 404` (i.e. other than success status code.). Hence this value of ok property we can use to reject the promise manually and throw a meaningful error like below.

```javascript
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`(${response.status}) - Country not found..!!`);
      }
      return response.json();
    })
    .then((data) => {
      displayCountryCard(data[0]);

      const neighbourCountry = data[0].borders?.[0];
      if (!neighbourCountry) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
    })
    .then((response) => response.json())
    .then((neighboursData) =>
      displayCountryCard(neighboursData[0], "neighbour")
    )
    .catch((err) => alert(err.message))
    .finally(() => {
      console.log("This is the end of promise chain..!!!");
    });
};
```

Here as soon as we get the response of fetch() call, before returning the response.json(), we are checking the 'ok' status of response. If that status is 'true' that means we have valid data in response. But if the status is 'false' then in that case we are creating an object of Error using 'new' keyword with proper message and then by using throw we are throwing that error. Now we know that the .then() call on response of fetch() API also return a promise, and as soon as we throw an error in this .then() call the promise returned from this .then() is set with the status rejected. And this rejected status is then handled below by the .catch() and .finally(). This is how we can reject the promise and throw custom error.

The output after above code is implemented is.

![Custom error handled scerrnshot (47-Async javascript/47.7-Throwing custom errors/images/Custom_error-2.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.7-Throwing%20custom%20errors/images/Custom_error-2.png)

Now the error message is more meaningful and we can easily figure out that okay the country name is where we have to check.

Now if we look at the whole javascript code till now which is below.

```javascript
"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const displayCountryCard = function (data, className = "") {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗺️</span>${data.area} sq km</p>
        <p class="country__row"><span>🏙️</span>${data.capital[0]}</p>
    </div>
    </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`(${response.status}) - Country not found..!!`);
      }
      return response.json();
    })
    .then((data) => {
      displayCountryCard(data[0]);

      const neighbourCountry = data[0].borders?.[0];
      if (!neighbourCountry) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
    })
    .then((response) => response.json())
    .then((neighboursData) =>
      displayCountryCard(neighboursData[0], "neighbour")
    )
    .catch((err) => alert(err.message))
    .finally(() => {
      console.log("This is the end of promise chain..!!!");
    });
};

btn.addEventListener("click", () => {
  displayCountryDetails("finlaand");
});
```

It is not necessary that the error can occure only at the first fetch() call, it can occure at the fetch call for neighbouring country as well. In that case we can simply handle the error there as well. This is one solution but it is not the best one, because we are duplicating the whole custome errror handling code here and even the code to convert response to json as well. So what we can do is we can create a method which will do the fetch call, handle all the custom errors and convert the successful response to json and give it to us. This refactoring will make the code much more better. Have a look at below code.

```javascript
"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const displayCountryCard = function (data, className = "") {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗺️</span>${data.area} sq km</p>
        <p class="country__row"><span>🏙️</span>${data.capital[0]}</p>
    </div>
    </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCoutryJson = function (url, errorMessage = "Something went wrong!") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`(${response.status}) - ${errorMessage}`);
    }
    return response.json();
  });
};

const displayCountryDetails = function (country) {
  getCoutryJson(
    `https://restcountries.com/v3.1/name/${country}`,
    "Country not found..!!"
  )
    .then((data) => {
      displayCountryCard(data[0]);

      const neighbourCountry = data[0].borders?.[0];
      if (!neighbourCountry) return;

      return getCoutryJson(
        `https://restcountries.com/v3.1/alpha/${neighbourCountry}`,
        "Invalid neighbouring country!"
      );
    })
    .then((neighboursData) =>
      displayCountryCard(neighboursData[0], "neighbour")
    )
    .catch((err) => alert(err.message))
    .finally(() => {
      console.log("This is the end of promise chain..!!!");
    });
};

btn.addEventListener("click", () => {
  displayCountryDetails("finland");
});
```

In above code we have created a method which will take the url and an optional error message, then the method will do a fetch call to the url and based on the response handle error and return the promise to display country card.

Here the refactored code is

```javascript
const getCoutryJson = function (url, errorMessage = "Something went wrong!") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`(${response.status}) - ${errorMessage}`);
    }
    return response.json();
  });
};
```

Here we are doing the fetch call, handling the error, converting response to json and the promise generated after converting to json, we are returning that promise.

Now after this all the below testcases will work.

1. valid country with valid neighbouring countries
2. Invalid country
3. valid country with invalid neighbours.

But the important testcasse which is not covered is what if the country is valid but that country has no neighbours like Australia. in this case we are just returning nothing and terminating the call. But how will user be notified that the country does not have any neighbours hence we are not displaying anything. And the returned value will be undefined instead of any promise and hence it will throw an error instead of rejected promise and hence it will not be handled and will display a generic error. So to fix this we will manually have to reject the promise by throwing a custom error instead of undefined. So this we can do like below.

```javascript
const displayCountryDetails = function (country) {
  getCoutryJson(
    `https://restcountries.com/v3.1/name/${country}`,
    "Country not found..!!"
  )
    .then((data) => {
      displayCountryCard(data[0]);

      const neighbourCountry = data[0].borders?.[0];
      if (!neighbourCountry) throw new Error("No neighbouring countries!");

      return getCoutryJson(
        `https://restcountries.com/v3.1/alpha/${neighbourCountry}`,
        "Invalid neighbouring country!"
      );
    })
    .then((neighboursData) =>
      displayCountryCard(neighboursData[0], "neighbour")
    )
    .catch((err) => alert(err.message))
    .finally(() => {
      console.log("This is the end of promise chain..!!!");
    });
};
```

Now if there is no neighbouring country it will display the error message "No neighbouring countries!"
