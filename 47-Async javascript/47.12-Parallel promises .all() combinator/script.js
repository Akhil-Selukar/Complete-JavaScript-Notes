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
  // try {
  //   const [data1] = await getCoutryJson(
  //     `https://restcountries.com/v3.1/name/${country1}`
  //   );
  //   const [data2] = await getCoutryJson(
  //     `https://restcountries.com/v3.1/name/${country2}`
  //   );
  //   const [data3] = await getCoutryJson(
  //     `https://restcountries.com/v3.1/name/${country3}`
  //   );

  //   console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
  // } catch (err) {
  //   console.log(err.message);
  // }

  try {
    const data = await Promise.all([
      getCoutryJson(`https://restcountries.com/v3.1/name/${country1}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country2}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country3}`),
    ]);
    const capitals = data.map((countryData) => countryData.capital[0]);
  } catch (err) {
    console.log(err.message);
  }
};

fetchCapitals("finland", "norway", "netherlands");
