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

btn.addEventListener("click", () => {
  displayCountryDetails("australia");
});
