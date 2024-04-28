## 47.4 Consuming promise

In last section we have seen what promises are and the lifecycle of promise. Now lets consume the promise created by fetch API.
To understand this we will implement the same functionality which we implemented in last few sections using XMLHttpRequest. But this time we will use promise.

```javascript
// prettier-ignore
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(function (response) {
    console.log(response);
  });
};

displayCountryDetails("finland");
```

Here in above code we are using fetch() method to call the API to get country data. Now as we know that as soon as this async call is triggered we get the promise. So on that promise we can call .then() method which will be executed once the promise is fulfilled. In thsi .then() method we do get access to the response that we get once the promise if fulfilled, this response we have passed to the function in .then() method.

Now if we print this above response and observer the output on console, we will see that the output is not as expected (i.e. the data of country 'finland'), it will be something like below.

```
Response {type: 'cors', url: 'https://restcountries.com/v3.1/name/finland', redirected: false, status: 200, ok: true, …}
body: (...)
bodyUsed: false
headers: Headers {}
ok: true
redirected: false
status: 200
statusText: "OK"
type: "cors"
url: "https://restcountries.com/v3.1/name/finland"
[[Prototype]]: Response
```

Here the actual response will be under the 'body', to get this data we cant directly read it from the body. To get it we will have to call .json() method on the response itself.

Now here one tricky thing is .json() is itself a async method, hence this will also return a promise. So to get the actual data we need to consume this promise as well. This is done like below.

```javascript
// prettier-ignore
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(function (response) {
    return response.json();
  }).then(function(data){
    console.log(data);
  })
};

displayCountryDetails("finland");
```

In above code we have called .json() method on response object of the fetch call and returned the new promise. Now in that returned promise we will get the actual data. Hence in second .then() call when we print the data there we will get the actual epected result (i.e. the data for Finland country.)

Now from here we can call the previously written displayCountryCard() method to render country information on UI.

```javascript
"use strict";

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

// prettier-ignore
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(function (response) {
    return response.json();
  }).then(function(data){
    // console.log(data);
    displayCountryCard(data[0]);
  })
};

displayCountryDetails("finland");
```

In above code the important part is the 'displayCountryDetails' function where we used fetch() to do the AJAX call and the consume the promise using .then() method which returned another promise and after consuming that we got the atual data.

The output of above code will as below.

![Final output after consuming promise(47-Async javascript/47.4-Consuming promise/images/Final_output_after_consuming_promise.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.4-Consuming%20promise/images/Final_output_after_consuming_promise.png)

We can simplify the code more further to make it more easy to understand.

```javascript
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => displayCountryCard(data[0]));
};

displayCountryDetails("finland");
```

Here we used arrow functions and simplified the code further to make it more readable andsimple to understand.
