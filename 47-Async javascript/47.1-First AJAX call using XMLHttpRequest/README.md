## 47.1 First AJAX call using XMLHttpRequest

In this section we will see the first AJAX call from javascript to a third party web API. We will be using XMLHttpRequest in this section even though this is a old way of doing AJAX calls but for historic reasons it is good know this technique as well.

Now what we are going to do here is, we will make a AJAX call to third party API `https://restcountries.com/v3.1/name/{name}` where '{name}' is the country name. This API gives us all the details of the specified country including currency, language, population, geolocation details etc. We will get this data and then display it to the UI.

We will call this API using XMLHttpRequest which is a non blockin async call. Below is the code to call the API.

```javascript
"use strict";

const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/name/finland");
request.send();
```

Here we first created a new request object of XMLHttpRequest, then using that request object we open a new request. Here the 'GET' is the type of http requet and second parameter is the url to which we want to send this request.
Now the request is created and open but we have not sent that request hence by using request.send() we actually send the method. Generally anything which is returned from any method call we store simply assigning it to a variable like `const data = getUserData()` but here in AJAX calls this is not possible as these calls are asynchronous calls and it will take some time (few milli seconds) for request to go to the web server and get the data. till then javascript execution is not blocked. It will go on next line and continue to execute the rest of the code.

Hence we need something which will notify the code that requested data is ready when we receive response from the API, so that we can handle the data further. With XMLHttpRequests this is achieved by using events. As soon as the response is received from the API request triggers a 'load' event. Hence we can listen to the load event on request object and as soon as the event is triggered we can store the data as we want.

```javascript
"use strict";

const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/name/finland");
request.send();

request.addEventListener("load", function () {
  console.log("Response is received..!!");
});

console.log("request is already sent waiting for response");
console.log("request is already sent waiting for response");
console.log("request is already sent waiting for response");
console.log("request is already sent waiting for response");
```

If you runabove code you will see that the the line `Response is received..!!` will be printed after some time it will take around a sec to print, while the code will not wait for that event to occure it will print all other `console.log("request is already sent waiting for response")` first. This is what asynchronous calls look like.

Now we can handle the received data and assign it to some variable to use further.

```javascript
"use strict";

const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/name/finland");
request.send();

request.addEventListener("load", function () {
  const data = JSON.parse(request.responseText);
  console.log(data);
});

console.log("request is already sent waiting for response");
console.log("request is already sent waiting for response");
console.log("request is already sent waiting for response");
console.log("request is already sent waiting for response");
```

Now above code will give us the json object of received data. (Note that the respone received from the AJAX call is a string, hence we are converting it to json using JSON.parse() method.) Below will be the response of above code.

![Response of AJAX call (47-Async javascript/47.1-First AJAX call using XMLHttpRequest/images/Response of AJAX call.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.1-First%20AJAX%20call%20using%20XMLHttpRequest/images/Response%20of%20AJAX%20call.png)

In above response we can see that the parsed response is an array, so we can destructure it to get the actual object.

```javascript
"use strict";

const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/name/finland");
request.send();

request.addEventListener("load", function () {
  const [data] = JSON.parse(request.responseText);
  console.log(data);
});
```

Now the data will be actual object having details of Finland. Now we can use this object to create html string and add it to the UI to display the details of Finland.

```javascript
"use strict";

const countriesContainer = document.querySelector(".countries");

const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/name/finland");
request.send();

request.addEventListener("load", function () {
  const [data] = JSON.parse(request.responseText);
  //   console.log(data);

  const html = `<article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages.fin}</p>
        <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
    </div>
    </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
});
```

Here in above code based on the received object from AJAX call we formatted the html string and added it to the contries container element. While creating the html string for population the data received was a huge number so to convert it to a better format, we converted the string value to number by appending + operator before `+data.population` then we divided it by '1000000' to convert it to millions and then fixed it to only 1 decimal place by using .toFixed(1), i.e. `(+data.population / 1000000).toFixed(1)`.

The output of above code will be like below.

![Finland output image (47-Async javascript/47.1-First AJAX call using XMLHttpRequest/images/Finland_output.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.1-First%20AJAX%20call%20using%20XMLHttpRequest/images/Finland_output.png)

Now instead of hardcoding the value of country in url we can create a function to display country details and then pass country name to the function.

```javascript
"use strict";

const countriesContainer = document.querySelector(".countries");

const displayCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(request.responseText);
    // console.log(data);

    const html = `<article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗺️</span>${data.area} sq miles</p>
        <p class="country__row"><span>🏙️</span>${data.capital[0]}</p>
    </div>
    </article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

displayCountry("finland");
displayCountry("ireland");
displayCountry("uae");
```

Now in above code we have changed language and currency to area and geo-coordinates to make the code generic so that we can see actual asynchronous behaviour in action.

Run the above code multiple times and observe the output. You will be able to see that the three countries appear in different order at random, even though we are calling the function in specific order of 'Finland', 'Ireland' and then 'UAE'. The random order is because as soon as we call the function for three different countries, the async call gets triggered for all three countries now whichever call triggers the load event first that country will be displayed first and we can see the async nature here.
