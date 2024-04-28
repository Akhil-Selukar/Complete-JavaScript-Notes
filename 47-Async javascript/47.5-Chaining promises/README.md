## 47.5 Chaining promises.

Now as we have implemented the main functionality of displaying the country details, further we want to display the details of neighbouring countries. In XMLHttprequest approach we nested the event listners here in promises to achieve thesame result we can chain the promises. Actually we already did a small chaining of promise in last section when we consume a promise received from fetch() function and from their return another promise after calling .json() method and the consume that. But let's take a detailed look at chaining of promises in this section.

Take a look at below code.

```javascript
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      displayCountryCard(data[0]);

      const neighbourCountry = data[0].borders?.[0];

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
    })
    .then((response) => response.json())
    .then((neighboursData) =>
      displayCountryCard(neighboursData[0], "neighbour")
    );
};

displayCountryDetails("finland");
```

Here in above code at second .then() method, we alread got the data for actual country, so we can simply read the borders from that object as seen in one of the earlier sections (because the response of the API `https://restcountries.com/v3.1/name/${country}` contains borders array having country code for neighbouring countries.) Now using that country code we can do another fetch() call which will give us another promise, we can return this promise and handle it using another .then() method this is how we can do promise chaining.

Below is the output of above code.

![Final output of promise chaining (47-Async javascript/47.5-Chaining promises/images/Final_output_with_neighbours.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.5-Chaining%20promises/images/Final_output_with_neighbours.png)

Note: If we want to displya all neighbouring countries then we can do like below.

```javascript
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      displayCountryCard(data[0]);
      const neighbourCountry = data[0].borders;

      neighbourCountry.forEach((country) => {
        fetch(`https://restcountries.com/v3.1/alpha/${country}`)
          .then((response) => response.json())
          .then((data) => displayCountryCard(data[0], "neighbour"));
      });
    });
};
```
