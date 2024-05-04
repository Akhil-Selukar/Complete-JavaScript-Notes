"use strict";

const getCoutryJson = function (url, errorMessage = "Something went wrong!") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`(${response.status}) - ${errorMessage}`);
    }
    return response.json();
  });
};

const fetchCapitals = async function (country1, country2, country3) {
  try {
    const data = await Promise.allSettled([
      getCoutryJson(`https://restcountries.com/v3.1/name/${country1}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country2}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country3}`),
    ]);

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

fetchCapitals("sweden", "Unknown", "UAE");
