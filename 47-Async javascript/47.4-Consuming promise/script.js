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

// const displayCountryAndNeighbours = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);

//     displayCountryCard(data);

//     const borderCountry = data.borders?.[0];

//     const neighbourCountryRequest = new XMLHttpRequest();
//     neighbourCountryRequest.open(
//       "GET",
//       `https://restcountries.com/v3.1/alpha/${borderCountry}`
//     );
//     neighbourCountryRequest.send();

//     neighbourCountryRequest.addEventListener("load", function () {
//       const [neighbourCountryData] = JSON.parse(
//         neighbourCountryRequest.responseText
//       );
//       console.log(neighbourCountryData);
//       displayCountryCard(neighbourCountryData, "neighbour");
//     });
//   });
// };

// displayCountryAndNeighbours("finland");

// prettier-ignore
// const displayCountryDetails = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//   .then(function (response) {
//     return response.json();
//   }).then(function(data){
//     // console.log(data);
//     displayCountryCard(data[0]);
//   })
// };

const displayCountryDetails = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => displayCountryCard(data[0]))
  };

displayCountryDetails("finland");
