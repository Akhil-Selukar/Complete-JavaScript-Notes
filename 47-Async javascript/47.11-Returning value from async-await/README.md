## 47.11 Returning value from async await

Till now we have seen how we can use async await to handle promises and how we can handle errors in async await. But what if we want to return some value from the async function back to the main flow and handle it there. This is what we are going to see in this section.

Now the async function which we have created using `async` keyword always return a promise so it is clear that whatever we want to return from the function we have to return it in the fulfilled promise only, and hence to handle the return value we will need .then() method.

Let's say we want to return a string saying that 'Capital city of ${Country} is ${Capital}', Now to return this we can do something like below.

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
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    if (!response.ok) {
      throw new Error("Country not found..!!");
    }
    const data = await response.json();
    displayCountryCard(data[0]);

    const neighbourCountry = data[0].borders?.[0];

    const neighbouringCountryResp = await fetch(
      `https://restcountries.com/v3.1/alpha/${neighbourCountry}`
    );

    if (!neighbouringCountryResp.ok) {
      throw new Error("Country does not have any neighbouring countries..!!");
    }

    const neighboursData = await neighbouringCountryResp.json();
    displayCountryCard(neighboursData[0], "neighbour");

    return `Capital city of ${data[0].name.common} is ${data[0].capital[0]}`;
  } catch (err) {
    console.log(err.message);
    alert(`ERROR - ${err.message}`);
  }
};

btn.addEventListener("click", () => {
  displayCountryDetails("finland").then((resp) => console.log(resp));
});
```

Here we have added a return statement in the async function and returned the value we want and at the calling part we know that we will be receiving the promise hence we used .then() method and got the returned value. (This is working because we know that if there is no error then the promise will be fullfilled and whatever we are returning from the async function will be the value of response of that fulfilled promise.)

The output of above code will give below line in console.

```
Capital city of Finland is Helsinki
```

Now what if any error occure in the code then we should handle the error as well. So if we use .catch() along with .then() at the calling part will that work? Let's check.

In below code we are intentionally sending wrong country name so that we will get an error and then we will check the output in console.

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
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    if (!response.ok) {
      throw new Error("Country not found..!!");
    }
    const data = await response.json();
    displayCountryCard(data[0]);

    const neighbourCountry = data[0].borders?.[0];

    const neighbouringCountryResp = await fetch(
      `https://restcountries.com/v3.1/alpha/${neighbourCountry}`
    );

    if (!neighbouringCountryResp.ok) {
      throw new Error("Country does not have any neighbouring countries..!!");
    }

    const neighboursData = await neighbouringCountryResp.json();
    displayCountryCard(neighboursData[0], "neighbour");

    return `Capital city of ${data[0].name.common} is ${data[0].capital[0]}`;
  } catch (err) {
    console.log(err.message);
    alert(`ERROR - ${err.message}`);
  }
};

btn.addEventListener("click", () => {
  displayCountryDetails("fifa")
    .then((resp) => console.log(resp))
    .catch((err) =>
      console.log(`ERROR CATCHED AT MAIN PROGRAM - ${err.message}`)
    );
});
```

Here we were expecting that in console we will get 'ERROR CATCHED AT MAIN PROGRAM - Country not found..!!' but instead we got `undefined`, but we got the alert message saying that country not found which was frmo the error handling inside the async function which confirms that error was there. Now if error was there then why .catch() was not executed? This is because even though the error was there in the function but by using catch(){} block we have hadled the error there itself and hence that error was not propagated further and if error is not thrown or propageted down from the async function it will make the promse filfilled instead of rejected. Hence the promise is fulfilled only and even though there was an error. So to fix this what we have to do is, we have to rethrow the error from catch(){} block inside the async function so that the promise will be rejected. Have a look at below code.

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
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    if (!response.ok) {
      throw new Error("Country not found..!!");
    }
    const data = await response.json();
    displayCountryCard(data[0]);

    const neighbourCountry = data[0].borders?.[0];

    const neighbouringCountryResp = await fetch(
      `https://restcountries.com/v3.1/alpha/${neighbourCountry}`
    );

    if (!neighbouringCountryResp.ok) {
      throw new Error("Country does not have any neighbouring countries..!!");
    }

    const neighboursData = await neighbouringCountryResp.json();
    displayCountryCard(neighboursData[0], "neighbour");

    return `Capital city of ${data[0].name.common} is ${data[0].capital[0]}`;
  } catch (err) {
    console.log(err.message);
    alert(`ERROR - ${err.message}`);
    throw err;
  }
};

btn.addEventListener("click", () => {
  displayCountryDetails("finlanda")
    .then((resp) => console.log(resp))
    .catch((err) =>
      console.log(`ERROR CATCHED AT MAIN PROGRAM - ${err.message}`)
    );
});
```

Now we will get the expected output. This is how we can return values from async functions.

But now if we see we are using both async await and .then().catch(). This is kind of confusing. So it will be better if we can convert the .then().catch() from above code to async await. But ass of now we can't use await outside of async function, so we will not be able to directly wait for response of 'displayCountryDetails("finlanda")', but at the same time we dont want to write a separete function and make it async just to wait for the responseof 'displayCountryDetails("finlanda")'.

So this is where we can use the "Immediately Invoked Function Expressions" like below.

```javascript
btn.addEventListener("click", () => {
  (async function () {
    try {
      const resp = await displayCountryDetails("finland");
      console.log(resp);
    } catch (err) {
      console.log(`ERROR CATCHED AT MAIN PROGRAM - ${err.message}`);
    }
  })();
});
```
