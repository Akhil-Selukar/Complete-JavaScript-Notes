## 47.2 Callback hell (Async calls in specific order)

In last section we saw that for three diffrent countries the calls are async and the countries are displayed in the order of which countries data is received first. And hence there is no specific order. But we can ensure a specific order by using callback this is what commonly referred to as callback hell. By this we will ensure that AJAX calls will triggere in a sequence like second AJAX call will trigger only when first in completed.

To uderstand this what we will do is, when we do first AJAX call and get the details of a country in that data object we have a property called 'borders' which is an array of country code of countries which are neighbouring countries for the given country. So what we will do is we will first get the details of given country and then based on its borders we will display details of it's neighbouring countries. So here the second call is dependent on the borders value in first call hence we can not do second call before first call is completed. Hence we will have to implement a sequence of AJAX calls which is called as callback hell.

Now before starting with the actuall implementation we will have to refactor the previous code a little, because we want to display the country details for the actual country as well as for the neighbouring country. So we can create a function to display country details and use the same code multiple times.

```javascript
"use strict";

const countriesContainer = document.querySelector(".countries");

const displayCountryCard = function (data) {
  const html = `<article class="country">
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

const displayCountryAndNeighbours = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(request.responseText);
    // console.log(data);

    displayCountryCard(data);
  });
};

displayCountryAndNeighbours("finland");
```

Above is the refactored code where we have extracted the functionality of displaying country data to a method and called that method from event listner. the output will be same as that of previous code.

Now let's implement the logic to find details of neighbouring countries.

```javascript
"use strict";

const countriesContainer = document.querySelector(".countries");

const displayCountryCard = function (data) {
  const html = `<article class="country">
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

const displayCountryAndNeighbours = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(request.responseText);
    // console.log(data);

    displayCountryCard(data);

    const borders = data.borders;

    console.log(borders);
  });
};

displayCountryAndNeighbours("finland");
```

Now in above code we are extracting the borders array from the data of the given country. This will be an array so we can run a forEach loop on the array and display the data for all neighbouring countries. (Note that the borders array will not contain country name but it will have country code so the API to get details from country code is `https://restcountries.com/v3.1/alpha/{code}`)

Have a look at below code.

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

const displayCountryAndNeighbours = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(request.responseText);
    console.log(data);

    displayCountryCard(data);

    const borderCountry = data.borders?.[0];

    const neighbourCountryRequest = new XMLHttpRequest();
    neighbourCountryRequest.open(
      "GET",
      `https://restcountries.com/v3.1/alpha/${borderCountry}`
    );
    neighbourCountryRequest.send();

    neighbourCountryRequest.addEventListener("load", function () {
      const [neighbourCountryData] = JSON.parse(
        neighbourCountryRequest.responseText
      );
      console.log(neighbourCountryData);
      displayCountryCard(neighbourCountryData, "neighbour");
    });
  });
};

displayCountryAndNeighbours("finland");
```

For simplicity in above code we just took 1 neighbouring country but you can take all and run a forEach loop (code is present as comment in script.js)

Now at line `const borderCountry = data.borders?.[0];` we took the country code of first neighbouring country from the borders array of Finland. Then using that country code we have created another XMLHttpRequest for neighbouring country data using the API mentioned above. Then at line `neighbourCountryRequest.addEventListener("load", function () {....}` we have added another event listner for 'load' event of neighbourCountryRequest. Now at this point we must note that we are already under the event handler of main request for actual country. so we are kind of nesting a event listner inside callback of another event listner, this gets much more complicated as we grow the nesting hence it is called as callback hell. In ES6 we have better way to deal with this which is called as promises (we will learn about this in next section).

Now in above scenario neighbouringCountryRequest can not be triggered unless we receive the load event of parent country as neighbouring country's request is inside the event listner of parent country. Hence the order of calls is fixed here and second call can not be triggered unless first is completed.

Below is the output of final code.

![Final output screenshot (47-Async javascript/47.2-Callback hell (Async calls but in a order)/images/Final_op_screenshot.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.2-Callback%20hell%20(Async%20calls%20but%20in%20a%20order)/images/Final_op_screenshot.png>)
