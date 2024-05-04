## 47.10 Consuming promises with Async/Await

Now we know that to consume the promises returned by asynchronous calls we need to use .then() method. But from ES 2017 there is a much better and simpler way to handle asynchronous calls, which is async and await. In this case we make the which has ssync calls as async function so that that function is cut off from main thread and run in background and then instead of using .then() methods to handle the response from async call we use await keyword before every async call and wait for the response from the call as if its a synchronous eecution and then store the response in a variable and use it normally. Now the question here is as we are waiting for the response of async call bs using await keyword, won't that make our code synchronised code. The answer is 'No', because even though we are waiting for the async call's responnse but the function which is doing that async call itself is running separately from main thread, Hence main execution of the code is not blocked and hence this is still an async call only. Have a look at below code.

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

const displayCountryDetails = async function (country) {
  console.log("Async function started..!!");
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const data = await response.json();
  displayCountryCard(data[0]);

  console.log("Async function completed..!!");
};

btn.addEventListener("click", () => {
  displayCountryDetails("finland");
  console.log("Another lines are called by main execution thread.");
});
```

In above code if we concentrate on below part.

```javascript
const displayCountryDetails = async function (country) {
  console.log("Async function started..!!");
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const data = await response.json();
  displayCountryCard(data[0]);

  console.log("Async function completed..!!");
};

btn.addEventListener("click", () => {
  displayCountryDetails("finland");
  console.log("Another lines are called by main execution thread.");
});
```

we can see that all the fetch() calls (i.e. the async calls are happening through function 'displayCountryDetails' hence we made that function async by adding a keyword `async` while declaring the function. This will make this function run in background. Then whenever we are making a fetch call we are waiting for the result of that call and that is done by adding `await` keyword in front of that call, hence we have added `await` before fetch() call and before response.json() call as .json() also returns a promise.) and the rest of the code is normal javascript code. this code is much simpler as it does not use .then() and other callbacks.

Now to prove the point that this code is a async code we have added console.log() just after displayCounttryDetails() function is called from eventListner, inside the function first line and last line. Now if we see the output in console and observe the sequence in which the console.log() are executed we will see below resule.

```
Async function started..!!
Another lines are called by main execution thread.
Async function completed..!!
```

So as soon as the button is clicked the function 'displayCountryDetails' is called and hence async calls are started and we got 'Async function started..!!'. But as this function is a async function hence this function is executed at the background and hence immediately next we got the line 'Another lines are called by main execution thread.'. That means execution didn't wait for the 'displayCountryDetails' function call to complete. Then at last we got 'Async function completed..!!' which means at that point the async function call is completed. Hence from above function we can clearly see that the async behavious is still there in this code.

Now we can complete the other functionality of displaying the neighbouring countries as well.

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

const displayCountryDetails = async function (country) {
  console.log("Async function started..!!");
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const data = await response.json();
  displayCountryCard(data[0]);

  const neighbourCountry = data[0].borders?.[0];

  const neighbouringCountryResp = await fetch(
    `https://restcountries.com/v3.1/alpha/${neighbourCountry}`
  );

  const neighboursData = await neighbouringCountryResp.json();
  displayCountryCard(neighboursData[0], "neighbour");
  console.log("Async function completed..!!");
};

btn.addEventListener("click", () => {
  displayCountryDetails("finland");
  console.log("Another lines are called by main execution thread.");
});
```
