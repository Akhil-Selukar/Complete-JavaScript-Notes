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
